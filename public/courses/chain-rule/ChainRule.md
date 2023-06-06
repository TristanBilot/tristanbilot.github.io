<span class="date">Deep Learning from sratch</span>
# Chain rule and computation graphs
<div class="subtitle">How to compute derivatives of composite functions by hand using computation graphs and chain rule?</div>

<img src="/courses/chain-rule/img/g6.jpg" class="course-img"></img>

<span class="link-quote"><a href="https://github.com/TristanBilot/DL-from-0" target="_blank" rel="noopener noreferrer">The code is available on <i class="fab fa-github"></i> GitHub</a></span>

Derivatives are essential in the training of every neural networks. Indeed, they are the ones which give the way to compute the gradient, responsible for the optimization of any Deep Learning model.

A neural network is nothing more than a composition of multiple functions (<a href="https://en.wikipedia.org/wiki/Function_composition">composite function</a>) where each function represents a layer is the net, with a set of parameters and outputs. 

<img src="/courses/chain-rule/img/nn.jpg" class="course-img"></img>

The previous neural net can be described formally using a composition of functions such as:

$$
y = g \circ f \\
\Leftrightarrow \\
y = g(f(a, b, c))
$$
with $\circ$ the composition symbol.

Stacking more layers is thus equivalent to adding more compositions of functions where the outputs of one function are the inputs of the next one.

In a traditional neural net, we are interested in computing the partial derivatives of every layers with respect to their input variables (or neurons). In this first course, we will focus on computing the whole derivative of any composite functions and will later focus on partial derivatives to compute the <a href="https://en.wikipedia.org/wiki/Gradient">gradient</a> for downstream <a href="https://en.wikipedia.org/wiki/Gradient_descent">gradient descent</a>.

As you may know, derivatives can be computed by hand using formulas such as:

$$
f\prime(u^n) = nu\prime u^{n-1} \\ ex: f\prime(x^4) = 4x^3 \\
$$

$$
f\prime(uv) = vu\prime uv\prime \\ ex: f\prime(3x2x) = 2x.3+3x.2 = 12x
$$

However, as a neural net is a composition of functions, we also need a way to compute the derivative of such compositions. Fortunately, any composition can be computed using the <a href="https://en.wikipedia.org/wiki/Chain_rule">chain rule</a>:

$$
(g \circ f)\prime (x) = g\prime (f(x)).f\prime (x)
$$

Thanks to this formula, it is possible to compute complex derivatives automatically and in milliseconds. But how?

## Computation graph
---

### Simple graphs

A computation graph is an abstraction responsible of the ordering flow of computations done in a neural net while its training. Most famous Deep Learning frameworks use computation graphs behind the hood because we will see that it is an elegant way to easily compute derivatives and partial derivatives of composite functions. By representing a neural net as a computation graph, we can also better visualize how the chain rule is applied to a series of layers.

<img src="/courses/chain-rule/img/g1.jpg" class="course-img"></img>

Here is a simple example of how works a computation graph. The innermost expression is computed first, then the previous one, etc.

First, let's compute the derivative of $f(x)=cos(2x^2)$. Using a computation graph, this function can be decomposed in two simple operations $a$ and $b$ such that $f(x) = b(a(x))$ with $b = cos(.)$ and $a = 2x^2$. The derivatives of $a$ and $b$ are already known because they are classical usual derivatives. This computation can be represented as a graph where nodes are functions and edges are `compositions` or `operations`.

<img src="/courses/chain-rule/img/g2.jpg" class="course-img"></img>

For each node in the computation graph, the local derivatives are computed (e.g. $f\prime(a)$ and  $f\prime(b)$), which is easy to achieve by applying usual derivatives. Then, the chain rule can be applied by just doing the multiplication of all the derivative nodes in the reverse order (i.e. $b\prime.a\prime$). The result can be verified using the chain rule formula:

$$
f\prime(x)=b\prime(a(x))a\prime(x)
$$

This calculation is easy to compute by an algorithm because we just need to store all the local derivatives of the nodes and multiply them.

<blockquote> Well, this is just the application of the chain rule formula but what if we add multiple functions?</blockquote>

<img src="/courses/chain-rule/img/g3.jpg" class="course-img"></img>

The logic remains the same even if the number of compositions is arbitrary. All we have to do is multiplying every derivative nodes. In this case, the formula can easily be computed graphically:

$$
f\prime(x) = c\prime(b(a(x))).b\prime(a(x)).a\prime(x)
$$

### Operations on graphs

In many cases, including neural networks, arithmetic operations are applied to compositions of functions such as the product and the sum. 

#### Product

<img src="/courses/chain-rule/img/g4.jpg" class="course-img"></img>

