<span class="date">Deep Learning from sratch</span>
# Automatic differentiation engine from scratch
<div class="subtitle">How to develop an Automatic Differentiation engine using just numpy and maths?</div>

<img src="/courses/autodiff/img/main.jpg" class="header-img"></img>

<span class="link-quote"><a href="https://github.com/TristanBilot/DL-from-0" target="_blank" rel="noopener noreferrer">The code is available on <i class="fab fa-github"></i> GitHub</a></span>

In the <a href="/chain-rule"> previous course</a>, we understood how derivatives of composite functions can be computed using chain rule and computation graphs.

In this course, we will develop a reliable <a href="https://en.wikipedia.org/wiki/Automatic_differentiation">autodiff</a> engine to compute the gradients of composite functions combined with arithmetic operations. We will also build our first `neural network` and compare the derivatives with the ones computed by `pytorch` framework.

I **really** encourage you to read the **<a href="/prerequisites">Prerequisites course</a>** before diving into this one as the concepts of gradients, partial derivatives, autodiff and backprop are explained there.

## Theory

### Reverse vs forward mode

Autodiff can be done using two modes: `forward-mode` and `reverse-mode`, so which one to choose?
While both techniques achieve the same results and compute the same number of dot products, one could be more efficient than the other one depending on the inputs and outputs of the model. Indeed, depending on the shape of input and outputs, one mode could lead to smaller dot products and faster computation.
We want here to develop a **reverse-mode** automatic differentiation engine. Why reverse-mode? As nicely explained in <a href="https://math.stackexchange.com/questions/2195377/reverse-mode-differentiation-vs-forward-mode-differentiation-where-are-the-be"> this post</a>, reverse-mode AD gives better performance when the number of inputs is greater than the number of outputs, and the inverse for forward-mode AD.

**Briefly:**

$$
\lVert x \rVert > \lVert y \rVert \rightarrow reverse-mode
$$

$$
\lVert y \rVert > \lVert x \rVert \rightarrow forward-mode
$$

In Deep Learning setting, we often have more inputs than outputs (i.e. image classification could deal with $n * m * 3$ input dimensions and $100$ class outputs). This is why reverse-mode is the one used in Deep Learning and we will implement it here.

### Notations

In the previous course, we used to write chain rule operations like this:

$$
(g \circ f)\prime (x) = g\prime (f(x)).f\prime (x)
$$

We will prefer now using the following notation which is more explicit when dealing with derivatives and partial derivatives.

$$
\frac{\partial y}{\partial x} = \frac{\partial y}{\partial u}.\frac{\partial u}{\partial x}
$$

where the composition of functions is decomposed in two smaller functions:

$$
u = f(x)
$$

$$
y = g(u)
$$

We can retrieve the first formula by computing the derivatives:

$$
\frac{\partial y}{\partial u} = g\prime(u) = g\prime(f(x))
$$

$$
\frac{\partial u}{\partial x} = f\prime(x)
$$

**Note:**
The notation $\frac{du}{dx}(x)$ is used to compute the derivative of $f$ with respect to $x$ when $f$ takes only one variable: here $x$. However, when dealing with multiple variables like in Deep Learning, the following notation is used: $\frac{\partial f}{\partial x}(x, y, ...)$. In this case, we usually talk about `differentiation` instead of `derivatives`.

### Decompose a neural net in functions

As said a thousand times in this series, **a neural net is a long composition of functions**. Every operations can be represented as a function, where the output is recursively taken as input of the next function. One function can be represented as a layer in the net. Once the net is represented as a function, we can apply the `chain rule` to get the partial derivative of the last function (i.e. the cost function), w.r.t to any weights and biases.

To perform AD, we need to divide the problem in multiple simple operations (i.e. divide and conquer scheme). Computing the partial derivative of a function w.r.t a variable becomes really easy once the composition of functions is divided in multiple simple usual derivatives.

