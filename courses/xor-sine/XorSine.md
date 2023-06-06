<span class="date">Deep Learning from sratch</span>
# XOR and sine problems
<div class="subtitle">Can our first model approximate non-linear functions like XOR and sine?</div>

<img src="/courses/xor-sine/img/g1.jpg" class="header-img"></img>

<span class="link-quote"><a href="https://github.com/TristanBilot/DL-from-0" target="_blank" rel="noopener noreferrer">The code is available on <i class="fab fa-github"></i> GitHub</a></span>

In the previous course, we developed a MLP model architecture along with momentum SGD and Adam optimizers.

In the following course, we will test our model by trying to approximate two famous functions: `XOR` and `sine`.

## The XOR problem

This problem is famous when building a first neural network. Indeed, a simple perceptron cannot solve this problem for the following reasons:

* this problem is a non-linear classification, meaning that a straight line cannot cluster both categories to classify
* a single perceptron is linear so it cannot solve this problem alone

However, when stacking multiple layers with non-linear activation functions, it is posible to approximate the XOR function which is defined as 
$$
f(x, y)=
\begin{cases}
       \text{0,} &\quad\text{if x = 0, y = 0}\\
       \text{1,} &\quad\text{if x = 0, y = 1} \\
       \text{0,} &\quad\text{if x = 1, y = 1}\\
       \text{1,} &\quad\text{if x = 1, y = 0} \\ 
     \end{cases}
$$

XOR is known as the <i>exclusive OR</i> in electronics and system programming, meaning that the output of the function is 0 if the elements are different and 1 when they are the same.

This problem can be better understood graphically, when $x$ and $y$ are coordinates in a 2D plane:

<img src="/courses/xor-sine/img/g1.jpg" class="course-img"></img>
<div class="caption">1s and 0s cannot be separated by a straight line or a linear model (left) but achieve separation using non-linear model (right).</div>

### Implementation

The dataset is pretty simple, we just enumerate the four cases of the XOR operation described at the beginning:

<pre class="code-style"><code class="lang-python"> 
import autodiff as ad

X = ad.Tensor(np.array([
    [0., 0.],
    [0., 1.],
    [1., 0.],
    [1., 1.],
]))
y = ad.Tensor(np.array([
    [1.],
    [0.],
    [1.],
    [0.],
]))
</code></pre>

Two `Tensors` are created by using the `autodiff` module we created in the automatic differentiation course.

<pre class="code-style"><code class="lang-python"> 
from layers import Linear, MSE, Sigmoid
from models import MLP
from optimizers import SGD

model = MLP(
    Linear(2, 100),
    Sigmoid(),
    Linear(100, 1),
    Sigmoid(),
)

optimizer = SGD(params=model.params, lr=0.01)
# optimizer = Adam(params=model.params)
loss_fn = MSE()

epochs = 500
for _ in range(epochs):
    loss, y_hat = model.train(X=X, y=y, optimizer=optimizer, loss_fn=loss_fn)

assert np.all(np.round(y_hat) == y.val)
</code></pre>

2 `Linear` layers combined with 2 `Sigmoid` are used as model and the training is done using SGD with `lr` of 0.01 for 500 epochs. The assertion shows us that the XOR function is perfectly learnt.

#### Plot loss and accuracy

To better understand how the loss and accuracy fluctuated during training, here is a visualization of these 2 metrics.

##### Momentum fluctuations

Multiple benchmarks have been done based on the choice of `learning rate` and `momentum`.

<img src="/courses/xor-sine/img/momentum SGD.jpg" class="course-img"></img>
<div class="caption">Evolution of loss (left) and accuracy (right) w.r.t training epochs with SGD optimizer, for multiple values of momentum.</div>

In this example, it is interesting to see that momentum is not adapted to be used on this dataset. Best performances are achieved with a momentum $m=0$.

##### Learning rate fluctuations

Now let's study variations of learning rate for (1) `SGD` and (2) `Adam`.

###### SGD

<img src="/courses/xor-sine/img/lr SGD.jpg" class="course-img"></img>
<div class="caption">Evolution of loss (left) and accuracy (right) w.r.t training epochs with SGD optimizer, for multiple values of learning rate.</div>

Here the best tested value for the `lr` parameter is 0.008. We can see that just modifying this coefficient by 0.002 can have a drastict impact on the training performances, this is why `hyperparameter` selection is important.

###### Adam

<img src="/courses/xor-sine/img/lr Adam.jpg" class="course-img"></img>
<div class="caption">Evolution of loss (left) and accuracy (right) w.r.t training epochs with Adam optimizer, for multiple values of learning rate.</div>

Using Adam, the loss and accuracy respectively decreases and increases faster, especially with a learning rate of 0.006.

## The sine problem

Now, we are interested in approximating the `sine` function with a neural network.

### Implementation

Sine data can be easily generated on a given range in order to build a dataset:

<pre class="code-style"><code class="lang-python"> 
def generate_sin_data(n: int):
    dataset = np.empty([n, 2])
    data = 2 * np.pi * np.random.random_sample((n))
    dataset[:,0] = data
    dataset[:,1] = np.sin(data)
    X = dataset[:,0]
    y =  dataset[:,1]
    
    return X, y

def generate_sin_dataset(n: int, train_test: float=0.7):
    X, y = generate_sin_data(n)
    X_train, X_test = \
        ad.Tensor(X[:int(len(X) * train_test)].reshape(-1, 1)), \
        ad.Tensor(X[int(len(X) * train_test):].reshape(-1, 1))
    y_train, y_test = \
        ad.Tensor(y[:int(len(y) * train_test)].reshape(-1, 1)), \
        ad.Tensor(y[int(len(y) * train_test):].reshape(-1, 1))
    
    return X_train, X_test, y_train, y_test