In the case of multiplication, the formula is also pretty easy, we do the sum of the product of the derivatives of each factor with the innermost function of the other factor (the rightmost function of the other branch on the graph). This can be formalized like so:

$$
f\prime(x) = b_1\prime(x).a_1\prime(x).b_2(x) + b_2\prime(x).a_2\prime(x).b_1(x)
$$

In the previous example, we compute the product of the derivatives of the first branch ($a_1\prime . b_1\prime$) with the innermost function of the other branch ($b_2$), we end up with $b_1\prime.a_1\prime.b_2$. We then do the same thing for the other branch: $b_2\prime.a_2\prime.b_1$. By summing both results we get the previous formula of $f\prime(x)$.

For products with more than 2 factors, the derivative of the first 2 products will be computed, then the same computation will be applied with this result and the 3rd product, etc. Thus, the previous formula will be applied $n-1$ times for a product of $n$ factors. 

#### Sum

The sum is more obvious than the product as the derivative of a sum is the sum of the derivatives.

<img src="/courses/chain-rule/img/g5.png" class="course-img"></img>

$$
f\prime(a+b) = f\prime(a)+f\prime(b)
$$

#### Combining operations

Once we know how to compute operations, it is possible to combine them.

<img src="/courses/chain-rule/img/g6.jpg" class="course-img"></img>

In such case, we first compute the derivative of the parenthesis, let's name it $y$: 

$$
y = a\prime b+b\prime a+c\prime d+d\prime c
$$

Then a product is applied between $y$ and $e$, so the derivative is:

$$
f\prime = y\prime.e + e\prime.y
$$

## Implementation in Python

In this section, we will implement a very basic derivative engine which can apply the chain rule on composite functions and return the derivative expression or inference as plain text w.r.t one variable.
A real automatic differentiation engine will be implemented in <a href="/autodiff">the next course</a> but the aim of this one is to better understand chain rule by implementing it.

First, let's define the needed classes:

<pre class="code-style"><code class="lang-python"> 
class Node: ...
class ExprNode(Node): ...
class FuncNode(Node): ...
class Parser: ...
class Expression: ...
</code></pre>

The `Node` class is basically an abstract class which will be inherited by `ExprNode` (the class representing an expression with or without exponent such as $x$, $x^2$ or $3x^2$) and `FuncNode` (responsible of representing functions such as $exp$, $sin$, $cos$).
The `Parser` class is the one which will do the lexing and parsing of the raw input text expression to derivate. `Expression` is a wrapper class which contains the parser and does the actual differentiation and inference.

First, the parser transforms the input expressions as a list of nodes (`ExprNode` or `FuncNode`), so that we can next process the chain rule easily.
<blockquote>The code of the parser can be found on the repo.</blockquote>

**Example:**

<pre class="code-style"><code class="lang-python"> 
parser = Parser("sin(cos(10x^11))")
print(parser.parse())
# [sin, cos, 10x^11]
</code></pre>

Where $sin$ and $cos$ are `FuncNode` and $10x^{11}$ is `ExprNode`.

An `ExprNode` is here a simple variable of the form: $k. var^{n}$, where $k$ is a constant, $var$ is the name of a variable like $x$ and $n$ is an exponent. Every node supports 2 operations: `string` (or symbolic): $f\prime(2x^2)=4x$, and `inference`: $f\prime(2x^2)=12$, for $x=3$.

<pre class="code-style"><code class="lang-python"> 
class ExprNode(Node):
    def __init__(self, val):
        self.val = val

    def value(self):
        return {
            "infer": lambda x: self._make_calculus(self.val, x),
            "string": self.val
        }

    def derivative(self):
        constant, var, power = self._get_constant_var_pow(self.val)
        if power == "":
            return {
            "infer": lambda x: self._make_calculus(self.val, x),
            "string": constant,
        }
        power = int(power)
        constant = int(constant if constant != "" else 1)
        expr = f"{power * constant}{var}{'^' + str(power - 1) if power != 2 else ''}"

        return {
            "infer": lambda x: self._make_calculus(expr, x),
            "string": expr
        }
</code></pre>

`value()` returns two different values depending on the operation mode. For `infer`, the expression will be computed using the `_make_calculus()` function.

**Example:** 

<pre class="code-style"><code class="lang-python"> 
print(self._make_calculus("2x^2", 2))
# 8
</code></pre>

For `string`, the original string will be returned to be print in the final derivative expression.


`derivative()` computes the derivative expression (as text) of the expression.

**Example:** 

<pre class="code-style"><code class="lang-python"> 
print(self.derivative("x^9"))
# "9x^8"

print(self.derivative("3x^5"))
# "15x^4"
</code></pre>


 `_get_constant_var_pow()` is used to extract the constant, the variable name and the power in the expression.

**Example:** 

