---
layout: post
title: "Seven Languages: Week 2 (Io) - Day 2"
description: Topics and exercises from Day 2 of Io from the book Seven Languages In Seven Weeks.
---

Day 2 of Io was the most difficult (as well as the most fun) day yet. It took me
quite a while to finish all the exercises to my satisfaction, and it
also had the most interesting exercises so far. One in particular (transposing a
matrix) was [my favorite.](/blog/2011/12/30/transposing-a-matrix-in-io/).

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2011/12/18/seven-languages-week-2-day-1/">Week 2 (Io) - Day 1</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

Topics covered
---

Day 2 of Io went over some basic topics (conditionals, loops and operators) as
well as some more complex subjects (messages and reflection).

Messages are a fundamental part of Io - except for comments and commas,
everything is a message. Once I began thinking like this, something clicked for
me. I started to really grok the code examples, and thinking and coding in Io
felt easier, more natural.

Io has simple, straightforward reflection: it actually isn't a burden to use or
read. Combined with Io's other design decisions this gives you quite a lot 
of power. You get ultimate control over your code, and the power to do whatever you
can think of with it - no restriction can stand in your way.

I wonder if this is how Lisp programmers have been feeling for decades.

A note about the Io community
---

While trying to find a way to write a short solution to #5, I ran across what
turned out to be a bug in Io's Range library. Thanks to the well-thought out
questions in Day 1, I already had a list of places to go for help. In the #io
channel on freenode I had the good luck to run into [Jeremy Tregunna](http://jeremy.tregunna.ca/) and told him
my problem. In a remarkably short period of time (minutes) he had confirmed that it was actually a bug,
made the fix, and had a pull request created on the main Io repository on github.
Shortly thereafter the patch was merged into the master branch where I downloaded
it, compiled it, and could run my previously-broken code!

It was a surprising and pleasant experience for me, and I'd like to thank Jeremy
in particular and the Io community in general for being so friendly,
supportive, and quick. Thank you!

Highlights from exercises
---

It was harder to pick out only a few to highlight - most of these questions were
fun to solve and had interesting solutions.

The one that I liked best was [transposing a matrix](/blog/2011/12/30/transposing-a-matrix-in-io/), and I felt there was
enough good material in there to warrant an article of its own.

The solution for Question #2 was unexpectedly straightforward. Once again, Io's
absolute flexibility and willingness to let you shoot yourself in the foot pays
off! The question was:

>    2. How would you change / to return 0 if the denominator is zero?

The answer was only two short lines of code:

{% highlight io %}
Number origDiv := Number getSlot("/")
Number / = method(denom, if(denom == 0, 0, self origDiv(denom)))
{% endhighlight %}

The tricky part at first was figuring out how to save a reference to the
original division method, but in retrospect it was blindingly obvious. It's the
same things I've been doing all along with Io: taking things out of slots and
putting things in slots!

I would also like to highlight Question #3 to show off how clean writing in a
functional style is in Io. The question was:

>    3. Write a program to add up all of the numbers in a two-dimensional array.

No loops needed here - Io has `map`, `filter`, `reduce`, and they mix **well** with
Io's syntax:

{% highlight io %}
addUp2DArray := method(array, array flatten reduce(+))
{% endhighlight %}

Full solutions
---

That's it for the highlights, but as I mentioned earlier, all of the exercises today were
pretty interesting. Here is a nicely formatted version of my solutions to the exercises from Day 2 of Io. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-2-io/day2.io) with the other exercises. The exercises this week are really worth taking a look at, I encourage you to follow along closely through the rest with me.

<div id="formatted_solutions">

<h3>Do:</h3>

<div class="question"><b>1.</b> Write a program to find the nth Fibonacci number. Fib(1) is 1, and fib(4) is 3. As a bonus, solve the problem with recursion and with loops.</div>

{% highlight io %}
fib_recur := method(num,
    if(num <= 1, num, fib_recur(num - 1) + fib_recur(num - 2) )
)

fib_loop := method(num,
    old := 0
    new := 1
    next := 0
    for(i, num, 1, -1,
        next = old + new
        old = new
        new = next
    )
    old
)

"Fib 0" println
fib_recur(0) println
fib_loop(0) println

"Fib 4" println
fib_recur(4) println
fib_loop(4) println

"Fib 8" println
fib_recur(8) println
fib_loop(8) println
{% endhighlight %}

<div class="tiny_title">Output</div>

{% highlight bash %}
Fib 0
0
0
Fib 4
3
3
Fib 8
21
21
{% endhighlight %}

<div class="question"><b>2.</b> How would you change / to return 0 if the denominator is zero?</div>

{% highlight io %}
# The tricky bit is saving a reference to the old method:
Number origDiv := Number getSlot("/")

# Overriding the / method is surprisingly straightforward
Number / = method(denom, if(denom == 0, 0, self origDiv(denom)))

4 / 2 println
4 / 0 println
{% endhighlight %}

<div class="tiny_title">Output</div>

{% highlight bash %}
2
0
{% endhighlight %}

<div class="question"><b>3.</b> Write a program to add up all of the numbers in a two-dimensional
array.</div>

{% highlight io %}
addUp2DArray := method(array, array flatten reduce(+))

addUp2DArray(list(2,3,4,5)) println
addUp2DArray(list(2,3, list(1,1,1), 4,5)) println
{% endhighlight %}

<div class="tiny_title">Output</div>

{% highlight bash %}
14
17
{% endhighlight %}

<div class="question"><b>4.</b> Add a slot called myAverage to a list that computes the average of all the numbers in a list. What happens if there are no numbers in a list? (<b>Bonus:</b> Raise an Io exception if any item in the list is not a number.)</div>

