---
layout: post
title: "Seven Languages: Week 3 (Prolog) - Day 1"
description: Topics and exercises from Day 1 of Prolog from the book Seven Languages In Seven Weeks.
---

Although I am not yet halfway through the book, I am pretty sure that Prolog
will win the 'most foreign language' category with ease. Going in, I knew Prolog
was fairly old (born in 1972) and that it was a logic-based language, but I
could not have estimated how, for lack of a better word, _picky_ it would be.

My troubles started at installation - Bruce Tate uses GNU Prolog in the book,
and I spent far too long trying to get that working only to discover that some
library functions essential to the exercises (`fd_domain`, `fd_all_different`)
just caused GNU Prolog to crash on my machine. I will elaborate on this more in
Day 3, but for anyone encountering this post who is in a similar situation, just
go use SWI Prolog instead.

Prolog heavily relies on recursion but making a recursive rule is not the same
as making a recursive function in functional languages. It is subtly different,
and way easier to get wrong; you have to have an **extremely** clear mental
model of how Prolog operates (which I still don't). I will expand more on this
in a future post.

Despite all this, during the course of Week 3 I have been convinced that logic
programming can be extremely powerful. If you know how to define a problem in
terms that Prolog understands, then you can write a program that solves a
problem without having the slightest idea of how to actually solve it (a good
example is Sudoku, which shows up in Day 3). Logic languages are the closest I
have seen to the unattainable ideal of 'writing a program that will look at the
problem and write a program to solve it for you'.

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2012/01/16/seven-languages-week-2-day-3/">Week 2 (Io) - Day 3</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

Topics covered
---

Day 1 covered the basic structural elements of Prolog. There are three kinds of statements in a Prolog program: **facts**, **rules**, and **queries**. 

A fact is a simple statement that essentially adds a nugget of information to a database. Here are some facts:

{% highlight prolog %}
daytime.
clear_skies.

round(earth).
round(ball).

small(mouse).
small(ball).
{% endhighlight %}

A rule is a statement that relates facts and rules together. You can
almost (but not quite) think of them as functions. Here are some rules:
       
{% highlight prolog %}
time_to_play :- daytime, clear_skies.

suitable_for_playing_with(X) :- round(X), small(X).

does_nick_want_to_play_with(X) :- time_to_play, suitable_for_playing_with(X).
{% endhighlight %}

If you collect all of the preceding statements and put them in a `hello.pl` file
then you have a valid Prolog program. To actually get some useful output from
it, we can load this program into the prolog interpreter, and query this
database we've built up like so:

{% highlight prolog %}
?- ['hello.pl'].
% hello.pl compiled 0.00 sec, 3,352 bytes
true.

% Let's test out the facts:

?- daytime.
true.

?- round(earth).
true.

?- round(cube).
false.

?- round(What). % Notice the capital letter here. Uppercase = variable, lowercase = atom.
What = earth ;
What = ball ;

% And now for the rules:

 ?- time_to_play.
true.

?- suitable_for_playing_with(earth).
false.

?- suitable_for_playing_with(ball).
true.

?- does_nick_want_to_play_with(earth).
false.

?- does_nick_want_to_play_with(ball).
true.

?- does_nick_want_to_play_with(What).
What = ball.
{% endhighlight %}

Highlights from exercises
---

The exercises in Day 1 aren't terribly interesting, so instead I'll show you an
example from an earlier part of the book that threw me into confusion for a
while. The goal of the following snippet of Prolog is to assign map colours such
that no state borders on another state with the same colour.

When I read this I flipped through the next few pages looking for the rest of
the program. But there isn't any more - this is it!

{% highlight prolog %}
different(red, green). different(red, blue).
different(green, red). different(green, blue).
different(blue, red). different(blue, green).

coloring(Alabama, Mississippi, Georgia, Tennessee, Florida) :-
    different(Mississippi, Tennessee),
    different(Mississippi, Alabama),
    different(Alabama, Tennessee),
    different(Alabama, Mississippi),
    different(Alabama, Georgia),
    different(Alabama, Florida),
    different(Georgia, Florida),
    different(Georgia, Tennessee).
{% endhighlight %}

This program aims to colour these **five** states with **three** colours (such
that no states of the same colour share borders). When we query this we get:

{% highlight prolog %}
?- coloring(Alabama, Mississippi, Georgia, Tennessee, Florida).
Alabama = blue,
Mississippi = Georgia, Georgia = red,
Tennessee = Florida, Florida = green .
{% endhighlight %}

![Coloured map of states showing Mississippi and Georgia = red, Tennessee and Florida = green, and Alabama = blue.](/img/projects/seven-languages/state-colouring.png)

The program appears to be just the problem definition restated, and yet somehow
Prolog can produce a correct answer! 

**DISCLAIMER:** I am not a Prolog expert and as such the following explanation
will be a bit hand wavy. Please let me know if you spot any glaring inaccuracies.

Prolog is trying to unify both sides of our rule and answer the question "What
values can I set these five variables to in order to make all of the following
series of statements true". It knows there are six facts about
"different-ness" and keeps on trying different combinations of these facts. 

Take as an example the first statement of the **rule** `different(Mississippi,
Tennessee)`.  It might first try the **fact** `different(red, green)`, then
continue on with the assumption that now `Mississippi = red` and `Tennessee =
green`, and see if it can still make the other statements true. 

Hopefully that more or less makes sense. But in case it doesn't, **let's take a
different tack now**.  Pretend our rule is a mathematical equation: Prolog is
trying to solve for five variables, given only a little bit of knowledge about
numbers. As far as it is concerned, you may as well have given it this:

{% highlight prolog %}
different(1, 2). different(1, 3).
different(2, 1). different(2, 3).
different(3, 1). different(3, 2).

solve_for(A, B, C, D, E) :-
    different(B, D),
    different(B, A),
    different(A, D),
    different(A, B),
    different(A, C),
    different(A, E),
    different(C, E),
    different(C, D).
{% endhighlight %}

In which case you would receive an answer like:

{% highlight prolog %}
?- solve_for(A, B, C, D, E).
A = 3,
B = C, C = 1,
D = E, E = 2 .
{% endhighlight %}

Easy peasy, right?

**UPDATE:** Thanks for the great comments, both below on my [blog comments](#disqus_thread) and also [on reddit](http://www.reddit.com/r/programming/comments/pd9z1/seven_languages_day_1_of_prolog/). There are a few in particular that helped me learn more that I would like to highlight and save for posterity.

[Daniel Lyons](http://www.storytotell.org/) and [Michael Leuschel](http://users.ecs.soton.ac.uk/mal/) pointed out some variations on solving this map
colouring problem. 

Daniel showed how to [minimize redundancy](#dsq-comment-430894811) when declaring red, green and blue
as colours that are `different` from each other:

<blockquote>
<p>The map example is wonderful! I would probably make the map coloring a little more abstract like so:</p>
{% highlight prolog %}
color(red). color(green). color(blue).
different(X, Y) :- color(X), color(Y), X \= Y.
{% endhighlight %}
</blockquote>

Michael Leuschel showed how [this solution could take advantage](#dsq-comment-431117487) of [CLP(FD)](http://www.swi-prolog.org/man/clpfd.html) (a module that can
**drastically** improve performance when dealing with larger data sets) and
was also kind enough to [explain labeling to me](#dsq-comment-432664414):

<blockquote>

<p>Another solution would be to use the different operator <code>#\=</code> from clp(fd):</p>

{% highlight prolog %}
:- use_module(library(clpfd)).
different(X,Y) :- X in 1..3, Y in 1..3, X #\=Y.
{% endhighlight %}

<p>You would then need to add a call to <code>labeling</code> after setting up the constraints:</p>

{% highlight prolog %}
solve_for([A, B, C, D, E]) :-
different(B, D), different(B, A), different(A, D), different(A, B),
different(A, C), different(A, E),
different(C, E), different(C, D) ,labeling([],[A, B, C, D, E]).
{% endhighlight %}

<p>This should be more efficient than the original, as you first set up the constraints and only *then* start enumerating candidate solutions.
(Of course this performance difference does not matter for such a small graph; it can make a huge difference for larger graphs.)</p>

<p><a href="#dsq-comment-431117487">...continued in comments</a></p>

</blockquote>


[Egon Elbre](http://egonelbre.com/) and [gecko](http://www.reddit.com/user/gecko) both helped explain different things about Prolog to me.

Egon [used relational databases as a metaphor](https://gist.github.com/1755115) to explain the map colouring example.

{% highlight prolog %}
round(earth).
round(ball).

small(mouse).
small(ball).

% I want to have tables `round` and `small`
% `round` should contain `earth` and `ball`
% `small` should contain `mouse` and `ball`

time_to_play :- daytime, clear_skies.

% I have empty table (fact) `time_to_play` if
% there are two other tables (facts) `daytime` and `clear_skies`

suitable_for_playing_with(X) :- round(X), small(X).

% I want to have a table `suitable_for_playing_with`
% such that each value in it must be in tables `round` and `small`
{% endhighlight %}

gecko [introduced me to Datalog](http://www.reddit.com/r/programming/comments/pd9z1/seven_languages_day_1_of_prolog/c3ojly3?context=1) and made me realize that knowing Prolog well can be useful and pay off even when developing systems in other languages.

> There are actually lots of languages that provide prologs for exactly this purpose. You've found Perl's, but there's also small prologs for C#, Python, Ruby, and more. Generally, these implement a subset of Prolog called [Datalog](https://en.wikipedia.org/wiki/Datalog), which is optimized specifically to be used as a kind of query language or database from other languages.
> 
> > (part of my reply) ...I haven't used Prolog enough to know - do Datalog's restrictions turn out to be a big limiter in practice? Does it flat out stop you from being able to solve some things? Is it just a bit less expressive?
> 
> I've never found it to be an issue in practice for what I've wanted Datalog for, but I'm sure it'd depend on what you're doing. Datalog/Prolog-in-practice tends to show up in relatively narrow areas where the problem can be described declaratively with relative ease. The restrictions imposed by Datalog have never, in my experience, gotten in the way in those areas. On the other hand, if I were using Prolog as the sole language I wanted, rather than as an auxiliary language, I think that at least the recursion restrictions would drive me somewhat batty.

Thanks for all these informative comments everyone, I learned more
about Prolog and have been given a few good reason to keep at it.

Full solutions
---

Here is a nicely formatted version of my solutions to the exercises from Day 1 of Prolog. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-3-prolog/day1.pl) with the other exercises.  

<div id="formatted_solutions">

<h3>Find:</h3>

<div class="question">1. Some free Prolog tutorials</div>

<ul>
<li><a href="http://www.lix.polytechnique.fr/~liberti/public/computing/prog/prolog/prolog-tutorial.html">http://www.lix.polytechnique.fr/~liberti/public/computing/prog/prolog/prolog-tutorial.html</a></li>
<li><a href="http://www.csupomona.edu/~jrfisher/www/prolog_tutorial/contents.html">http://www.csupomona.edu/~jrfisher/www/prolog_tutorial/contents.html</a></li>
</ul>

<div class="question">2. A support forum (there are several)</div>

<ul>
<li><a href="http://old.nabble.com/SWI-Prolog-f448.html">http://old.nabble.com/SWI-Prolog-f448.html</a></li>
<li><a href="http://mail.gnu.org/pipermail/users-prolog/">http://mail.gnu.org/pipermail/users-prolog/</a></li>
<li><a href="http://www.reddit.com/r/prolog">http://www.reddit.com/r/prolog</a></li>
</ul>


<div class="question">3. One online reference for the Prolog version you're using</div>

<ul>
<li><a href="http://www.swi-prolog.org/pldoc/index.html">http://www.swi-prolog.org/pldoc/index.html</a></li>
</ul>

<h3>Do:</h3>

<div class="question">1. Make a simple knowledge base. Represent some of your favorite books and authors.</div>

{% highlight prolog %}
book('The Name Of The Wind', 'Patrick Rothfuss').
book('Anathem', 'Neal Stephenson').
book('The Skystone', 'Jack Whyte').
book('The Singing Sword', 'Jack Whyte').
book('Rapid Development', 'Steve McConnell').
book('The Pragmatic Programmer', 'Andy Hunt & Dave Thomas').
book('Seven Languages In Seven Weeks', 'Bruce Tate').
{% endhighlight %}

<div class="question">2. Find all books in your knowledge base written by one author.</div>

{% highlight prolog %}
?- book(What, 'Neal Stephenson').

What = 'Anathem' ? ;

?- book(What, 'Jack White').

What = 'The Skystone' ? ;

What = 'The Singing Sword' ? ;
{% endhighlight %}

<div class="question">3. Make a knowledge base representing musicians and instruments. Also represent musicians and their genre of music.</div>

{% highlight prolog %}
musician_instrument('Hansi Kursch', vocals).
musician_instrument('Hansi Kursch', bass).
musician_instrument('Andre Olbrich', guitar).
musician_instrument('Duke Ellington', piano).
musician_instrument('Jimi Hendrix', guitar).

musician_genre('Hansi Kurch', metal).
musician_genre('Andre Olbrich', metal).
musician_genre('Duke Ellington', jazz).
musician_genre('Jimi Hendrix', rock).
{% endhighlight %}

<div class="question">4. Find all musicians who play the guitar.</div>

{% highlight prolog %}
?- musician_instrument(What, guitar)

What = 'Andre Olbrich' ? ;

What = 'Jimi Hendrix'
{% endhighlight %}

</div>

Next in this series: [Day 2 of Prolog](/blog/2012/07/17/seven-languages-week-3-day-2)