<pre class="code-style"><code class="lang-python"> 
print(self._get_constant_var_pow("x^9"))
# (1, x, 9)
</code></pre>

Next, the `FuncNode` contains a mapping between the string name of a function and its local derivative (as text and as inference). This mapping is used to retrieve the derivative from the parsed tokens.

<pre class="code-style"><code class="lang-python"> 
class FuncNode(Node):
    def __init__(self, val):
        self.val = val

    def value(self):
        funcs = {
            "cos": {
                "infer": lambda x: math.cos(x),
                "string": "cos"
            },
            "sin": {
                "infer": lambda x: math.sin(x),
                "string": "sin"
            },
            ...
</code></pre>

### Symbolic derivative

All the logic responsible of the derivation with chain rule is stored in the `Expression` class:

<pre class="code-style"><code class="lang-python"> 
class Expression:
    def __init__(self, expr):
        self.parser = Parser(expr)
        self.nodes = self.parser.parse()

    def differentiate(self, x=None):
        if x is None:
            return self._differentiate()
        return self._infer(x=x)
</code></pre>

When instantiated, the given expression to derivate is parsed into nodes.
`differentiate()` is a wrapper function which computes the symbolic derivative when no argument is given and computes the derivative result if the value of the variable is given, ex: $x=5$.

<pre class="code-style"><code class="lang-python"> 
def _differentiate(self):
    expr = ""
    nodes = self.nodes

    for i, derivative_node in enumerate(nodes):
        expr += self._update_expr(derivative_node, derivative=True, field="string")
        for no_derivative_node in nodes[i+1:]:
            expr += self._update_expr(no_derivative_node, derivative=False, field="string")

        nb_funcs = len([n for n in nodes[i+1:] \
            if isinstance(derivative_node, FuncNode)])
        expr += ')' * nb_funcs
        expr += " * " if i != len(nodes) - 1 else ""
    return expr
</code></pre>

`_differentiate()` implements the same algorithm discussed in the <i>Simple Graphs</i> section:

* We start from the innermost node in the graph (i.e. the outermost function of the expression) (here i=0)
* We compute its local derivative 
* We stack all the i+1 left nodes in the parenthesis without computing their derivatives, as we are just computing the derivative of the outer function at each step, ex: $a\prime(b)$.

Note that `_update_expr()` is just a function which will get the derivative or the symbolic derivative given the `derivative` parameter.

**Example:**

$$exp = "sin(cos(x))"$$

$$nodes = [sin, cos, x]$$

$$exp\prime = sin\prime(cos(x)) . cos\prime(x) . x\prime$$

$$exp\prime = cos(cos(x)) . (-sin(x)) . 1$$

That's it! The **chain rule** is implemented right here.

$$
b(a(x))\prime=b\prime(a(x))a\prime(x)
$$

**Tests:**

<pre class="code-style"><code class="lang-python"> 
exp = "sin(exp(sin(x^9)))"
diff = Expression(exp)
assert diff.differentiate() == "cos(exp(sin(x^9))) * exp(sin(x^9)) * cos(x^9) * 9x^8"

exp = "cos(cos(sin(exp(sin(4x)))))"
diff = Expression(exp)
assert diff.differentiate() == "-sin(cos(sin(exp(sin(4x))))) * -sin(sin(exp(sin(4x)))) * cos(exp(sin(4x))) * exp(sin(4x)) * cos(4x) * 4"
</code></pre>

### Derivative inference

Computing the inference of the derivative is easy as we just have to compute the symbolic derivative using `differentiate()` and then doing the inference of each node along with the arithmetic operations. The only thing to do is to get the inference function of each node, compose them and apply the multiplication operations between every terms.

<pre class="code-style"><code class="lang-python"> 
def _infer(self, x):
    derivative = self._differentiate()
    nodes = Parser(derivative).parse()

    mul_groups, tmp = [], []
    for node in nodes:
        if node.val == "*":
            mul_groups.append(tmp)
            tmp = []
        else:
            tmp.append(node)
    mul_groups.append(tmp)

    product = 1
    for group in mul_groups:
        tmp = x
        for node in reversed(group):
            func = node.value()["infer"]
            tmp = func(x=tmp)
        product *= tmp

    return product
</code></pre>

**Tests:**

<pre class="code-style"><code class="lang-python"> 
exp = "cos(2x)"
diff = Expression(exp)
assert round(diff.differentiate(x=2), 2) == 1.51

exp = "cos(exp(sin(cos(cos(3x^9)))))"
diff = Expression(exp)
assert round(diff.differentiate(x=5), 2) == 423175.18
</code></pre>

## Next steps

In the <a href="/autodiff">next course</a>, a real `AutoDiff` engine will be implemented with `backpropagation` and operator overloading.
