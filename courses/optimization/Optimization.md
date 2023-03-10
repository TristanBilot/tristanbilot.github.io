<span class="date">Deep Learning from sratch</span>
# Optimization and training
<div class="subtitle">How to train a model thanks to the gradients computed with our autodiff engine?</div>

<img src="/courses/optimization/img/main.jpg" class="header-img"></img>

<span class="link-quote"><a href="https://github.com/TristanBilot/DL-from-0" target="_blank" rel="noopener noreferrer">The code is available on <i class="fab fa-github"></i> GitHub</a></span>

In the <a href="/autodiff"> previous course</a>, we developed an automatic differentiation engine which can compute inference of composition of functions along with the gradients w.r.t any parameters.

We are now interested in training our first neural net by implementing optimizers and cost functions.

## Theory

As explained in the <a href="/prerequisites"> Prerequisites course</a>, the aim of a cost function (or loss function) is to return a value representing the error of a network. By computing the gradients of this function w.r.t all the parameters involved in the output of the neural net (commonly the weights and biases), we know in which direction to go in order to minimize the output of the cost function. Minimizing this output will thus minimize the error of the model and mostly improve the prediction accury. The gradient contains for each corresponding parameter a real number where the sign indicates the direction where the function increases or decreases most quickly, and where the actual number indicates how much the parameter has to be changed in order to minimize the error.

When the gradient is > 0, it indicates the direction where the function increases quickly and where it is < 0, the direction of fastest decreasing. A large value of the gradient means a large rate of change. A gradient with a value of 0 means that a local/global minimum/maximum has been reached, as the tangent will be horizontal (coefficient=0).

### Requirements

Based on the work done previously, we still need some elements to train a first neural network:

* A `loss function` to measure the error
* An `algorithm to update` the value of weights and biases based on the gradients we computed
* A `training loop` which executes both previous steps until convergence of the loss

#### MSE loss function

The `Mean Squared Error` measures the error between two tensors of points $\hat{y}$ and $y$, such that:

$$
mse(\hat{y}, y)=\frac{1}{N}\sum_{i=1}^{N} (\hat{y_i}-y_i)^2
$$

where $\hat{y}$ is the predicted output, $y$ is the ground truth, $N$ is the length of both tensors. This is literally the mean of the squared difference between the predicted value and the ground truth value. This function returns a scalar representing the error (often stored in a `Tensor` class in order to apply backpropagation on it).

#### Layer structure

For a better use of our autodiff Tensors, we'll wrap them in `Layers` and `Model` classes. A `Layer` basically is made of tensors and a model is made of `Layers`. 

<pre class="code-style"><code class="lang-python"> 
class Layer:
    def __call__(self, *args, **kwargs) -> Tensor:
        pass
</code></pre>

For now, a layer is just a class which can be called and returns a `Tensor` which is the input of the next layer. Actual class implementations will inherit this one.

##### Sum

To implement the MSE function, we need to code the forward and backward passes. However, the formula uses an operation which we didn't implement yet: the `sum`. If this operation is not implemented, the gradients will not be backpropagated properly because the MSE function is not fully differentiated.

So let's implements this `sum` operation in the `Tensor` class!

<pre class="code-style"><code class="lang-python"> 
def sum(self, input: 'Tensor', axis: int=None, keepdims: bool=False):
    input = input if isinstance(input, Tensor) else Tensor(input)
    tensor = Tensor(val=np.sum(input.val, axis=axis, keepdims=keepdims), a=self, b=input)
    tensor.tensor_type = "sum"
    return tensor
</code></pre>

Nothing complicated here, now the backward pass is done using the following derivative:

$$
y = \sum_{i=0}^N k_i  \qquad \frac{\partial y}{\partial k_i} = 1
$$

The sum is first applied during the forward pass on a vector or tensor of shape $M$: this function transforms the input of shape $M$ to a scalar of shape $(1,)$. As a sum is here a series of additions of constants, the partial derivative of each element is $1$. 

The implementation of this derivative is located in the `backpropagate()` function:

<pre class="code-style"><code class="lang-python"> 
...
if self.tensor_type == "sum":
    self.b.backpropagate(gradient * np.ones_like(self.b.val))
</code></pre>

However, during backprop, it is required to reconstruct the original shape $M$ of the input in order to backpropagate the gradients. This is why here, we compute the derivative and we also reshape the tensor so that it fits with the shape of the original input (i.e. the `b` variable).