In practice, the composition of functions is decomposed using a `computation graph`, which is explained in the <a href="/chain-rule">previous course</a>.
Each node in this graph could be a usual derivative or a mathematical operation such as `add`, `mul` of `matrix multiplication`.

#### Example

Let's define a layer as a function $\sigma(W.X+b)$, where $\sigma$ is the `sigmoid` activation function, $W$ is a weight matrix, $b$ is a bias vector and $X$ an input matrix.

Now, let's decompose a small neural net with 2 of these layers:

$$
\hat{y} = \sigma(W_2.\sigma(W_1.X+b_1) + b_2)
$$

where $W_1$, $W_2$ are weights, $b_1$, $b_2$ are biases and $\hat{y}$ is the prediction of the model..

This neural net can be divided in a composition of 4 functions like so:

<img src="/courses/autodiff/img/g3.jpg" class="course-img"></img>
<div class="caption">A neural net decomposed as a compostion of functions</div>

Thanks to this representation, it is possible using the chain rule to compute the partial derivative of the last layer (here $a_2$) w.r.t weights and biases in the corresponding layers. Note that for now no cost function is used for simplicity but in future cases, we will use as last layer an actual cost function to backpropagate the error.

<img src="/courses/autodiff/img/g2.jpg" class="course-img"></img>
<div class="caption">Partial derivatives of last layer w.r.t weights using chain rule</div>

The chain rule can be easily understood visually. It can be seen as a cursor, which can be moved backward in the whole network in order to reach the layer with the corresponding parameters we want to compute the partial derivative. As we are traversing in reverse order, the innermost layers will be the first and fastest ones to compute the partial derivatives.

In the previous figure, we see that computing the partial derivative of the last layer w.r.t a variable is nothing more than doing the product of the  partial derivatives of all previous layers w.r.t their inputs, with the partial derivative of the layer which stores the variable w.r.t this variable.

#### Computing the gradients

##### For $W_2$

$$
\begin{align}
\frac{\partial y}{\partial W_2} & = \frac{\partial a_2}{\partial z_2}.\frac{\partial z_2}{\partial W_2} \\
& = \sigma\prime(z_2).a_1.T \\
& = \sigma\prime(W_2.\sigma(W_1.X+b_1)+b_2).\sigma(W_1.X+b_1).T \\
\end{align}
$$


**Eq. 1:** starting from the right of the computation graph, we need to going through $a_2$ and $z_2$ nodes to reach $W_2$, so we use the chain rule from $a_2$ to $W_2$.

**Eq. 2:** 
* referring to the figure 1, $a_2=\sigma(z_2)$ so $\frac{\partial a_2}{\partial z_2}$ is the derivative of the whole function $\sigma$.
* $\frac{\partial z_2}{\partial W_2}$ is a bit trickier as we need to compute the partial derivative of a `dot product`. Let $f$ be a function such that $f(A, B) = A.B$, where $A$ and $B$ are matrices or tensors with compatible shapes and $.$ is the dot product operation. Then, $\frac{\partial f}{\partial A}=B.T$, where $.T$ is the `transpose` operation. In our case, $A=W_2$ and $B=a_1$, so $\frac{\partial z_2}{\partial W_2}=a_1.T$.

**Eq. 3:** here, we are just replacing the $z_2$ and $a_1$ variables recursively using figure 1.

##### For $W_1$

$$
\begin{align}
\frac{\partial y}{\partial W_1} & = \frac{\partial a_2}{\partial z_2}.\frac{\partial z_2}{\partial a_1}.\frac{\partial a_1}{\partial z_1}.\frac{\partial z_1}{\partial w_1} \\
& = \sigma\prime(z_2).W_2.T.\sigma\prime(z_1).X.T \\
& = \sigma\prime(W_2.\sigma(W_1.X+b_1)+b_2).W_2.T.\sigma\prime(W_1.X+b_1).X.T \\
\end{align}
$$