</code></pre>

The dataset is divided in train/test sets in order to test the generalization capabilities of the model.

#### ReLU

For the sine problem, we will prefer using the `ReLU` activation function because it is more convenient. In the `Tensor`, the following functions are added:

<pre class="code-style"><code class="lang-python"> 
def _relu(x: np.ndarray):
    return np.maximum(0., x)

def _relu_derivative(x: np.ndarray):
     return ((x > 0) * np.ones_like(x))

def relu(self, input: 'Tensor'):
    input = input if isinstance(input, Tensor) else Tensor(input)
    tensor = Tensor(val=_relu(input.val), a=self, b=input)
    tensor.tensor_type = "relu"
    return tensor
</code></pre>

The `ReLU` activation function and its derivative are defined as follows:

$$
relu(a)=
\begin{cases}
       \text{0,} &\quad\text{if a} \le 0\\
       \text{a,} &\quad\text{if a > 0} \\
\end{cases}\qquad relu\prime(a)=
\begin{cases}
       \text{0,} &\quad\text{if a} \le 0\\
       \text{1,} &\quad\text{if a > 0} \\
\end{cases}
$$

The derivative when $a=0$ is actually undefined but in this setting we will return 0 in order to avoid errors. As our `input` is a `Tensor`, we can use in numpy the expression $x>0$ to obtain an array full of True/False booleans and by multiplying it with a tensor full of ones, we get the appropriate values based on the condition.

Then to handle our new operation during backward, we add the case for the relu node in  `backpropagate()`:

<pre class="code-style"><code class="lang-python"> 
if self.tensor_type == "relu":
    self.b.backpropagate(gradient * _relu_derivative(self.b.val))
</code></pre>

#### Sine code

Like in the XOR case, we will plot predictions with 6 different values for the learning rate. This time, only `Adam` is used as it achieves better performance here.

<pre class="code-style"><code class="lang-python"> 
accuracies_, losses_ = [], []

for i in range(6):
    X_train, X_test, y_train, y_test = generate_sin_dataset(200)

    model = MLP(
        Linear(1, 500),
        ReLU(),
        Linear(500, 1),
    )

    lr = 0.0008 - i * 0.00002
    optimizer = Adam(params=model.params, lr=lr)
    loss_fn = MSE()

    epochs = 10000
    losses, accuracies, test_accuracies = [], [], []

    for i in range(epochs):
        X_train, X_test, y_train, y_test = \
            shuffle_dataset(X_train, X_test, y_train, y_test)

        optimizer.zero_grad()

        loss, y_hat = model.train(X=X_train, y=y_train, optimizer=optimizer, loss_fn=loss_fn)

        sum = ad.Tensor().sum
        correct_preds = sum(y_hat.near_eq(y_train, round=0)).val
        accuracy = correct_preds / y_train.shape[0]
        
        accuracies.append(accuracy)
        losses.append(loss.val)
    
    accuracies_.append((accuracies, f'lr={round(lr, 5)}'))
    losses_.append((losses, f'lr={round(lr, 5)}'))
</code></pre>

Sine data in a range of 200 elements are generated. A MLP with 500 hidden layers is used. For each of the 6 trails, the `lr` is decreased to test multiple values. The number of epochs has been chosen after some tests. The accuracy and loss are plotted, then we will plot the test accuracy.

##### Predictions vs sine function

For each of the 200 samples, two data points are plotted: one based on our model predictions and the other is the actual sine function.

<img src="/courses/xor-sine/img/preds.png" class="course-img"></img>
<div class="caption">Comparison of sine function (green points) with model predictions (red points). The predictions are done using data from test set. </div>

It seems that our predictions are doing well!

##### Plot losses and accuracies

<img src="/courses/xor-sine/img/losses.png" class="course-img"></img>
<div class="caption">Evolution of loss w.r.t training epochs with Adam optimizer, for multiple values of learning rate.</div>

Here, the loss is converging quickly to 0, but this does not mean that the model performs well nor that the accuracy is high.

<img src="/courses/xor-sine/img/accs_sine.jpg" class="course-img"></img>
<div class="caption">Evolution of accuracy based on training examples (left) and test examples (right) with Adam and a rounding error of 10e-1.</div>

Here, you can clearly see that the accuracies behave oddly: a lot of fluctuation happens on the $y$ axis. It seems that one `hyperparameter` is not set properly. Indeed, when multiple <i>jumps</i> like this happen, it often means that the **learning rate it too high**, or sometimes too low.

Let's try the `lr` to 0.00008 (10x lower) with an evolution of -0.000002.

<img src="/courses/xor-sine/img/good_lr.jpg" class="course-img"></img>
<div class="caption">Same experiment with a learning rate 10x lower.</div>


This is far better! Our accuracy evolution is stable and we reach the 100% accuracy.

<blockquote>This experiment has shown us how important the hyperparameter selection is important. When developing Deep Learning models, you should try different parameters everytime in order to find the best combination of them.
Such hyperparameter selection can be done using a <a href="https://en.wikipedia.org/wiki/Training,_validation,_and_test_data_sets">validation set </a> while training the model.
</blockquote>

Furthermore, you may see that the accuracy behaves similarly on train and test sets, meaning that the model is good at `generalizing` on unseen data.

## Next steps

In the next courses, some improvements will be applied to the existing model in order to train it on more complex tasks. Weight initialization techniques will be used, along with normalization and tests.


<!-- weight decay, initialization, l1, l2 -->