`np.ones_like(self.val)` is used here to generate a tensor full of ones, with the same shape as the input tensor. As in the other backward implementations of operations, the `gradient` is multiplied to the derivative and is sent as input to the next node in the graph (`b`).

##### MSE

Now that the sum is implemented, we can focus on the MSE function.

<pre class="code-style"><code class="lang-python"> 
def mse_loss(self, y_hat: 'Tensor', y: 'Tensor'):
    y_hat = y_hat if isinstance(y_hat, Tensor) else Tensor(y_hat)
    y = y if isinstance(y, Tensor) else Tensor(y)
    n = Tensor(y_hat.val.size)
    sum = Tensor().sum
    val = (sum((y_hat - y) ** Tensor(2))) / n
    return val
</code></pre>

We can even wrap this function in a dedicated `Layer`.

<pre class="code-style"><code class="lang-python"> 
class MSE(Layer):
    def __call__(self, y_hat: Tensor, y: Tensor):
        loss_fn = Tensor().mse_loss
        return loss_fn(y_hat=y_hat, y=y)
</code></pre>

It is **important** to note that there is no need to implement the backward pass of the MSE function in `backpropagate()` because we already implemented everything needed to compute the derivative of the MSE function (i.e. sum, power, division, product, substraction). By returning the value of `mse_loss()`, **a new computation graph will be added** at the end of the current graph and will **be differentiated automatically during the backward pass**.

We can also wrap our `Sigmoid` function into a `Layer` class for later use.

<pre class="code-style"><code class="lang-python"> 
class Sigmoid(Layer):
    def __call__(self, X: Tensor):
        sig = Tensor().sigmoid
        return sig(X)
</code></pre>

#### Weighted layer

To train a model using layers, we need to wrap the weights and biases in a `Layer` class. When called, this class will perform a traditional dot product between input and weight, plus the bias.

<pre class="code-style"><code class="lang-python"> 
class Parameter(Tensor):
    @classmethod
    def randn(cls, *shape):
        return cls(np.random.randn(*shape))

    def zero_grad(self):
        self.gradient = np.zeros(self.shape, dtype=np.float32)

class WeightedLayer(Layer):
    params: List[Parameter]

class Linear(WeightedLayer):
    def __init__(self, nb_inp: int, nb_out: int) -> None:
        self.weight = Parameter.randn(nb_inp, nb_out)
        self.bias = Parameter.randn(1, nb_out)
        self.params = [self.weight, self.bias]

    def __call__(self, X: Tensor):
        assert isinstance(X, Tensor), "Parameter `X` should be a Tensor"
        return X @ self.weight + self.bias
</code></pre>

For the moment, the parameters are initialized randomly, we will improve this in next courses. A `Parameter` class is used as a wrapper for `Tensors` which store trainable parameters such weights or biases. This is done to discern <i>learnable</i> layers from other layers which do not need gradient computation. `zero_grad()` is used to reset the gradient of a `Parameter` to 0s.

## Optimizers

Let's move to the `optimization` part. An optimizer is an algorithm responsible of the update of the trainable parameters of the network based on the gradients which are computed during the backpropagation pass.

### Gradient descent

The goal of a `gradient descent` algorithm is to find a minimum of a multivariate function (function of multiple input variables). Here the multivariate function is the loss function (MSE for the moment) and the variables are the learnable parameters of the network. We know that the opposite vector of the gradient indicates where the values of the function will decrease the most, so we need to find a way to iteratively go down along this vector, step by step, until a minimum is reached. 

There exists 3 types of gradient descent:

* **Gradient descent:** the parameters are updated after that the model has been trained for 1 epoch on all the dataset (1 big optimization step). This algorithm needs to store the dataset in memory so it is very `memory consuming`, however it offers a `great time complexity` as the training can be `easily vectorized`. The gradient descent is done based on all examples, so the produced step is often `stable`.
* **Batch gradient descent:** the dataset is divided in multiple batches (groups of examples) and the parameters are updated after the training of each batch ($m$ medium optimization steps, where $m$ is the number of batches). Batch GD is a `good compromise` as it offers the `efficiency` of GD and the `robustness` of SGD.
* **Stochastic gradient descent:** the parameters are updated after each trained example ($N$ small optimization steps, where $N$ is the size of the dataset). SGD is `memory efficient` as one example is needed to be stored in memory, but `time consuming` because `no vectorization` along multiple examples is possible. It is a stochastic step, meaning that some gradients could lead to a bad direction, which would be not the case in GD or BGD.

