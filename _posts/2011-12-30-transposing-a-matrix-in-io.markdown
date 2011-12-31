---
layout: post
title: "Transposing a matrix in Io"
---

While doing the exercises from Seven Languages In Seven Weeks, I came up with a
neat solution to transposing a matrix that was encouraged by Io's flexibility
and free-wheeling nature. Instead of creating a new transposed matrix or
attempting a complicated in-place transpose, I did something that executes in
O(1), uses a negligible amount of memory, and is very short and simple. 

What? How is it possible to transpose a matrix of 1,000,000 elements in
the same time it takes to transpose a matrix of 4? 

By cheating! I **don't** transpose the matrix, I modify the element accessor
methods so that they interpret the `x` parameter as `y`, and vice versa. To my
dismay, I later found that [this isn't a new approach](http://en.wikipedia.org/wiki/Transpose#Implementation_of_matrix_transposition_on_computers) to solving this 
problem. 

However, my implementation in Io still has something going for it. Because of Io's
extreme malleability, I can write my `transpose` method such that calling it
permanently swaps the argument order in the `get` and `set` methods of that
individual matrix object. In most other languages
<a href="#footnote-1" id="footnote-1-link" class="super">[1]</a>
, writing
this kind of fake transpose would require keeping track of state with if
statements to check if a given matrix is currently 'transposed' or not. This
is, conceptually, nonsense: transposing is something you *do to* matrices, not
a *property* of them.

Io lets you write this in a way that is fun, short, and elegant.

The Solution
---

Here is the problem statement from the book:

> Write a transpose method so that (new\_matrix get(y, x)) == matrix get(x,y) on the original list

Before we get started, this is what the final solution looks like. Try and
become a little familiar with this before we move on (it will all be explained
in detail below, don't worry).

{% highlight io %}
flipFirstTwoArgs := method(slotName,
    self getSlot(slotName) setArgumentNames( list(
        self getSlot(slotName) argumentNames at(1),
        self getSlot(slotName) argumentNames at(0),
        self getSlot(slotName) argumentNames rest rest
    ) flatten)
)

List2D transpose := method(
    self get = flipFirstTwoArgs("get")
    self set = flipFirstTwoArgs("set")
)
{% endhighlight %}

List2D is a simple matrix prototype from the previous exercise. It is
the thing that is being transposed.

The `transpose` method itself is simple enough: most of the heavy lifting is done in a helper
method I created, `flipFirstTwoArgs`. From its name and the name of its argument, we can
tell this method is saying: "give me the name of a slot that holds a method and
I will flip the first two arguments of that method".

Okay. So, how?


The Explanation
---

The following line of code gets the method we are going to modify and sets the names of its arguments.

**Line 1:**
{% highlight io %}
    self getSlot(slotName) setArgumentNames( 
        #list of argument names goes here 
    )
{% endhighlight %}

For a concrete example, if I just wanted to change the argument names for my "get" method from get(x, y) to get(y, x) I could hardcode in some values and call it like this:

{% highlight io %}
    self getSlot("get") setArgumentNames(list("y", "x"))
{% endhighlight %}

But that wouldn't quite be fancy enough. I'd rather write a method that would let me swap the first two arguments of **any** method. So, going back to the snippet above, that's what the next two lines do:

**Lines 2-3:**
{% highlight io %}
    self getSlot(slotName) argumentNames at(1),
    self getSlot(slotName) argumentNames at(0),
{% endhighlight %}

If I wanted to keep the arguments in the same order I would have put the 0 in the first line, then the 1 in the second line. Make sense so far?

I could have left it here, but then what would happen if I told it to change a method that looked like `doSomething(x, y, z)`? The z would get discarded and that method wouldn't be very useful anymore. Hence the next line:

**Line 4:**
{% highlight io %}
    self getSlot(slotName) argumentNames rest rest
{% endhighlight %}

`rest` is Io's version of `cdr` or `tail`. It is a method that returns everything except for the first element of a list. So if you call `rest` on the result of `rest` you get a list that has all its elements except for the first two. It is like saying `drop 2` in Haskell.

Let's recap. If I had called flipFirstTwoArgs with my fictitious `doSomething(x, y, z)` method, these previous lines would resolve into:

{% highlight io %}
    self getSlot("doSomething") setArgumentNames( list(
        "y", 
        "x", 
        list("z")
    ) )
{% endhighlight %}

That's not quite right, `setArgumentNames` is expecting a simple flat list, none of this nested list stuff. So let's flatten the list of argument names before giving it to `setArgumentNames`.

**Line 5:**
{% highlight io %}
    ) flatten )
{% endhighlight %}

If we apply it to the `doSomething` example, the code now looks like this:

{% highlight io %}
    self getSlot("doSomething") setArgumentNames( list(
        "y", 
        "x", 
        list("z")
    ) flatten ) 
{% endhighlight %}

Which would end up resolving into:

{% highlight io %}
    self getSlot("doSomething") setArgumentNames( list("y", "x", "z") )
{% endhighlight %}

There, much better. And that explains the last line!

Wrap-up
---

Now, putting back together all the lines I've explained, here is the body of the
`flipFirstTwoArgs` method again:

{% highlight io %}
    self getSlot(slotName) setArgumentNames( list(
        self getSlot(slotName) argumentNames at(1),
        self getSlot(slotName) argumentNames at(0),
        self getSlot(slotName) argumentNames rest rest
    ) flatten)
{% endhighlight %}

If I've done my job right, it should make a lot more sense this time.

You can find the rest of the code (including the List2D prototype) on github -
a good place to start is [line 72 of day2.io](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-2-io/day2.io#L72). To read more I've written
about solving these exercises, check my [project page for Seven Languages in Seven Weeks](/projects/seven-languages-in-seven-weeks/).

<h3>Footnotes</h3>

<ol><li>There are exceptions of course. I'm sure any lisp would be great at this, as well as Ruby, Groovy, and other languages with powerful metaprogramming capabilities. <a href="#footnote-1-link" id="footnote-1">↩</a></li></ol>