**Eq. 4:** starting from the right of the graph, we use chain rule to reach the layer storing the $W_1$ variable, which is $z_1$.

**Eq. 5:** the same derivative formulas used for $W_2$, note that here $\frac{\partial z_2}{\partial a_1}=W_2.T$ and $\frac{\partial z_1}{\partial w_1}=X.T$, which are in both cases the transpose of the other factor of the dot product.

**Eq. 6:** just replacing variables recursively

Note that the exact same process could be done to compute the partial der. w.r.t biases.

## Code an autodiff engine

The ultimate goal of our autodiff engine is to compute the `gradients`, namely the vectors storing the partial derivatives of the cost function w.r.t the parameters stored in the layers of the network, along with computing the actual value of this composition of functions (`model inference`). **The inference will be done during the forward pass and gradient computation during backward pass**, because this pass needs to know the output value of the network to compute the gradients.

So we will need these requirements:

* build a computation graph from a composition of functions
* handle operations in order (i.e. parenthesis > power > multiplication > addition > ...)
* computing the `local derivatives` (derivative of functions w.r.t their input) of every nodes, so that chain rule ca be used
* applying the chain rule to compute gradients on each layer storing parameters, like seen in previous equations

### Forward pass

Our implementation is in Python, so the first 2 previous requirements are fulfilled thanks to Python <a href="https://www.geeksforgeeks.org/operator-overloading-in-python/">operator overloading</a>. The order of operations is already implemented in Python to compute mathematical expressions and the graph is implicitly built while traversing the operators, so we just have to overload all required operators.

Let's wrap all the logic in a `Tensor` class:

<pre class="code-style"><code class="lang-python"> 
class Tensor:
    ValidInput = Union[float, list, np.ndarray]

    def __init__(self, val: ValidInput=None, a=None, b=None) -> None:
        self.val = self._force_np_array(val)
        self.a = a
        self.b = b
        self.gradient = np.zeros_like(self.val)
        self.tensor_type = "var"
</code></pre>

One `Tensor` requires 3 parameters: `val` which is the actual stored data of either a type of float, list, numpy array or another Tensor object, `a` and `b` are the two members of an overloaded operator (i.e. $2 + 3 \rightarrow a=2, b=3$). A variable `tensor_type` is by default set to "var", we will come back to it later, same for `gradient`.

It's time to overload our first operators.

<pre class="code-style"><code class="lang-python"> 
def __add__(self, other):
    other = other if isinstance(other, Tensor) else Tensor(other)
    tensor = Tensor(val=self.val + other.val, a=self, b=other)
    tensor.tensor_type = "add"
    return tensor

def __sub__(self, other):
    other = other if isinstance(other, Tensor) else Tensor(other)
    tensor = Tensor(val=self.val - other.val, a=self, b=other)
    tensor.tensor_type = "sub"
    return tensor

def __mul__(self, other):
    other = other if isinstance(other, Tensor) else Tensor(other)
    tensor = Tensor(val=self.val * other.val, a=self, b=other)
    tensor.tensor_type = "mul"
    return tensor

def __truediv__(self, other):
    other = other if isinstance(other, Tensor) else Tensor(other)
    tensor = Tensor(val=self.val / other.val, a=self, b=other)
    tensor.tensor_type = "div"
    return tensor

def __pow__(self, other):
    other = other if isinstance(other, Tensor) else Tensor(other)
    tensor = Tensor(val=self.val ** other.val, a=self, b=other)
    tensor.tensor_type = "pow"
    return tensor

def __matmul__(self, other):
    other = other if isinstance(other, Tensor) else Tensor(other)
    tensor = Tensor(val=np.dot(self.val, other.val), a=self, b=other)
    tensor.tensor_type = "matmul"
    return tensor

def sigmoid(self, other):
    def _sigmoid(x):
        return 1 / (1 + np.exp(-x))
    other = other if isinstance(other, Tensor) else Tensor(other)
    tensor = Tensor(val=_sigmoid(other.val), a=self, b=other)
    tensor.tensor_type = "sigmoid"
    return tensor