These 3 methods can be represented visually:

<img src="/courses/optimization/img/g2.jpg" class="header-img"></img>
<div class="caption">Gradient descent (left), batch gradient descent (middle), and stochastic gradient descent (right), where it_i is one iteration of gradient descent along all parameters.</div>



#### SGD implementation

SGD is a well-known optimizer and the easiest to implement, so let's start by this one:

<pre class="code-style"><code class="lang-python"> 
class Optimizer:
    params: List[Tensor]

    def optimize(self):
        pass

    def zero_grad(self):
        for param in self.params:
            if isinstance(param, Parameter):
                param.zero_grad()

class SGD(Optimizer):
    def __init__(self, params: List[Tensor], lr: float):
        self.params = params
        self.lr = lr

    def optimize(self):
        for param in self.params:
            param.val = param.val - self.lr * param.gradient
        return self.params
</code></pre>

An `Optimizer` is a taking parameters as input, which are all the learnable parameters of the network (namely the `Parameter` variables stored in `WeightedLayer`). The `zero_grad()` function just fills all parameters with 0s, because gradients need to be cleared after each training iteration. The function `optimize()` updates each parameter by adding the opposite vector ponderated by the `lr` to the actual value. The opposite gradient direction is represented by `-param.gradient` and the mitigation is a multiplication between that vector and the `lr` coefficient. 

Here, `lr` is the learning rate, which is the <i>power</i> of the gradient descent step for going in the opposite direction of the gradient. In other terms, this coefficient will mitigate the magnitude of the gradient vector. A too high `lr` will result in parameters which do not converge to a minimum because the steps will miss this minimum. A too low `lr` can converge but could take ages to reach a minimum.

<img src="/courses/optimization/img/g3.jpg" class="header-img"></img>
<div class="caption">Demonstration of the importance of learning rate value. Were J is a loss function and theta the learnable parameters. </div>

### SGD optimizations


As stated earlier, SGD is stochastic by definition because the gradient descent is applied iteratively from random samples. This means that the algrorithm cannot leverage the distribution of all the data and may apply the optimization by taking <i>bad directions</i> (i.e. the gradient of one sample is not correctly oriented so the step moves the cursor not in direction of a minimum). To prevent such behaviors, techniques exist to control the direction of gradients or to accelerate training of models.

#### Momentum
In physics, the `momentum` is the quantity of motion of a moving body. As an example, a skier descending a slope is creating a momentum w.r.t to the velocity and the mass of the skier. This momentum is creating inertia and it is thus complicated for the skier to rotate or to take a turn.

This principle can be applied to SGD, where we want to force the gradient not to take a direction too different from the previous moves. By doing this, we are establishing a connection between the gradients so that each is contributing to the direction of the next ones. Momentum is defined by the following formula:

$$
V_t = \beta.V_{t-1} - \alpha.\nabla_\theta
$$

where $\beta$ is the momentum coefficient, $V_t$ is the momentum at iteration $t$, $\alpha$ is the learning rate, and $\nabla_\theta$ is the gradient of loss w.r.t parameter $\theta$.

The parameters are then updated like so:

$$
\theta = \theta + V_t
$$

After each call to the SGD optimizer, the momentum will be stored in memory so that it can be used in the next call to the optimizer.

#### Nesterov

With `Nesterov momentum`, we evaluate the gradient after that the projection in space has been done (after one step of classical momentum). Nesterov is looking up one step further to correct the momentum and produces less oscillations. This technique can avoid to miss minimums. Nesterov momentum can be defined by the following formula:

$$
V_t = \beta . V_{t-1} - \alpha . \nabla_\theta \\
V_{t+1} = \beta . V_t - \alpha . \nabla_\theta \\
$$

$$
\theta = \theta + V_{t+1}
$$

#### Implementation

Let's improve our previous SGD optimizer using `momentum` and `Nesterov` methods.

<pre class="code-style"><code class="lang-python"> 
class SGD(Optimizer):
    def __init__(
        self,
        params: List[Tensor],
        lr: float=0.01,
        momentum: float=0.3,
        nesterov: bool=False,
    ):
        self.params = params
        self.lr = lr
        self.momentum = momentum
        self.nesterov = nesterov
        self.state = [np.zeros_like(p.val) for p in self.params]

    def optimize(self):
        if self.momentum == 0.:
            for param in self.params:
                param.val = param.val - self.lr * param.gradient
        else:
            for i, p in enumerate(self.params):
                new_state = -self.lr * p.gradient + self.momentum * self.state[i]
                self.state[i] = new_state

            if self.nesterov:
                new_state = -self.lr * p.gradient + self.momentum * self.state[i]

            p.val = p.val + new_state
