---
layout: post
title: "Seven Languages: Week 3 (Prolog) - Day 1"
---

Although I am not yet halfway through the book, I am pretty sure that Prolog
will win the 'most foreign language' category with ease. Going in, I knew Prolog
was fairly old (born in 1972) and that it was a logic-based language, but I
could not have estimated how, for lack of a better word, _picky_ it would be.

My troubles started at installation - Bruce Tate uses GNU Prolog in the book,
and I spent far too long trying to get that working only to discover that some
library functions essential to the exercises (`fd_domain`, `fd_all_different`)
just caused GNU Prolog to crash on my machine. I will elaborate on this more in
Day 2, but for anyone encountering this post who is in a similar situation, just
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

Full solutions
---

Here is a nicely formatted version of my solutions to the exercises from Day 1 of Prolog. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-3-prolog/day1.pl) with the other exercises.  

<h3>Find:</h3>

<h4>1. Some free Prolog tutorials</h4>

* [http://www.lix.polytechnique.fr/~liberti/public/computing/prog/prolog/prolog-tutorial.html](http://www.lix.polytechnique.fr/~liberti/public/computing/prog/prolog/prolog-tutorial.html)
* [http://www.csupomona.edu/~jrfisher/www/prolog_tutorial/contents.html](http://www.csupomona.edu/~jrfisher/www/prolog_tutorial/contents.html)

<h4>2. A support forum (there are several)</h4>

* [http://old.nabble.com/SWI-Prolog-f448.html](http://old.nabble.com/SWI-Prolog-f448.html)
* [http://mail.gnu.org/pipermail/users-prolog/](http://mail.gnu.org/pipermail/users-prolog/)
* [http://www.reddit.com/r/prolog](http://www.reddit.com/r/prolog)


<h4>3. One online reference for the Prolog version you're using</h4>

* [http://www.swi-prolog.org/pldoc/index.html](http://www.swi-prolog.org/pldoc/index.html)

<h3>Do:</h3>

<h4>1. Make a simple knowledge base. Represent some of your favorite books and authors.</h4>

{% highlight prolog %}
    book('The Name Of The Wind', 'Patrick Rothfuss').
    book('Anathem', 'Neal Stephenson').
    book('The Skystone', 'Jack Whyte').
    book('The Singing Sword', 'Jack Whyte').
    book('Rapid Development', 'Steve McConnell').
    book('The Pragmatic Programmer', 'Andy Hunt & Dave Thomas').
    book('Seven Languages In Seven Weeks', 'Bruce Tate').
{% endhighlight %}

<h4>2. Find all books in your knowledge base written by one author.</h4>

{% highlight prolog %}
    ?- book(What, 'Neal Stephenson').

    What = 'Anathem' ? ;

    ?- book(What, 'Jack White').

    What = 'The Skystone' ? ;

    What = 'The Singing Sword' ? ;
{% endhighlight %}

<h4>3. Make a knowledge base representing musicians and instruments. Also represent musicians and their genre of music.</h4>

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

<h4>4. Find all musicians who play the guitar.</h4>

{% highlight prolog %}
    ?- musician_instrument(What, guitar)
    
    What = 'Andre Olbrich' ? ;
    
    What = 'Jimi Hendrix'
{% endhighlight %}

Next in this series: Day 2 of Prolog (coming soon)
