---
layout: post
title: "Seven Languages: Week 2 (Io) - Day 3"
---

Since this is the last day of Io, I am going to reflect a bit on what I liked about it.

I learned that a small prototype-based language like Io can still be
expressive and powerful. There are no classes or modules, but you don't need
them to put things together in a way that mimics classes or modules. It was very
refreshing.

It also turned out that I got a practical result directly relevant to my current
work from learning Io: it strengthened my understanding of javascript. The
underlying way javascript works makes sense to me on a deeper level now. I am
actually in the middle of reading 
[Javascript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do), 
and I can glance at the parts to do with explaining prototypes and think "Aha!
This is obvious and makes total sense to me!" I am positive I would not have
thought the same before this experience.

Io's minimalism also whetted my appetite for learning a lisp. Clojure is coming
up in a few chapters, and I am looking forward to it. Scheme is also on my
horizon (if a bit farther out), but that's a subject for another post. 

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2012/01/11/seven-languages-week-2-day-2/">Week 2 (Io) - Day 2</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

Topics covered
---
The last day of Io covered some more advanced language features, mostly focused
on metaprogramming. 

**Metaprogramming and internal DSLs** were the main focus of the text, the
examples, and the exercises. But for good reason! Again Io's firm commitment to
letting you do whatever you want to (even up to the point of allowing you to
cripple core language features!) shows the power it can give.  

You can create custom behavior for curly brackets just by sticking a method into
the `curlyBrackets` slot. You can redefine the colon operator by calling
`addAssignOperator` with `:` and the name of the method you want to use. Io also
has an equivalent to Ruby's `method_missing`, except in Io it is called
`forward` and it is a crucial part of prototypal inheritance. 

**Example time!** Say you send a message called `fly` to an object we'll call
`Mallard`. In this example, `Mallard` is a clone of the `Duck` prototype, and
has some additional slots we don't care about right now. The important thing is
that `Mallard` *doesn't* have a `fly` slot (it is probably defined in `Duck` or
somewhere else further up the chain), so when we send the `fly` message to
`Mallard` it will say "Huh, can't do anything with this" and *forward* that
message to its prototype to deal with.

Putting a method in the `forward` slot of an object lets us customize what
happens when an object receives a message it doesn't know what to do with.
Instead of forwarding the message on to its prototype (as in the example above),
we can start to do some pretty interesting things, which you will see in my
highlights from the exercises.

**Concurrency** was also talked about, and Bruce showed how Io can
handle that with **coroutines, actors, and futures**. Futures and coroutines I am
already familiar with, and it was nice to see how seamless they were to use in
Io. I am pretty sure I didn't really grok the section on actors. 

In Io you can make an object into an actor just by sending an asynchronous
message to it (which you do with `@@`). This may be cool but I'm not sure,
because I don't understand the implications of actors yet. Once I get to the
Erlang section is likely when I'll start learning more about them and this will
start to be impressive in retrospect.

Highlights from exercises
---

These exercises focused on expanding on the XML DSL example that was used to demonstrate
`forward` during this chapter.

I was not really satisfied with my solution - I couldn't manage to make it feel
as elegant as my previous ones. It might be because this problem is inherently a
little bit messy, or more likely, there are still some bumps in my
implementation that could be smoothed out.

Io's `forward` method, reflection abilities, and ability to redefine operators
all played key roles in making a problem like this possible to solve with an
internal (as opposed to [external]()) DSL. This saved a ton of time and effort
on my part.

<h3>Forward</h3>

This is a simple stripped down chunk from the XML DSL example from the book. It
lets you make a rudimentary XML DSL. The following section of code will turn
`Builder div` into `<div></div>`. The downside is, it will also turn `Builder
span` into `<div></div>`!

{% highlight io %}
    Builder := Object clone

    Builder forward := method(
        write("<div>")
        write("</div>")
    )
{% endhighlight %}

<h3>Reflection</h3>

Reflection in Io was covered in Day 2 of the book, but it is an important part
of this example. It provides the ability to access the *name of the message*
that was sent with `call message name`. It also lets us start nesting calls by
passing another function call as an argument. This example is complete enough
that we can do `Builder ul(li("One"), li("Two"), li("Three"))` and it will
correctly print out `<ul><li>One</li><li>Two</li><li>Three</li></ul>`.

{% highlight io %}
    Builder := Object clone

    Builder forward := method(
        write("<", call message name, ">")
        call message arguments foreach(
            arg,
            content := self doMessage(arg);
            if(content type == "Sequence", write(content)))
        write("</", call message name, ">"))
{% endhighlight %}

Let's go over that middle chunk that begins with `call message arguments`. Just
as `call message name` will return the name, `call message arguments` returns a
list of the arguments. We iterate over that list with `foreach`, and for each
`arg` we do two things:

1. Execute it with `self doMessage`. If the argument is another method call like
   `li("One")` then `Builder li` gets executed, `Builder` can't find a slot with
   that name, and `forward` gets called again. We are recursing now, and this
   will continue until we hit an argument that is a simple string, like `"One"`.
   When we do, `doMessage` will just turn that argument into a string. This
   leads to the second step:
2. If the executing argument is a simple string (`if(content type == "Sequence",`)
   then print it out!

That's enough for a simple XML DSL in Io. The exercises are about taking this
base and expanding it to handle attributes and generate xml with correct
indentation. If you're interested in seeing that, just scroll down to my full
code listing!

<h3>Operator Redefinition</h3>

Now that you've made it through that, let's close with something easy. 
Exercise #2 was simple and served as a hint for the next one. In Io you can
override what `{1, 2, 3}` means by putting a method into `curlyBrackets`. The
contents `1`, `2`, and `3` will be available as the arguments of the message. 
If you were paying attention before, you'll realize that we already know how to
turn the message arguments into a list:

{% highlight io %}
    # 2. Create a list syntax that uses brackets
    curlyBrackets := method(
        call message arguments
    )
{% endhighlight %}

So that's all that is required to solve that! But that isn't the typical way to
redefine operators in Io. I'll leave you with a final example that shows you how
to tell Io "when I use the `:` operator, I really want you to call the
`atPutNumber` method instead".

{% highlight io %}
    OperatorTable addAssignOperator(":", "atPutNumber")

    Map atPutNumber := method(
        # your code goes here
    )
{% endhighlight %}

Full Code Listing
---

Here is my full code listing for the exercises from Day 3 of Io. The home of this piece of code is with the other exercises [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-2-io/day3.io).  

{% highlight io %}
Builder := Object clone

Builder forward := method(
    writeln("<", call message name, ">")
    call message arguments foreach(
        arg,
        content := self doMessage(arg);
        if(content type == "Sequence", writeln(content)))
    writeln("</", call message name, ">")
)

# Do: 
#
# 1. Enhance the XML program to add spaces to show the indentation structure

Builder indentLevel := 0

Builder forward = method(
    writeln(makeIndent() .. "<", call message name, ">")
    indentLevel = indentLevel + 1
    call message arguments foreach(
        arg,
        content := self doMessage(arg);
        if(content type == "Sequence", writeln(makeIndent() .. content))
    )
    indentLevel = indentLevel - 1
    writeln(makeIndent() .. "</", call message name, ">")
)

Builder makeIndent := method(
    spaces := ""
    indentLevel repeat(spaces = spaces .. "  ")
    return spaces
)

"\nIndented builder syntax:" println
Builder ul(
            li("Io"),
            li("Lua"),
            li("JavaScript")
        )

# 2. Create a list syntax that uses brackets

curlyBrackets := method(
    call message arguments
)

"\nBracket list syntax:" println
"{1,2,3,4,5} println" println
{1,2,3,4,5} println
"{\"a\", \"b\", \"c\", \"d\", \"e\"} println" println
{"a", "b", "c", "d", "e"} println

# that was unexpectedly easy and elegant. I almost feel like I've missed something


# 3. Enhance the XML program to handle attributes: if the first argument is a
# map (use the curly brackets syntax), add attributes to the XML program. For
# example: book({"author": "Tate"}...) would print <book author="Tate">

OperatorTable addAssignOperator(":", "atPutNumber")

Map atPutNumber := method(
    self atPut(
        call evalArgAt(0) asMutable removePrefix("\"") removeSuffix("\""),
        call evalArgAt(1)
    )
)
        
curlyBrackets := method(
    r := Map clone
    call message arguments foreach(arg,
        r doMessage(arg)
    )
    r
)

Map printAsAttributes := method(
    self foreach(k, v,
        write(" " .. k .. "=\"" .. v .. "\"")
    )
)

Builder forward = method(
    write(makeIndent() .. "<", call message name)
    indentLevel = indentLevel + 1
    isFirst := true
    call message arguments foreach(
        arg,
        if(isFirst,
            if(arg name == "curlyBrackets", 
                (self doMessage(arg)) printAsAttributes
            )

            write(">\n")
            isFirst = false
        )

        content := self doMessage(arg)
        if(content type == "Sequence", writeln(makeIndent() .. content))
    )
    indentLevel = indentLevel - 1
    writeln(makeIndent() .. "</", call message name, ">")
)

"\nBuilder syntax with attributes:" println
s := File with("builderSyntax.txt") openForReading contents
html := doString(s)
html println
{% endhighlight %}

And the output:

    Indented builder syntax:
    <ul>
      <li>
        Io
      </li>
      <li>
        Lua
      </li>
      <li>
        JavaScript
      </li>
    </ul>

    Bracket list syntax:
    {1,2,3,4,5} println
    list(1, 2, 3, 4, 5)
    {"a", "b", "c", "d", "e"} println
    list("a", "b", "c", "d", "e")

    Builder syntax with attributes:
    <ul>
      <li>
        Io
      </li>
      <li display="none">
        Lua
      </li>
      <li>
        JavaScript
      </li>
      <book author="Tate">
      </book>
    </ul>
    nil