def _force_np_array(self, val: ValidInput, dtype=np.float64) -> np.ndarray:
    if val is None or isinstance(val, Tensor):
        return val
    return np.asarray(val, dtype=dtype)
</code></pre>

Nothing complicated here, for each operator, we create a brand new `Tensor` with a `val` set to the output of the overloaded operation and `a` is set to `self` as it is the left member of the operator and `b` to `other`. Note that the `tensor_type` is set to an arbitrary description of the operator which will be used in the backward pass to differentiate operator nodes. Also note that we force  the `other` factor to be a `Tensor` so that we can handle operations between a `Tensor` and another valid type which is not a `Tensor`, such as a numpy array or numbers.

Also note that the `sigmoid()` function is not an operator and is a normal method and the value of `a` will not be used in the future as the value to compute the sigmoid is stored in `b`.

**Tests:**

<pre class="code-style"><code class="lang-python"> 
a = Tensor(10.)
b = Tensor(2.)
c = Tensor(4.)
d = Tensor(2.)

y = (a * b + c) ** d
assert y.val == 576.0
</code></pre>

<pre class="code-style"><code class="lang-python"> 
A = Tensor(np.array([[2., 3.], [4., 5.]]))
B = Tensor(np.array([[6., 7.], [8., 9.]]))
sigma = Tensor().sigmoid

y = sigma(A @ B)
assert np.all(np.round(y.val) == np.array([[1., 1.], [1., 1.]]))
</code></pre>

Our engine is now capable of computing inference of operations, including dot products and sigmoids.


##### Activation functions & non-linearity

Here is a quick reminder on why we use `activation functions` in neural networks.

<img src="/courses/autodiff/img/non-linearity.jpg" class="course-img"></img>

Let's look at those 2 models. The first uses no activation function, and the other uses a non-linear activation such as `sigmoid`. Here, the activation function enables the model to learn non-linear representations and thus approximate complex functions. This is why such activation functions are placed between layers, so that the model becomes a large non-linear function. Without non-linearity, the model cannot build complex curves for real-life classification or regression problems.

### Backward pass

During the backward pass, we will traverse the computation graph in reverse order, starting from the last layer (which is often the loss function). This reverse traversal is possible thanks to the `a` and `b` variables present in every `Tensor` objects. 

#### Operations derivatives

In a neural network, many mathematical computations are happening such as matrix multiplications between  weights and inputs; additions, exponentials, logarithms, divisions from cost or activation functions, etc.

Our autodiff engine needs to know the local derivative of all these operations so that whenever a node of a certain type of operation is traversed, the appropriate derivative is returned to the next layer in order to apply the chain rule. 

Here are some derivatives to begin with for our some neural network:

##### Scalar

$$
y = a  \qquad \frac{\partial y}{\partial a}=1
$$

##### Addition

$$
y = a + b  \qquad \frac{\partial y}{\partial a}=1  \qquad \frac{\partial y}{\partial b}=1
$$

##### Substraction

$$
y = a - b  \qquad \frac{\partial y}{\partial a}=1  \qquad \frac{\partial y}{\partial b}=-1
$$

##### Multiplication

$$
y = a * b  \qquad \frac{\partial y}{\partial a}=b  \qquad \frac{\partial y}{\partial b}=a
$$

##### Division

$$
y = \frac{a}{b}  \qquad \frac{\partial y}{\partial a}=\frac{1}{b}  \qquad \frac{\partial y}{\partial b}=-\frac{a}{b^2}
$$

##### Power

$$
y = a^b  \qquad \frac{\partial y}{\partial a}=b.a^{b-1}  \qquad \frac{\partial y}{\partial b}=a^b.ln(a)
$$

##### Matrix multiplication