{% highlight io %}
# Easy way:
List myAverage := method(self average)

# Probably the way he meant (plus bonus):
List myAverage2 := method(
    containsNonDigit := select(x, x asNumber() isNan()) size > 0
    if(containsNonDigit, Exception raise("An item in the list is not a number"))

    flatList := self flatten
    flatList reduce(+) / flatList size
)

"Averaging the numbers in a list" println
list(1,2,3,4) myAverage2 println
#list(1,2,3,4,"a") myAverage2 println
{% endhighlight %}

<div class="tiny_title">Output</div>

{% highlight bash %}
2.5
{% endhighlight %}

<div class="question"><b>5.</b> Write a prototype for a two-dimensional list. The dim(x,y) method should allocate a list of y lists that are x elements long, set(x, y, value) should set a value, and get(x, y) should return that value.</div>

{% highlight io %}
List2D := List clone
List2D transposed := false

List2D dim := method(x, y,
    y repeat(
        inner := list()
        x repeat(inner push(nil))
        self append(inner)
    )
)

# Hmmm, let's try this again

# Make sure you have this commit before using this solution
# https://github.com/stevedekorte/io/commit/4907d9d618499daa8973c0db380317678c0abd51
List2D dim2 := method(x, y,
    y repeat(self append(Range 0 to(x) asList() map(nil)))
)

firstMatrix := List2D clone
firstMatrix dim(6,7) println
"" println

secondMatrix := List2D clone
secondMatrix dim2(6,7) println
"" println

# The below will cause infinite loop until you apply the change in the
# commit above
testBounds := List2D clone
testBounds dim2(0, 2)
testBounds dim2(0, 2)

List2D set := method(x, y, value,
    self at(x) atPut(y, value)
)

List2D get := method(x, y,
    self at(x) at(y)
)

"Setting and getting a matrix" println
firstMatrix set(2,4,"asdfad")
firstMatrix println
"" println

firstMatrix get(2,4) println
firstMatrix get(1,2) println
{% endhighlight %}

<div class="tiny_title">Output</div>

{% highlight bash %}
list(list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil))

list(list(nil, nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil, nil))

Setting and getting a matrix
list(list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, asdfad, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil))

asdfad
nil
{% endhighlight %}

<div class="question"><b>6. Bonus:</b> Write a transpose method so that (new_matrix get(y, x)) == matrix get(x,y) on the original list</div>

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

"2, 4: " print; firstMatrix get(2,4) println
"4, 2: " print; firstMatrix get(4,2) println

"transpose!" println
firstMatrix transpose

"2, 4: " print; firstMatrix get(2,4) println
"4, 2: " print; firstMatrix get(4,2) println
"Set 5, 3 to NEW" println; firstMatrix set(5,3, "NEW")
"5, 3: " print; firstMatrix get(5,3) println
"3, 5: " print; firstMatrix get(3,5) println

"transpose again!" println
firstMatrix transpose

"2, 4: " print; firstMatrix get(2,4) println
"4, 2: " print; firstMatrix get(4,2) println
"5, 3: " print; firstMatrix get(5,3) println
"3, 5: " print; firstMatrix get(3,5) println
{% endhighlight %}

<div class="tiny_title">Output</div>

{% highlight bash %}
2, 4: asdfad
4, 2: nil
transpose!
2, 4: nil
4, 2: asdfad
Set 5, 3 to NEW
5, 3: NEW
3, 5: nil
transpose again!
2, 4: asdfad
4, 2: nil
5, 3: nil
3, 5: NEW
{% endhighlight %}

<div class="question"><b>7.</b> Write the matrix to a file, and read a matrix from a file.</div>

{% highlight io %}
file := File with("matrix.txt")
file remove
file openForUpdating
file write(firstMatrix join(", "))
file close

file = File with("matrix.txt")
file openForReading
lines := file readLines
file close
lines at(0) type println
matrixFromFile := lines at(0) split(", ")
matrixFromFile type println
matrixFromFile println
{% endhighlight %}

<div class="tiny_title">Output</div>

{% highlight bash %}
Sequence
List
list(list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, asdfad, nil), list(nil, nil, nil, nil, nil, NEW), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil), list(nil, nil, nil, nil, nil, nil))
{% endhighlight %}

<div class="question"><b>8.</b> Write a program that gives you ten tries to guess a random number from 1-100. If you would like, give a hint of "hotter" or "colder" after the first guess.</div>

{% highlight io %}
randomNumber := ((Random value) * 100 + 1) floor

i := 0
guess := 0
while(i < 10 and guess != randomNumber,
    ("Guess a number between 1 and 100: (guess " .. i+1 .. " of 10): ") print
    guess = ReadLine readLine
    guess = if(guess asNumber isNan, 0, guess asNumber)
    if(guess > randomNumber, "Too high" println)
    if(guess < randomNumber, "Too low" println)
    i = i + 1
)

if(guess == randomNumber,
    "Congrats, you did it!" println,
    "Too bad, maybe next time" println)
{% endhighlight %}

<div class="tiny_title">Output</div>

{% highlight bash %}
Guess a number between 1 and 100: (guess 1 of 10): 50
Too high
Guess a number between 1 and 100: (guess 2 of 10): 25
Too low
Guess a number between 1 and 100: (guess 3 of 10): 38
Too low
Guess a number between 1 and 100: (guess 4 of 10): 44
Too high
Guess a number between 1 and 100: (guess 5 of 10): 41
Too low
Guess a number between 1 and 100: (guess 6 of 10): 43
Congrats, you did it!
{% endhighlight %}

</div>

Next in this series: [Day 3 of Io](/blog/2012/01/16/seven-languages-week-2-day-3/)
