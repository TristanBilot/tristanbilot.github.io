<span class="date">Deep Learning from sratch</span>
# Prerequisites
<div class="subtitle">Some notions are required to understand before diving into the implementation of neural networks.</div>

<img src="/courses/prerequisites/img/main.jpg" class="header-img"></img>

<span class="link-quote"><a href="https://github.com/TristanBilot/DL-from-0" target="_blank" rel="noopener noreferrer">The code is available on <i class="fab fa-github"></i> GitHub</a></span>

### Intro

This page centralizes some fundamental knowledge to understand before diving into Deep Learning. The concepts explained here will be detailed further in the next courses.

### Gradient

A gradient is a vector which contains the partial derivatives of all input variables of a given function. For one-variable functions, we prefer using the term <i>derivative</i> as we explicitly know that the differentiation is done with respect to this unique variable. When working on multivariate functions, the differentiation can be computed w.r.t each variable separately, when stacking all these partial derivatives in a vector, we have a <i>gradient</i>.

A gradient is said to be always a vector as it is a list of partial derivatives w.r.t to each input of a function. However, when the input of a function is a matrix or a tensor like in neural nets, the gradient will be of the same shape as the input of the function, as every parameter needs a partial derivative which is part of the gradient. For a 2D matrix, a gradient can also be seen as a vector of vectors.

Given a function $f$ with 3 variables $x$, $y$, $z$, the gradient of $f$, often noted as $\nabla$ (nabla), can be expressed like so:

$$
\nabla f = (\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z})
$$

where $\frac{\partial f}{\partial i}$ is the partial derivative of $f$ w.r.t the variable $i$.

### Why computing partial derivatives?

 The function $f$ can be represented graphically in 3 dimensions: one dimension for each variable. We know that derivatives indicate whether a function is increasing or decreasing and how the function changes if the value of one variable is slightly changed. In the case of multivariate functions like $f$, the partial derivative of each variable indicates how each of them changes the output of the whole function. As one variable represents a plane in one dimension, measuring the partial derivative of this variable is like measuring the **slope of the tangent in this particular dimension**. This is why when computing a partial derivative, we consider every other variables as constants, so that we only focus on the variations of the measured variable. When computing a gradient, we measure the slope in each dimension corresponding to each variable so that the vector contains the slopes w.r.t all input variables.

<img src="/courses/prerequisites/img/g1.png" class="course-img"></img>
<div class="caption">Partial deriative of a 3-variables function w.r.t x variable. <a href="https://www.wikihow.life/Take-Partial-Derivatives"> Source</a></div>

Here is an example of gradient for a 2-variables function.

$$
f(x, y) = x^2.y
$$

$$
\frac{\partial f}{\partial x} = 2x.y
$$

$$
\frac{\partial f}{\partial y} = x^2.1 = x^2
$$

$$
\nabla f=(2x.y, x^2)
$$
### Cost functions

In the case of neural networks, we are interested in finding the best value for every input variables in every functions composing the network. Recall that **a neural network is nothing more than a composition of functions** (layers), where most of them are dealing with **weights** and **biases**, which are here the variables we want to optimize. Measuring the partial derivatives of a neural network w.r.t every parameters indicates us how to modify these parameters in order to maximize or minimize the output of that network.
However, to train a neural network, this is not exactly the output that we want to optimize. We are looking for functions which can measure the performance of any model.

Fortunately, such functions exist, these are the famous **cost functions** or loss functions. They take as input the output of the neural net, and they output a value measuring the error of a model based on a comparison between model predictions ($\hat{y}$) and expected outputs ($y$).

Thus, when computing the partial derivatives of all learnable parameters in the NN (namely the gradient), we want to compute them from the cost function, which can be seen as the last layer of any trainable model. Indeed, we want to know for every parameters, how we can modify their values in order to decrease the outputs of the cost function. As the cost function outputs higher values when the model performs bad, decreasing the output would mean that the model generally performs better.

<blockquote>
But how can we compute the partial derivatives of all parameters in the network? What if we have multiple hidden layers?
</blockquote>