$$
y = A . B  \qquad \frac{\partial y}{\partial A}=B.T  \qquad \frac{\partial y}{\partial B}=A.T
$$

##### Sigmoid

$$
y = \sigma(b)  \qquad \frac{\partial y}{\partial b}=\sigma(b).(1-\sigma(b))
$$

During the forward pass, the computation graph is built so that each node is made of one of these operations. We already know all these derivatives thanks to `usual derivatives`, so by using recursion across the graph we can compute the global derivative.

Note that an AD engine can be implemented either using a `recursive` or `iterative` approach. Here, we will implement a recursive approach as the code will be cleaner and smaller than an iterative one.

#### Code

Only one function is required to make the backpropagation work. This `backpropagate()` function is called first on the last `Tensor` returned by the forward pass and will call recursively the `backpropagate()` function of all downstream nodes present in `a` or `b` variables (i.e. children nodes). The recursion stops whenever a `var` node is reached, which means a leaf of the tree is reached. 

<pre class="code-style"><code class="lang-python"> 
def backpropagate(self, gradient=None):

    gradient = gradient if gradient is not None \
            else np.ones_like(self.val, dtype=np.float64)

    if self.tensor_type == "var":
        self.gradient = self._unbroadcast_addition(self.gradient, gradient)

    if self.tensor_type == "add":
        self.a.backpropagate(self._unbroadcast(gradient, self.a.shape))
        self.b.backpropagate(self._unbroadcast(gradient, self.b.shape))

    if self.tensor_type == "sub":
        self.a.backpropagate(self._unbroadcast(gradient, self.a.shape))
        self.b.backpropagate(self._unbroadcast(-gradient, self.b.shape))

    if self.tensor_type == "mul":
        self_b = self.b.val if isinstance(self.b, Tensor) else self.b
        self_a = self.a.val if isinstance(self.a, Tensor) else self.a
        self.a.backpropagate(self._unbroadcast(gradient * self_b, self_a.shape))
        self.b.backpropagate(self._unbroadcast(gradient * self_a, self_b.shape))

    if self.tensor_type == "div":
        self.a.backpropagate(self._unbroadcast(gradient * 1 / self.b.val, self.a.shape))
        self.b.backpropagate(self._unbroadcast(gradient * -self.a.val / self.b.val ** 2, self.b.shape))

    if self.tensor_type == "pow":
        self.a.backpropagate(gradient * self.b.val * self.a.val ** (self.b.val - 1))

    if self.tensor_type == "matmul":
        self.a.backpropagate(np.dot(gradient, self.b.val.T))
        self.b.backpropagate(np.dot(self.a.val.T, gradient))

    if self.tensor_type == "sigmoid":
        def _sigmoid_derivative(x: float):
            return x * (1 - x)
        self.b.backpropagate(gradient * _sigmoid_derivative(self.val))
</code></pre>

In each call to `backpropagate()`, the `gradient` variable is multiplied by the local derivative (i.e. the partial derivative of the current operation w.r.t the input variable `a` or `b`). This multiplication is nothing more than the application of the chain rule as we described in the section <i>Computing the gradients</i>. This `gradient` in input is the dot product of all previous partial derivatives of operations w.r.t their inputs. The gradients are updated uniquely when a node is of type `var` like weights tensors or biases vectors. It seems logical that operators do not store any gradient but their variables yes. The gradient is added to the existing gradient of the variable (+=) because a variable can be present multiple times in an expression, like in the case where a `Tensor` object is used more than one time in the neural net. In the case of a gradient is assigned multiple values, we always do the `sum` of these gradients. If the gradient was assigned (=) instead of added (+=), then the previous gradients would be erased which is not something we want.

Note that here, the derivative of sigmoid does not include the actual sigmoid function $\sigma$ because the output of the sigmoid has already been computed during forward pass and is stored in the `self.val` of the node, so we don't have to call the $\sigma$ function again. 

