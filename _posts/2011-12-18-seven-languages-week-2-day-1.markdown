---
layout: post
title: "Seven Languages: Week 2 (Io) - Day 1"
---

Day 1 of Io is the first of many chapters that will give me that 'new at
programming' feeling again, where I fumble just trying to build a valid
expression that does what I want it to. I actually like that feeling; it means I
am learning something new and a web of structures is forming in my
mind. I like it _almost_ as much as finally making that first deep
connection from a group of new concepts to some of your existing ones, and
starting to grasp the parallels. Fortunately for me, that is what this book is all
about!

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2011/12/15/seven-languages-week-1-day-3/">Week 1 (Ruby) - Day 3</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

How Io feels
---
Syntactically, Io is a very very lightweight language, evocative of lisps in its
regularity and minimalism. It provides a nice contrast with the previous chapter
on Ruby. Ruby's definition of simple code is something like "The more an
expression reads like a (succinct) explanation of its intent, the better"
whereas Io's definition of simple code is something like "The less extraneous
syntax that is needed to represent an expression, the better". 

Because of this approach, Io lends itself very well to metaprogramming -- at
least as well as Ruby does, possibly better. It does not have as the wide and
varied set of built-in metaprogramming tools that Ruby does, but it also needs
far fewer due to the way the language is constructed. Io is a
[prototype-based](http://en.wikipedia.org/wiki/Prototype-based_programming)
language, the first of the less familiar programming paradigms in this book. I won't
go into depth about this here except to note that Javascript is prototype-based
as well, so learning Io could be very beneficial to anyone that does a fair
amount of programming Javascript.

Highlights from exercises
---
The homework this week is short but well-constructed. It points out a couple of
things that are important to remember for a newbie to Io. In particular, you
will need `slotNames` a lot, so remember that one!

Other than that, there isn't much to say about the homework this week. Remember
`slotNames` and read the code listing.

Full Code Listing
---

Here is my full code listing for the exercises from Day 1 of Io. The home of this piece of code is with the other exercises [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-2-io/day1.io).  

{% highlight io %}
# Find:
#   Some Io example problems
#       http://www.iolanguage.com/about/samplecode/
#
#   An Io community that will answer questions
#       http://tech.groups.yahoo.com/group/iolanguage/messages
#       http://stackoverflow.com/questions/tagged/iolanguage
#       #io on freenode
#       http://www.reddit.com/r/iolanguage
#
#   A style guide with Io idioms
#       http://en.wikibooks.org/wiki/Io_Programming/Io_Style_Guide
#
# Answer:
#
# 1. Evaluate 1 + 1 and then 1 + "one". Is Io strongly typed or weakly typed?
#
#   Strongly typed. Trying to run `1 + "one"` throws an exception that says:
#       "Exception: argument 0 to method '+' must be a Number, not a 'Sequence'"
#   
# 2. Is 0 true or false? What about the empty string? Is nil true or false?

if(0) println   # true
if("") println  # true
if(nil) println # false

# 3. How can you tell what slots a prototype supports?
# <prototype> slotNames

Zerg := Object clone
Zerg sixPool := "Zergling rush!"
Zerg slotNames println  # will print list(type, sixPool)

# 4. What is the difference between = (equals), := (colon equals), and ::=
# (colon colon equals)? When would you use each one?
#
# =     is used to assign something to an existing slot
# :=    is used to assign something to a previously non-existent slot
# ::=   is used to assign something to a previously non-existent slot as well as
#       create a setter for that slot
#   
#   iolanguage.com's guide puts this much much better than I did:
#
# ::= 	Creates slot, creates setter, assigns value
# := 	Creates slot, assigns value
# = 	Assigns value to slot if it exists, otherwise raises exception 
#
#
# Do:
#
# 1. Run an Io program from a file.
#
# From the command line run: io day1.io
#

"successfully ran day1" println

# 2.Execute the code in a slot given its name.
#
# I'm not quite sure I understood this question. I'll answer the two
# interpretations I could come up with.
#
# If the code in a slot is stored as a method then just invoking the slot is
# enough:

Zerg macroItUp := method("Injecting larvae now!" println)
Zerg macroItUp # Will print "Injecting larvae now!"

# If the code in a slot is stored as a string then you should use something like
# doString:

Zerg macroHarderSteps := ("\"Spreading creep now!\" println")
Zerg macroHarder := method(doString(Zerg macroHarderSteps))
Zerg macroHarder

# Update: Re-reading this now the intent of the question seems obvious! Write a
# method that, given a method name, will try to execute that method.
"\nLet's try that again" println
Zerg specifyMacro := method(name, perform(name))
Zerg specifyMacro("macroItUp")
Zerg specifyMacro("macroHarder")
"Done!" println
{% endhighlight %}

And the output:

{% highlight bash %}
$ io day1.io
true
true
false
list(type, sixPool)
successfully ran day1
Injecting larvae now!
Spreading creep now!

Let's try that again
Injecting larvae now!
Spreading creep now!
Done!
{% endhighlight %}

Next in this series: [Day 2 of Io](/blog/2012/01/11/seven-languages-week-2-day-2/)