**The chain rule!** The chain rule is a formula to compute the derivative of a composition of functions of the form $g(f(x))$. As a neural network is a large composition of functions, we can compute the partial derivative of any variable inside this mess of functions using this formula.

### Automatic differentiation

In order to train our neural network (namely optimizing every variables responsible of the output measured by the cost function), we need to compute the gradient of all parameters stored in the layers of the NN. 

To achieve this, Deep Learning frameworks decompose any neural network in a composition of functions where each layer is a function taking as input the outputs of the previous layer, and where the first layer takes the actual input examples to train the model with. Automatic differentiation is based on the fact that any function can be **decomposed in a graph** of very small operations of which we already know the derivatives (namely usual derivatives). Such graphs are called `computation graphs`.
 A computation graph is built in order to decompose complex operations in a composition of small nodes where each node contains one partial derivative w.r.t one variable.

<img src="/courses/autodiff/img/main.jpg" class="header-img"></img>
<div class="caption">Example of partial derivative computation with chain rule and computation graph. <br><a href="/chain-rule"> Go to chain rule course</a></div>

This computation graph is built during the <a href="https://www.run.ai/guides/machine-learning-inference/understanding-machine-learning-inference">inference</a> of the NN layers (named the <i>forward</i> pass); and the partial derivatives (namely the gradients) are computed in reverse sense of the network (named the <i>backward</i> pass). This setting is true in the case of `reverse-mode automatic differentiation`, which is the mode used in Deep Learning libraries for some reasons explained in the <a href="/autodiff">autodiff course</a>.

### Backpropagation

Backpropagation can be seen as a subset of reverse-mode automatic differentiation for scalar functions. Cost functions are mostly scalar functions $f: \real^n \rightarrow \real$ as their output is a single real number. This is why the `backpropagation` term is often used when training neural networks.

### Activation functions

A neural network is composed of many layers which are basically linear functions. **A composition of linear functions results in another linear function**. However, a classifier or regresser dealing just with linear functions is not efficient. In the <a href="/xor-sine">course on XOR and sine</a> functions approximation, we demonstrate that we need to use some non-linear functions to give the model the abality to leverage all possible non-linear representations (e.g. a classifier leveraging curves instead of straight lines).
This is why activation functions are used. Placed between linear layers, **they offer non-linearity** to the model so that any complex functions can be approximated (see the <a href="https://en.wikipedia.org/wiki/Universal_approximation_theorem">universal approximation theorem</a>).

<img src="/courses/autodiff/img/non-linearity.jpg" class="course-img"></img>
<div class="caption">Comparison of two models for a classification problem, without and with non-linear activation function.</div>

Many activation functions exist such as <a href="https://en.wikipedia.org/wiki/Rectifier_(neural_networks)">ReLU</a>, <a href="https://en.wikipedia.org/wiki/Hyperbolic_functions">tanh</a>, <a href="https://en.wikipedia.org/wiki/Sigmoid_function">sigmoid</a>...

### Optimizers

Optimizers are algorithms responsible of the training of any model. They take as input all the learnable parameters and their corresponding gradients w.r.t the loss function. They output new <i>optimized</i> parameters, so that the next prediction of the model performs better. The easiest way to optimize parameters is by multiplying the gradients to a constant representing the learning strength (i.e. learning rate), and then multiplying these reduced gradients to the actual value of parameters. This learning rate is mandatory in order to find mimimums in the function (see the <a href="/optimization"> optimization course</a>). The parameters and gradients should be `broadcastable` so that the multiplication of them is done using a broadcasted <a href="https://en.wikipedia.org/wiki/Hadamard_product_(matrices)">Hadamard product</a>, where each parameter is tuned using the corresponding partial derivative stored in the gradient. Thanks to <a href="https://numpy.org/doc/stable/user/basics.broadcasting.html">numpy broadcasting</a>, this product is simply done using the `*` operation. Many optimization techniques exist and are often based on `Stochastic Gradient Descent`.
