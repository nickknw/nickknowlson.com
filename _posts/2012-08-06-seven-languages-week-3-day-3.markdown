---
layout: post
title: "Seven Languages: Week 3 (Prolog) - Day 3"
---

Day 3 tackled some bigger examples: solving sudoku and the eight
queens problem. In today's post however, I'm going to go a bit off the rails and
talk a bit about how logic programming can be beneficial in more practical
ways.

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2012/07/17/seven-languages-week-3-day-2/">Week 3 (Prolog) - Day 2</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>


<h3>Datalog</h3>

Datalog is a subset of Prolog oriented towards querying that was designed to be
embeddable in other languages. Many languages have datalog engines, such as
[Java](http://iris-reasoner.org/),
[Python](https://sites.google.com/site/pydatalog/),
[Clojure](http://code.google.com/p/clojure-contrib/wiki/DatalogOverview) and
[Racket](http://docs.racket-lang.org/datalog/). It has become more well-known
recently for being the query language of choice for
[Datomic](http://www.datomic.com/), a promising new distributed database.
[Michael Fogus](http://blog.fogus.me/) is even giving a talk at this upcoming [Strange Loop](https://thestrangeloop.com/) about
["The Reemergence of Datalog"](https://thestrangeloop.com/sessions/the-reemergence-of-datalog).

<h3>Constraint Programming</h3>

Every time in these past examples when I use the Prolog library
`clp(fd)` (which stands for Constraint Logic Programming over a Finite Domain), I'm doing constraint programming. A lot of the time it is mixed in with logic programming, but it _doesn't have to be_: there are constraint programming libraries for a lot of other languages. It can be really beneficial to know how to use even if you never write a line of Prolog.

In fact, the prolog solution to sudoku below owes a lot of its conciseness to
constraint programming. Sudoku solver implementations in other
languages that have a constraint programming library can be about the same
length! Another property of solutions using constraints is that they are usually
a lot faster than an equivalent logic programming only solution.

<h3>Other logic languages</h3>

Prolog is the most widely used logic language, but it isn't the only one. Here
are a few other interesting ones that caught my eye.

* [Mercury](http://www.mercury.csse.unimelb.edu.au/) is a functional logic programming language that shares Prolog's syntax but has a strong static type system.
* [Curry](http://www-ps.informatik.uni-kiel.de/currywiki/) is a
  functional logic programming language based on Haskell. It has constraint
  programming support built in.
* [Oz](http://www.mozart-oz.org/) is a dynamically typed multi-paradigm
  language. The (reportedly excellent) book [Concepts, Techniques, and Models of
  Computer Programming](http://www.info.ucl.ac.be/~pvr/book.html) uses Oz as its
  language of choice.

<h3>Logic libraries</h3>

Surprisingly, you can get logic programming functionality in library form as well! These libraries are less common than constraint programming libraries, I could only find a few:
* Scheme: [Kanren](http://kanren.sourceforge.net/), miniKanren and [cKanren](https://github.com/calvis/cKanren). Kanren is the original implementation, miniKanren is a simplified implementation (~300 lines) for ease of teaching, and cKanren modifies miniKanren to support constraint logic programming.
* Clojure: [core.logic](https://github.com/clojure/core.logic/). This library was
actually based off of miniKanren originally, and cKanren functionality is currently in progress.
* C++: [LC++](http://people.cs.umass.edu/~yannis/lc++/)

Highlights from exercises
---

The exercises in this chapter were pretty interesting, but also pretty
exhausting for a newbie to logic programming. I ended up with two
implementations of a sudoku solver. The second one was about a fifth the size of
the first and I learned a ton in the process of writing it. I think my
implementation is fairly readable, so if you're interested please feel free to
scroll down to the [formatted solutions](#formatted_solutions) and take a look. 

That's not what I'll be highlighting here though. I'll be pitting a Prolog
solution against a solution from a regular (i.e. not logical) programming language
that uses a constraint programming library. Since next week is Scala, I'll
arbitrarily pick Scala as the language and [JaCoP](http://www.jacop.eu/) as the constraint programming library. This is a light comparison done for my own fun and enlightenment, it isn't meant to be comprehensive.

Since I'm just a beginner with logic and constraint programming, it would be
meaningless to compare implementations I wrote myself; the properties of the
solutions would have more to do with my limitations than the languages they're
written in. So for these examples I will be leaning on more experienced minds.

<h3>Prolog</h3>

This Prolog solution is taken from the [clp(fd) documentation](http://www.swi-prolog.org/man/clpfd.html).

{% highlight prolog %}
:- use_module(library(clpfd)).

sudoku(Rows) :-
        length(Rows, 9), maplist(length_(9), Rows),
        append(Rows, Vs), Vs ins 1..9,
        maplist(all_distinct, Rows),
        transpose(Rows, Columns), maplist(all_distinct, Columns),
        Rows = [A,B,C,D,E,F,G,H,I],
        blocks(A, B, C), blocks(D, E, F), blocks(G, H, I).

length_(L, Ls) :- length(Ls, L).

blocks([], [], []).
blocks([A,B,C|Bs1], [D,E,F|Bs2], [G,H,I|Bs3]) :-
        all_distinct([A,B,C,D,E,F,G,H,I]),
        blocks(Bs1, Bs2, Bs3).
{% endhighlight %}

<h3>Scala + JaCoP</h3>

This Scala solution is taken from [Hakan Kjellerstrand's scalaJaCoP page](http://www.hakank.org/constraint_programming_blog/2011/08/a_first_look_at_scalajacop_scala_wrapper_for_jacop.html). Here is a direct link to [the file itself](http://www.hakank.org/jacop/Sudoku.scala).

{% highlight scala %}
import scalaJaCoP._

object Sudoku extends App with jacop {
  val n = 9
  val reg = 3

  // data
  val problem = ... // omitted

  val x = List.tabulate(n)(i=> 
                List.tabulate(n)(j=>
                  new IntVar("x("+i+","+j+")", 1, n)))

  // constraints

  // fill with the hints
  for(i <- 0 until n) {
    for(j <- 0 until n) {
      if (problem(i)(j) > 0) {
        x(i)(j) #= problem(i)(j)
      }
    }
  }
  
  // rows and columns
  for(i <- 0 until n) {
    alldifferent( Array.tabulate(n)(j=> x(i)(j)) )
    alldifferent( Array.tabulate(n)(j=> x(j)(i)) ) 
  }

  // blocks
  for(i <- 0 until reg; j <- 0 until reg) {
    alldifferent(  (for{ r <- i*reg until i*reg+reg;
                        c <- j*reg until j*reg+reg
                     } yield x(r)(c)).toArray
               )
  }

   // search
  val result = satisfyAll(search(x.flatten, max_regret, indomain_max), printIt) 

  def printIt() { ... } // omitted
} 
{% endhighlight %}

For brevity I'm omitting how the Prolog solution is queried and how the Scala solution is printed. I want to keep the focus on the interesting parts of these programs. For the full source code, check the links above or the [benchmark source code](https://github.com/nickknw/constraint-programming-benchmarks) on github.

<h3>Scoring</h3>

<h4>Size</h4>

The Prolog program is just over half as long at **13** lines instead of **25**
for Scala (not counting comments or whitespace). Although this is definitely a
win for Prolog, the Scala version is still far shorter than any Sudoku
solvers that don't take advantage of constraint programming.

<h4>Readability</h4>

Ah, the most subjective benchmark! This one is hard for me to judge fairly,
since I've spent a lot of time inside of Prolog recently, and none using Scala
or JaCoP. That said, even trying to account for my bias I think the Prolog
solution has a big advantage here. It reads a lot more declaratively than the
Scala solution and doesn't have to worry about as many details.

Given my bias I would be very interested to hear feedback on this topic. Which
solution did **you** think was more readable?

<h4>Speed</h4>

Now we are into interesting territory. Prolog has a few decades' headstart on
JaCoP, but JaCoP has the speed of the highly optimized JVM behind it. Let's see
who comes out on top!

**Disclaimer:** I acknowledge that benchmarking is an easy thing to do incorrectly.
I've made the [source code for these benchmarks](https://github.com/nickknw/constraint-programming-benchmarks) available on github and included instructions to allow you to (hopefully!) easily replicate my results. Please
feel free to double check what I've done, I am more than happy to receive feedback telling me I am wrong. Contributions using other libraries or languages are also welcome.

**Results:**

SWI-Prolog managed to solve the sample sudoku problem in an average of **78 milliseconds** on my machine.

JaCoP managed to solve the sample sudoku problem in an average of **95
milliseconds** on my machine.

The Scala version takes **1.2 times** longer to run than the Prolog version. Honestly,
this was an unexpected result for me; I would have guessed JaCoP had the edge.
Regardless, they are both _pretty damn fast_ solutions for not a lot of effort.
Both win here.

<h4>Conclusions</h4>

Given the close results, there is only one clear conclusion I can draw from this
comparison: Scala + JaCoP can roughly match the expressiveness and speed of a
Prolog solution, at least for Sudoku. But that's boring! If I may hypothesize, I
would guess that: for a large class of problems, constraint programming libraries can
give you most of the benefits of a logic programming solution while only
sacrificing a little bit of declarative conciseness and elegance. 

Good news for the working programmer who doesn't feel he has time to learn
Prolog!

<h4>More constraint programming examples</h4>

Hakan Kjellerstrand has a [fantastic collection of problems](http://www.hakank.org/constraint_programming/) solved using many different constraint programming libraries. It is a great resource and can be fun to compare different implementations of the same problem.

Full Code Listing
---

Here is a nicely formatted version of my solutions to the exercises from Day 3 of Prolog. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-3-prolog/day3.pl) with the other exercises.  

<div id="formatted_solutions">

<h3>Find:</h3>

<div class="question"><b>1.</b> Prolog has some input/output features as well. Find print predicates that print out variables.</div>

<div class="code_explanation">
There's 'write'. I'll paste my minInList function in here and make it
write each element of the list while it checks them.
Aha, 'format' and 'writef' are very nice too.
</div>

{% highlight prolog %}
min(A,A,A).
min(A,B,B) :- B < A.
min(A,B,A) :- A < B.

minInList([X|XS], M) :- minInList(XS, M1), min(X, M1, M), format('~a, ', X).
minInList([X], X) :- format('~a, ', X).
{% endhighlight %}

<div class="question"><b>2.</b> Find a way to use the print predicates to print only successful solutions. How do they work?</div>

<div class="code_explanation">
To answer this one... I guess I want to use a rule that can have multiple
correct answers. I'll take an example from the book.
</div>

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
    different(Georgia, Tennessee),
    format('~a, ~a, ~a, ~a, ~a', [Alabama, Mississippi, Georgia, Tennessee, Florida]).
{% endhighlight %}

<div class="code_explanation">
Well, that will only print successful solutions, but I kind of feel like I've
missed the point. All this will do is repeat the information that you already
receive. Oh well, if I figure it out I'll come back to it.
</div>


<h3>Do:</h3>

<div class="question"><b>1.</b> Modify the Sudoku solver to work on six-by-six puzzles (squares are 3x2) and 9x9 puzzles)</div>

<div class="code_explanation">
I wrote a long awful version of this first, then cheated to write a better one.
I looked at <a href="http://stackoverflow.com/questions/1768274/prolog-learning-by-example">this sudoku solver</a> (found in the <a href="http://www.swi-prolog.org/man/clpfd.html">clp(fd) documentation</a>), understood how it worked, then closed it and wrote my own. This is the version that you see below. I also chose to do just 9x9.
</div>

{% highlight prolog %}
:- use_module(library(clpfd)).

sudoku(Rows) :-
    % split into rows
    Rows = [A, B, C, D, E, F, G, H, I],
    % and columns
    transpose(Rows, Columns), 

    % some bounds checking
    append(Rows, FlattenedRows), FlattenedRows ins 1..9,
    length(Rows, 9),
    length(Columns, 9),

    % all rows valid
    maplist(all_distinct, Rows),

    % all columns valid
    maplist(all_distinct, Columns),

    % all blocks valid
    valid_blocks(A, B, C),
    valid_blocks(D, E, F),
    valid_blocks(G, H, I),

    prettier_print(FlattenedRows).

valid_blocks([], [], []).  
valid_blocks([A1, A2, A3 | As], [B1, B2, B3 | Bs], [C1, C2, C3 | Cs]) :-
    maplist(all_distinct, [A1, A2, A3, B1, B2, B3, C1, C2, C3]),
    valid_blocks(As, Bs, Cs).


problem(1, [[_,_,_,_,_,_,_,_,_],                                   
            [_,_,_,_,_,3,_,8,5],                                   
            [_,_,1,_,2,_,_,_,_],                                   
            [_,_,_,5,_,7,_,_,_],                                   
            [_,_,4,_,_,_,1,_,_],                                   
            [_,9,_,_,_,_,_,_,_],                                  
            [5,_,_,_,_,_,_,7,3],                                  
            [_,_,2,_,1,_,_,_,_],                                   
            [_,_,_,_,4,_,_,_,9]]).

% can test with:
% ?- problem(1, Board), sudoku(Board).
{% endhighlight %}

<div class="question"><b>2.</b> Make the Sudoku solver print prettier
solutions.</div>

{% highlight prolog %}
prettier_print([]).
prettier_print(Puzzle) :- prettier_print(0, Puzzle).

prettier_print(0, Puzzle) :- 
    writeln('┌───────┬───────┬───────┐'), 
    prettier_print(1, Puzzle).
prettier_print(4, Puzzle) :- 
    writeln('│───────┼───────┼───────│'), 
    prettier_print(5, Puzzle).
prettier_print(8, Puzzle) :- 
    writeln('│───────┼───────┼───────│'), 
    prettier_print(9, Puzzle).
prettier_print(12, []) :- 
    writeln('└───────┴───────┴───────┘').

prettier_print(N, [Col1, Col2, Col3, Col4, Col5, Col6, Col7, Col8, Col9 | Puzzle]) :- 
    member(N, [1,2,3,5,6,7,9,10,11]),
    %N =\= 0, N =\= 4, N =\= 8, N =\= 13,
    % note to self about above: remember, prolog's pattern matching isn't
    % like pattern matching in other languages

    format('│ ~d ~d ~d │ ~d ~d ~d │ ~d ~d ~d │~n', [Col1, Col2, Col3, Col4, Col5, Col6, Col7, Col8, Col9]), 
    succ(N, N1),
    prettier_print(N1, Puzzle).
{% endhighlight %}

<div class="tiny_title">Output</div>

<div class="symmetrical_line_height">
{% highlight bash %}
?- problem(1, Board), sudoku(Board).

┌───────┬───────┬───────┐
│ 9 8 7 │ 6 5 4 │ 3 2 1 │
│ 2 4 6 │ 1 7 3 │ 9 8 5 │
│ 3 5 1 │ 9 2 8 │ 7 4 6 │
│───────┼───────┼───────│
│ 1 2 8 │ 5 3 7 │ 6 9 4 │
│ 6 3 4 │ 8 9 2 │ 1 5 7 │
│ 7 9 5 │ 4 6 1 │ 8 3 2 │
│───────┼───────┼───────│
│ 5 1 9 │ 2 8 6 │ 4 7 3 │
│ 4 7 2 │ 3 1 9 │ 5 6 8 │
│ 8 6 3 │ 7 4 5 │ 2 1 9 │
└───────┴───────┴───────┘
{% endhighlight %}
</div>

<div class="question"><b>3.</b> Solve the Eight Queens problem by taking a list of queens. Rather than a
tuple, represent each queen with an integer, from 1-8. Get the row of a queen
by its position in the list and the column by the value in the list.
</div>

<div class="code_explanation">...I think I'm just going to leave this one. I'd
like to move on to Scala at this point</div>

</div>

Next in this series: Day 1 of Scala (coming soon)