During the first call to `backpropagate()`, the `gradient` will be empty, this is why we have to initialize  at the beginning of each call the function. Here we initialized this variable with a matrix full of 1s with the same shape as the node. 

##### Broadcasting

<a href="https://numpy.org/doc/stable/user/basics.broadcasting.html">Broadcasting</a> is essential to train our neural net. Indeed, at a certain point, we need to compute the addition of multiple gradients when a "leaf" of the computation graph is reached. The shapes of these tensors could not match and if we don't handle this behavior properly, it can result in a calculation exception due to shapes mismatch or a even worse, a false calculation, which is much harder to detect.

`Unbroadcasting` is used in the backward pass to retrieve the original shape of an input tensor before that numpy applied a broadcasting, and also allows to do the sum of 2 gradients with different shapes. We give the function 2 arguments: the tensor $x$ to reshape and the matching shape. The modified output should be $x$ with the given `shape`.

<pre class="code-style"><code class="lang-python"> 
def _unbroadcast(self, x: np.ndarray, shape) -> np.ndarray:
    x = np.float32(x)
    extra_dims = x.ndim - len(shape)
    assert extra_dims >= 0
    dim = [i for i in range(x.ndim) if x.shape[i] > 1 and (i < extra_dims or shape[i - extra_dims] == 1)]
    if len(dim) != 0:
        dim = dim[0]
        x = x.sum(axis=dim, keepdims=True)
    if extra_dims:
        x = x.reshape(-1, *x.shape[extra_dims+1:])
    return x
</code></pre>

This function is required to retrieve the the original shapes which are modified during forward pass. Inspired from torch framework, we will use it only on `mul`, `div`, `sub` and `add` operations.

#### Tests

<pre class="code-style"><code class="lang-python"> 
W1 = Tensor(np.array([[-0.5,  0.5], [1.827, 0.213], [-2,  2], [2.34, 0.657]]))
b1 = Tensor(np.array([[1.2],  [1.2], [1.2],  [1.2]]))
X = Tensor(np.array([[-2], [0.122]]))

sig = Tensor().sigmoid

y = sig(W1 @ X + b1)
y.backpropagate()


# dy/dW1
assert np.all(np.round(W1.gradient, 2) == np.round(np.array([
    [-0.17,  0.01],
    [-0.14,  0.00],
    [-0.00,  0.00],
    [-0.06,  0.00]
]), 2))

# dy/db1
assert np.all(np.round(b1.gradient, 4) == np.round(np.array([
    [0.08549257],
    [0.07449035],
    [0.00428504],
    [0.03125697]
]), 4))
</code></pre>

Here are the gradients!

The results can be verified either using `torch` or `chain rule formula` (from equation 2) directly:

<pre class="code-style"><code class="lang-python"> 
# Tests with chain rule formula
W1, X, b1 =  W1.val, X.val, b1.val
wxb = _sigmoid(W1 @ X + b1)

# dy/dW1
dw1_pred = np.dot(_sigmoid_derivative(wxb), X.T)
assert np.all(np.round(W1.gradient, 4) == np.round(dw1_pred, 4))

# Tests with torch
W1_b = torch.tensor(W1.val.copy(), requires_grad=True)
b1_b = torch.tensor(b1.val.copy(), requires_grad=True)
X_b = torch.tensor(X.val.copy(), requires_grad=True)

sig = torch.nn.Sigmoid()
y = sig(W1_b @ X_b + b1_b)
y.backward(torch.tensor([[1.],  [1.], [1.],  [1.]]))

# dy/dW1
dw1 = W1_b.grad.cpu().detach().numpy()
assert np.all(np.round(W1.gradient, 4) == np.round(dw1, 4))
</code></pre>

## Next steps

In the <a href="/optimize">next course</a>, we will use our autodiff engine to optimize a first neural net using `stochastic gradient descent` and `MSE` cost function. 

<!-- penser à optimiser les opérations en stockant les gradients précédents -->