</code></pre>

A `state` variable is used to track the previous momentums. It is initialized with 0s so that the first step will produce a 0 momentum. Each parameter of the newtork is associated to a tensor inside the `state`. At each iteration, the formula of the current parameter will be computed using its state located at the index of the parameter in the `params` variable. 

### Adam

In traditional SGD, a fixed learning rate is used. However, some optimizers such as `AdaGrad` and `RMSProp` compute custom learning rates for each parameter, to accelerate training.
`Adam` is another stochastic optimization algorithm, successor of AdaGrad and RMSProp. It is based on first-order and second-order momentums and applies an `exponentially decreasing moving average` to the gradient to update parameters.

For more information on the actual equations and implementation, I really encourage you to read the <a href="https://arxiv.org/abs/1412.6980">original paper</a>.

#### Adam implementation

The following code is a basic implementation based on the Adam paper.

<pre class="code-style"><code class="lang-python"> 
class Adam(Optimizer):
    class State:
        def __init__(self, mt: Tensor, vt: Tensor):
            self.mt = mt
            self.vt = vt

    def __init__(
        self,
        params: List[Tensor],
        lr: float=0.001,
        beta1: float=0.9,
        beta2: float=0.999,
        eps: float=1e-08,
    ):
        self.params = params
        self.beta1 = beta1
        self.beta2 = beta2
        self.eps = eps
        self.lr = lr
        self.t = 0
        self.state = [Adam.State(
            mt=np.zeros(p.shape),
            vt=np.zeros(p.shape)) for p in self.params]
    
    def optimize(self):
        self.t += 1

        b1, b2 = self.beta1, self.beta2
        state, t = self.state, self.t

        for i, p in enumerate(self.params):
            state[i].mt = b1 * state[i].mt + (1 - b1) * p.gradient
            state[i].vt = b2 * state[i].vt + (1 - b2) * p.gradient ** 2.
            den = np.sqrt(state[i].vt) / np.sqrt((1 - b2 ** t)) + self.eps
            p.val = p.val - self.lr / (1 - b1 ** t) * (state[i].mt / den)
</code></pre>

Like in momentum implementation, a state is used to memorize previous momentums. Here, two momentums are used, written $m_t$ and $v_t$ in the paper. $\beta_1$ and $\beta_2$ (beta1, beta2) are coefficients with fixed values and $\epsilon$ (eps) is an extremly small coefficient to avoid division by 0.

### MLP model

A <a href="https://en.wikipedia.org/wiki/Multilayer_perceptron">MLP</a> class is going to be implemented to store all the training logic so that it will be tested against real problems in the next course.

<pre class="code-style"><code class="lang-python"> 
class MLP:
    def __init__(self, *layers) -> None:
        self.layers = layers

    def __call__(self, X: Tensor) -> Tensor:
        y_hat = X
        for layer in self.layers:
            y_hat = layer(y_hat)
        return y_hat

    def train(
        self,
        X: Tensor,
        y: Tensor,
        optimizer: Optimizer,
        loss_fn: Layer,
    ):
        y_hat = self(X)
        loss = loss_fn(y_hat, y)
        loss.backpropagate()
        optimizer.optimize()
        return loss, y_hat

    @property
    def params(self):
        params = []
        for l in self.layers:
            if isinstance(l, WeightedLayer):
                params += l.params
        return params
</code></pre>

A `MLP` is initialized by giving as input a stack of layers to traverse to perform the model inference. This inference can be done by calling the `__call__()` function. `train()` performs one step of training by computing the inference of the model ($\hat{y}$), measuring the loss against the target values ($y$), backpropagating the error to compute gradients of parameters at each layer, and calling the optimizer to perform parameters optimization such as SGD.

The `params` property returns the `Parameters` of each layer. These parameters will then be given as input to the `Optimizer`.
## Next steps

In the <a href="/xor-sine">next course</a>, the MLP model based on the autodiff engine, along with the optimizers will be tested and improved against 2 traditional Machine Learning problems: approximating the XOR and sine functions.
