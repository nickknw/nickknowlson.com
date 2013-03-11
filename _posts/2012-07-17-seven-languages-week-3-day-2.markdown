---
layout: post
title: "Seven Languages: Week 3 (Prolog) - Day 2"
description: Writeup about topics and exercises from Day 2 of Prolog from the book Seven Languages In Seven Weeks.
---

Day 2 of Prolog really emphasized its declarative aspects for me. Writing Prolog
well _requires_ you to think differently about the way you approach the problem.
Yes, given enough time you can hack something together (I've sure proven that!), but
you can get a lot more out of it by learning to structure your thoughts to fit
the way Prolog works. All languages are like this to some extent, and this isn't
a bad thing. The difference is in degree - existing imperative and
functional programming thought patterns help a lot less in Prolog.

So what, in short, makes it so different? Putting aside my impulse to
immediately whip out some code samples, I think characterizing it like this is
an accurate enough high level summary for now:

<ul class="compact_list">
<li><b>Imperative programming:</b> you state what steps you want the machine to perform</li>
<li><b>Functional programming:</b> you state what operations you want to apply to some data</li>
<li><b>Logic programming:</b> you state what goals will make this rule true</li>
</ul>

Like my other experiences so far with Prolog, Day 2 was a mix of "this is
brilliant!" and "this is incredibly frustrating". It is possible to do some
really cool things with Prolog (and other logic languages like Curry, Mercury,
and Oz. Also Datalog and constraint solving libraries, which I am covering in
Day 3), but it has some decently sized stumbling blocks as well:

**Documentation**: 

* Resources for someone learning Prolog are sparse, even
  compared to a very new language like Io. When looking for documentation you can
  quickly find yourself reading academic papers. While these are interesting
  they are not especially useful when I just want to know more about list
  syntax or how to use higher order functions.

* As an aside, it turns out Prolog does in fact have [higher order function](http://www.j-paine.org/dobbs/ho_span_count.html) 
  equivalents (or should I say higher order rules?). I didn't actually know
  about this until I came back to write this post after doing the exercises .

**Troubleshooting**: 

* You have an almost absolute lack of help when something
  goes wrong with your Prolog program. 

* Many syntax errors don't give you much
  information as to what you've phrased incorrectly, leaving you to go back to
  your program and try tweaking things that look off. For someone who has already
  internalized the syntax I am sure this isn't an issue, but for people still
  learning it can be quite frustrating. One example of something that gave me a
  hard time was `ERROR: Arguments are not sufficiently instantiated`. That
  cryptic message is literally the only information you get: no line numbers,
  rule names, or any other hints.

* More serious than syntax is trying to fix logical errors. It was common for
  me to have a program with some small flaw and just get back `false.` when
  attempting to run it. It is hard to pick apart exactly what went wrong.
  Prolog is a [little bit famous for this](http://www.j-paine.org/dobbs/prolog_lightbulb.html).

**Recursion** used to be on this list, but most of the issues I had turned out to
really be a lack of knowledge on my part. It _was_ difficult for
me to acquire that knowledge though, so I am going to document the parts that
gave me the most trouble here in hopes I can save some future programmer a bit
of time.

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2012/02/05/seven-languages-week-3-day-1/">Week 3 (Prolog) - Day 1</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

Topics covered
---

Day 2 of Prolog went over lists, unification, and recursion.

I am going to write about these topics with a focus on the problems I
encountered while trying to write solutions to the exercises (and another simple
program that calculated [combinations](http://en.wikipedia.org/wiki/Combination)).

<h3>Lists</h3>

Most of the trouble I had with lists was centered around the cons syntax for lists
that is so useful in pattern matching. In Haskell, this looks like `(x:xs)`,
`(x:y:tail)`, or even `(x:y:z:[])`. When I first learned this syntax in Prolog I
didn't have enough examples to form a correct mental model of the way it worked.

So, here are bunch of valid examples of constructing lists.

Basic examples:

{% highlight prolog %}
[X, Y, Z]           % normal list syntax - list of three elements

[X|Xs]              % basic use of cons operator - divide list into head (X) and tail (Xs)

[X|[]]              % appending an empty list to a single item gives you a list with one element
[X]                 % a shorter way to express having a list with a single element

[X, Y]              % list with two and only two elements - regular syntax
[X|[Y|[]]]          % same - using full cons syntax
[X|[Y]]             % same - without the unnecessary empty list concatenation

[X, Y, Z]           % list with three and only three elements - regular syntax
[X|[Y|[Z]]]         % same - using cons syntax
[X, Y|[Z]]          % same - using simplified cons syntax
{% endhighlight %}

But it doesn't make sense to use cons syntax to do what regular list syntax
already expresses better. Here are some more interesting examples that make use of
the strengths of cons syntax:

{% highlight prolog %}
[X|[Y|Ys]]        % list with at least two elements (X and Y), bind the rest of the list to Ys
[X, Y|Ys]         % same - using simplified cons syntax

[_|[_|Tail]]      % list with at least two elements, don't bind names to first two elements, bind the rest to Tail
[_, _|Tail]       % same - using simplified cons syntax

[X|[Y|[Z|_]]]     % list with at least three elements, discard the tail
[X, Y, Z|_]       % same - using simplified cons syntax
{% endhighlight %}

To cement these, here are some concrete examples of pattern matching with lists:

{% highlight prolog %}
?- [a, b, c, d] = [X|Xs].           % X = a, Xs = [b, c, d].
?- [a, b, c, d] = [X|_].            % X = a.
?- [a, b, c, d] = [_|Xs].           % Xs = [b, c, d].

?- [a, b, c, d] = [W, X, Y, Z].     % W = a, X = b, Y = c, Z = d. 
?- [a, b, c, d] = [W|[X|[Y|[Z]]].   % W = a, X = b, Y = c, Z = d. 

?- [a, b, c, d] = [W, X, Y].        % false.
?- [a, b, c, d] = [W, X|Y].         % W = a, X = b, Y = [c, d].

?- [a, b, c, d] = [W, X|Y].         % W = a, X = b, Y = [c, d]. 
?- [a, b, c, d] = [_, X|Y].         % X = b, Y = [c, d].
?- [a, b, c, d] = [W, _|Y].         % W = a, Y = [c, d].
?- [a, b, c, d] = [W, X|_].         % W = a, X = b.
{% endhighlight %}

<h3>Unification</h3>

**UPDATE:** Turns out I had a massive misunderstanding about what unification
was. I had conflated it with a number of other concepts that combined together
form Prolog's execution model. I've removed what I wrote about unification and
may some day do a follow-up article on Prolog's execution model.

<h3>The logic programming difference</h3>

So what does having that fancy execution model really mean? To demonstrate the
difference it can make I am going to show you the same
function written in three different languages and three different styles. I've
picked the `append` function (append one list to another list)
which is a great example, even though it's been explained many times before. In
the comments on my [last post](/blog/2012/02/05/seven-languages-week-3-day-1/) actually, [Daniel Lyons](http://www.storytotell.org/) gave a [nice demonstration](/blog/2012/02/05/seven-languages-week-3-day-1/#comment-446662856) of
`append` in Prolog, and it is an example [Bruce Tate](http://www.java.net/external?url=http://blog.rapidred.com) spends a couple pages on as
well.

<h4>Imperative (Javascript)</h4>

{% highlight javascript %}
function append (xs, ys) {
    var result = xs.slice(0),
    i;

    for (i = 0; i < ys.length; i++) {
        result.push(ys[i]);
    }

    return result;
}
{% endhighlight %}

The most straightforward implementation of append. Callers would use it like so:

{% highlight javascript %}
var list = append([1, 2, 3], [4, 5, 6]);
// list is [1, 2, 3, 4, 5, 6]
{% endhighlight %}

Nothing fancy here! This essentially duplicates the existing `concat` method in javascript.

<h4>Functional (Haskell)</h4>

{% highlight haskell %}
append :: [a] -> [a] -> [a]
append [] ys = ys
append (x:xs) ys = x : append xs ys
{% endhighlight %}

A basic recursive implementation of append. Once again, it is straightforward to use:

{% highlight haskell %}
list = append [1, 2, 3] [4, 5, 6]
-- list is [1, 2, 3, 4, 5, 6]
{% endhighlight %}

Now that we're in Haskell, we can of course easily take advantage of partial
application and write things like:

{% highlight haskell %}
appendList1 = append [1, 2, 3]
list2 = appendList1 [4, 5, 6]
-- list2 is [1, 2, 3, 4, 5, 6]
list3 = appendList1 [1, 2, 3]
-- list3 is [1, 2, 3, 1, 2, 3]
{% endhighlight %}

But this function still just appends one list to another. It's the same as the
built in `++` function, and basically equivalent to the previous javascript
example.

<h4>Logic-based (Prolog)</h4>

{% highlight prolog %}
append([],Ys,Ys).
append([X|Xs],Ys,[X|Zs]) :- append(Xs,Ys,Zs).
{% endhighlight %}

At first glance, this function is just like the previous two. Note how similar
it is to the Haskell example in particular, since it too is just a simple
recursive function. It can be used like so:

{% highlight prolog %}
?- append([1, 2, 3], [4, 5, 6], List).
List = [1, 2, 3, 4, 5, 6].
{% endhighlight %}

With Prolog it is sometimes accurate to look at a rule as a function with the
parameters being `(param1, param2, return value)`. If you look at the example
above in this way it gives you an _accurate_, but _limited_ picture of this
rule. With unification, you could just as easily look at this rule as `(param1,
return value, param2)`, like so:

{% highlight prolog %}
?- append([1, 2, 3], List, [1, 2, 3, 4, 5, 6]).
List = [4, 5, 6].
{% endhighlight %}

Prolog solves for the missing parameter and correctly calculates the result!
This is the major difference between traditional languages and a logic language.
But `(param1, return value, param2)` is still not the best way to think about
rules, as it breaks down when confronted with something like this:

{% highlight prolog %}
?- append(List1, List2, [1, 2, 3]).
List1 = [],
List2 = [1, 2, 3] ;
List1 = [1],
List2 = [2, 3] ;
List1 = [1, 2],
List2 = [3] ;
List1 = [1, 2, 3],
List2 = [] ;
false.
{% endhighlight %}

Prolog just generated all the possible ways you could combine two lists to make
`[1, 2, 3]`! All this functionality from that tiny definition of `append` up
above!

There's one more interesting use for append - as a lie-detector:

{% highlight prolog %}
?- append([1, 2], [3, 4], [1, 2, 3]).
false.
?- append([1, 2], [3, 4], [1, 2, 3, 4]).
true.
{% endhighlight %}

All of this comes from the power of unification. 

<h3>Recursion</h3>

When writing recursive rules in Prolog you really have to make sure to keep
thinking in terms of 'making this statement true' instead of your typical
program execution. One thing that makes it more awkward is that you can't use
return values: every 'result' has to be a another parameter. And so you end up
with more intermediate variables that have little meaning, as the example below
shows.

Since there is no such thing as a for or while loop in Prolog, you end up using
recursion a lot, and you will use it more than you need to if you don't know that
Prolog actually does have higher-order functions. This is important so I'm going
to say it again: **Prolog has higher order functions**. They're just not widely
advertised and they're barely documented. There's Lee Naish's paper, [Higher
Order logic programming in Prolog](http://www.cs.umbc.edu/771/papers/mu_96_02.pdf) and there's also [this nice post](http://www.j-paine.org/dobbs/ho_span_count.html) which gives good examples of `maplist` and `foldr`.

The existence of `maplist` makes a big difference in how many lines of code it
takes to write recursive rules in Prolog. Here's the same recursive function in
both Haskell and Prolog. Not being able to use return values makes it more
awkward to read, but ultimately it's actually not too different.

<h4>Haskell</h4>

{% highlight haskell %}
combinations :: [a] -> [[a]]
combinations [x] = [[x]]
combinations (x:xs) = [x] : (map (x :) (combinations xs)) ++ combinations xs
{% endhighlight %}

<h4>Prolog</h4>

{% highlight prolog %}
combinations([X], [[X]]).
combinations([X|XS], Result) :- 
    combinations(XS, Comb1), 
    maplist(append([X]), Comb1, Comb2),
    append([[X]], Comb1, Comb3), 
    append(Comb2, Comb3, Result).
{% endhighlight %}

I still prefer the Haskell version :)

Full solutions
---

Here is a nicely formatted version of my solutions to the exercises from Day 2 of Prolog. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-3-prolog/day2.pl) with the other exercises.  

<div id="formatted_solutions">

<h3>Find:</h3>

<div class="question"><b>1.</b> Some implementations of a Fibonacci series and factorials. How do they work?</div>

<div class="tiny_title">Fibonacci (from <a href="http://cubbi.com/fibonacci/prolog.html">http://cubbi.com/fibonacci/prolog.html</a>)</div>

{% highlight prolog %}
fib(0,0).
fib(1,1).
fib(N,F) :- succ(N1,N), succ(N2,N1), fib(N1,F1), fib(N2,F2), plus(F1,F2,F).
{% endhighlight %}

<div class="tiny_title">Explanation</div>
<div class="code_explanation">
First establish the two base cases.
Next, create a rule for the recursive case:
<ol>
<li>Find N-1 and N-2</li>
<li>Find the N-1th fibonacci number</li>
<li>Find the N-2th fibonacci number</li>
<li>Add the N-1th and the N-2th fibonacci number</li>
<li>The result is the Nth fibonacci number</li>
</ol>

Pretty straightforward!
</div>

<div class="tiny_title">Factorial (from <a href="http://boklm.eu/prolog/page_6.html">http://boklm.eu/prolog/page_6.html</a>)</div>
{% highlight prolog %}
factorial(0,1).
factorial(X,Y) :-
  X1 is X - 1,
  factorial(X1,Z),
  Y is Z * X,!.
{% endhighlight %}

<div class="tiny_title">Explanation</div>
<div class="code_explanation">

First, establish the base case.
Next, create a rule for the recursive case:
<ol>
<li>Find X - 1</li>
<li>Find the factorial of X - 1</li>
<li>Multiply the result by X</li>
<li>The result is the factorial of X</li>
</ol>
</div>

<div class="question"><b>2.</b> A real-world community using Prolog. What problems are they solving with it today?</div>

<p>
Nice SO question about this: 
<ul><li><a href="http://stackoverflow.com/questions/130097/real-world-prolog-usage">http://stackoverflow.com/questions/130097/real-world-prolog-usage</a></li></ul>
</p>

<p>
Some companies that use Prolog:
<ul>
<li><a href="http://www.meridiansystems.com/products/prolog/construction-project-management.asp">http://www.meridiansystems.com/products/prolog/construction-project-management.asp</a></li>
<li><a href="http://www.intologic.com/">http://www.intologic.com/</a></li>
<li><a href="http://www.sics.se/isl/sicstuswww/site/customers.html">http://www.sics.se/isl/sicstuswww/site/customers.html</a></li>
<li>powerset (acquired by microsoft)</li>
</ul>
</p>

<p>
Dr. Dobbs article on this:
<ul>
<li><a href="http://drdobbs.com/architecture-and-design/184405220">http://drdobbs.com/architecture-and-design/184405220</a></li>
</ul>
</p>

<div class="question"><b>3. (optional)</b> What are some of the problems of dealing with "not" expressions? Why do you have to be careful with negation in Prolog?</div>

<p>
Negation in Prolog is not <i>logical negation</i>, it is <i>negation as failure</i>.  So
<code>not(X)</code> doesn't mean that X is false (like <code>¬X</code> would), it means that X can't
be <i>proven true</i>. Something else you have to be careful with is putting negated
predicates in the right order. Negation as failure is implemented using the
<code>cut</code> and <code>fail</code> predicates. The short story is: negating a predicate can
cause subsequent predicates to be ignored.
</p>

<p>
For a better and more in-depth explanation of <code>cut</code> and negation as failure, I
strongly recommend the following links:
</p>

<ul>
<li><a href="http://pwnetics.wordpress.com/2011/04/10/negation-in-prolog/">Negation In Prolog</a> — The author uses the wallace and grommit example from this book to show how
assuming logical negation can lead to subtle errors.</li>

<li><a href="http://cs.union.edu/~striegnk/learn-prolog-now/html/node90.html#sec.l10.negation.as.failure">Negation as failure</a> — A highly readable explanation of how negation as failure really works. Here is
one of the opening paragraphs which really helped make it click for me:</li>
</ul>

<div class="indent">
    <blockquote>
        As a first step, let's introduce another built in predicate fail/0. As its name
        suggests, fail is a special symbol that will immediately fail when Prolog
        encounters it as a goal. That may not sound too useful, but remember: when
        Prolog fails, it tries to backtrack. Thus fail can be viewed as an instruction
        to force backtracking. And when used in combination with cut, which blocks
        backtracking, fail enables us to write some interesting programs, and in
        particular, it lets us define exceptions to general rules.   
    </blockquote>
</div>

<p>
If you find you need more background information first, try the page where they
<a href="http://cs.union.edu/~striegnk/learn-prolog-now/html/node88.html#sec.l10.cut">introduce cut:</a>
</p>

<h3>Do:</h3>

<div class="question"><b>1.</b> Reverse the elements of a list</div>

{% highlight prolog %}
reverse(A,R) :- reverse(A,[],R).
reverse([X|Y],Z,W) :- reverse(Y,[X|Z],W).
reverse([],X,X).
{% endhighlight %}

<div class="tiny_title">Notes</div>

<div class="code_explanation">
I ended up using an example from a tutorial - even then it still took a bit to make sense to me. The middle accumulation parameter specifically. I'm going to try the problem that the tutorial gives immediately after:

<blockquote>
<p>Write a two-parameter version of 'reverse' that does not use the accumulating parameter idea. Use 'append' instead, for example, where one rule would be paraphrased like this ...</p>
  
<code>reverse list [X|R] by reversing R to get T, then append T to [X]</code>

<p>What about the efficiency of this version? Compare it to the given 'reverse' above.</p>
</blockquote>

This is the way I was attempting to do it first as well. It is (probably) less efficient than the first version, because when I append an element to the end of the list it likely has to walk the list each time. Don't know for sure without measuring though.
</div>

{% highlight prolog %}
reverseA([X|R], Result) :- reverse(R, T), append(T, [X], Result).
reverseA([X], X).
{% endhighlight %}

<div class="question"><b>2.</b> Find the smallest element of a list</div>

{% highlight prolog %}
min(A,A,A).
min(A,B,B) :- B < A.
min(A,B,A) :- A < B.

minInList([X|XS], M) :- minInList(XS, M1), min(X, M1, M).
minInList([X], X).
{% endhighlight %}

<div class="question"><b>3.</b> Sort the elements of a list.</div>

{% highlight prolog %}
% I'm just going to go for a very simple sort.

takeout(X, [X|R], R).
takeout(X, [F|R], [F|S]) :- takeout(X,R,S).

mySort(List, [Min|Sorted]) :- 
    minInList(List, Min), 
    takeout(Min, List, Rest), 
    mySort(Rest, Sorted).
mySort([X], [X]).
{% endhighlight %}

</div>

Next in this series: [Day 3 of Prolog](/blog/2012/08/06/seven-languages-week-3-day-3/)
