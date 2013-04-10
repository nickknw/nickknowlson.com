---
layout: post
title:  "Seven Languages: Week 4 (Scala) - Day 2"
description: FILL IN LATER
---

Day 2 of Scala focused on its functional programming prowess. Since this is
the first time functional programming has been introduced in this book only the
basics were talked about this chapter, and I'm already pretty familiar with
those so this was an easy chapter for me.

The exercises were a lot shorter than the previous day's, although [me going
overboard](/projects/arbitrarily-sized-tic-tac-toe/) last
time probably had something to do with that! Today the main exercise was
a small task that makes sure you know how to use Traits, Maps, and read files.

My familiarity with the topics in this chapter and the shorter
exercises both mean this will be a shorter post than last time.

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2013/03/28/seven-languages-week-3-day-3/">Week 3 (Prolog) - Day 3</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">Seven Languages project page</a>.)
</p></div>

Topics Covered
---

Topics in Day 2 included functional programming, immutability, higher order functions, collections, and the
representation of empty values (Null, null, Nothing, Nil, None and Unit).

<h3>Functional Programming</h3>

Scala has thorough support for functional programming. It has closures,
convenient syntax for anonymous functions,
[currying](http://www.scala-lang.org/node/135), a focus on immutability,
pattern-matching, [algebraic data
types](http://gleichmann.wordpress.com/2011/01/30/functional-scala-algebraic-datatypes-enumerated-types/),
[type
classes](http://www.sidewayscoding.com/2011/01/introduction-to-type-classes-in-scala.html),
and it has [many higher-order
functions](http://www.scala-lang.org/api/current/index.html#scala.collection.Iterable)
defined for its collections.

A somewhat lengthy but very interesting read on this topic is [On Scala, Functional
Programming and Type-Classes](https://www.bionicspirit.com/blog/2012/11/02/scala-functional-programming-type-classes.html) by Alexandru Nedelcu.

<h3>Collections</h3>

Scala has great collections. Scala doesn't do anything revolutionary with
collections. These statements are both true and it's not a bad thing! If
anything it's a reflection of the growing number of great collections libraries
in modern languages. What it does mean is that it is harder for me to point to
one or two features and say "Here, you see? That is why this is so good."

Scala's collections have obviously had a lot of effort and attention to detail
put into them. You've got good default implementations of the basics (sequences,
sets, maps) and many implementations of each kind that have different
performance characteristics, all of which are nicely documented. There are lots
of useful helper functions defined at appropriate levels in the well-organized
class hierarchy. Functional programmers will be happy to know that any String is
also an IndexedSeq!

Here's what the abstract part of the collections class hierarchy looks like:

![Scala collections class hierarchy](/img/scala-collections.png)

A ton of general useful collection methods are defined high up on
[Traversable](http://www.scala-lang.org/api/current/index.html#scala.collection.Traversable)
and
[Iterable](http://www.scala-lang.org/api/current/index.html#scala.collection.Iterable)
so that all can use them. It makes using them very consistent and convenient.

One of these that is worth pointing out is `par`, which lets you turn sequential
operations on collections into parallel ones with a single word. There are a
growing number of languages that have this capability now: Haskell, C#, F#,
Scala, and soon Java 8 (I have undoubtedly missed a few, please let me know if
another comes to mind).

<h3>Null, null, Nothing, Nil, None and Unit in Scala</h3>

This book tried to explain this, but the explanation only served to confuse me
further. I read a few other explanations online and between them pieced together
the higher-level information I wanted to know.

This resulted in me making a reference post that gives a Cliff's Notes version
of [emptiness in Scala](/blog/2013/03/31/representing-empty-in-scala/).
Null and Nothing basically only exist as support for the other values, and Unit
isn't as easy to confuse with the others. That leaves null, Nil and None which
all have similar names and represent "empty" in some way. Fortunately, all
three of these concepts are fairly distinct and even have direct analogues in
other languages.

 * **null** - Exactly the same as `null` in other languages.
 * **Nil** - Empty list. `[]` in other languages, same as `List()` in Scala.
 * **None** - The empty case of Option, also called `Nothing` in Haskell.

If you want more information, see my [full post about this](/blog/2013/03/31/representing-empty-in-scala/), there are links to more
detailed information in there as well.

Highlights From Exercises
---

The exercises this week were a lot simpler than my [jumped up Tic Tac
Toe](/projects/arbitrarily-sized-tic-tac-toe/) from last time. On one hand, it
was nice because it took less time to finish. On the other... I have less
to write about now!

So let's evaluate this method I wrote and see if we can make it better:

{% highlight scala %}
def censorThyselfVillain (suspectPhrase : String) : String = {
   var wholesomePhrase = suspectPhrase

   for ((key, value) <- curseWords) {
        wholesomePhrase = wholesomePhrase.replaceAll(key, value)
   }

   return wholesomePhrase
}
{% endhighlight %}

Its purpose is to replace 'offensive' words with a chosen set of 'less
offensive' ones. As far as imperative solutions go I'd say it is pretty easy to
read - it's straightforward and not unnecessarily wordy.

But Scala is a hybrid language - it's capable of functional programming too, not
just OO or imperative. Does that help in this particular case? Let's see:

{% highlight scala %}
def censorThyselfVillain2 (suspectPhrase : String) : String = {
    curseWords.foldLeft(suspectPhrase)((acc, pair) => acc.replaceAll(pair._1, pair._2))
}
{% endhighlight %}

This function can be reduced to a simple fold. As easy to understand as the
previous example was, this one (provided you're already familiar with fold) is
even nicer. It is good to have options.

Full Solutions
---

Here is a nicely formatted version of my solutions to the exercises from Day 2 of Scala. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-4-scala/day2.scala) with the other exercises.

<div id="formatted_solutions">

<h3>Find:</h3>

<div class="question"><b>1.</b> A discussion on how to use Scala files</div>

<p> I'm not entirely clear what this question is looking for. Maybe something
<a href="http://www.scala-lang.org/node/166">like this</a>?</p>

<div class="question"><b>2.</b> What makes a closure different from a code block</div>

<p>I'm not sure I've got my terminology straight here, but I will give it a go.
In Scala, a code block is a piece of syntax that creates closures.</p>

<h3>Do:</h3>

<div class="question"><b>1.</b> Use foldLeft to compute the total size of a list of strings.</div>

{% highlight scala %}
var stringList = List("here", "is", "a", "list", "of", "strings")
var totalStringSize = stringList.foldLeft(0)((total, string) => total + string.length)
var totalStringSize2 = (0 /: stringList) {(total, string) => total + string.length }

println(totalStringSize)
println(totalStringSize2)
{% endhighlight %}

<div class="question"><b>2.</b> Write a Censor trait with a method that will replace the curse words Shoot and Darn with Pucky and Beans alternatives. Use a map to store the curse words and their alternatives.</div>

{% highlight scala %}
import scala.collection.mutable.HashMap

trait Censor {

    var curseWords = Map(
        "(?i)Shoot" -> "Pucky",
        "(?i)Darn" -> "Beans"
    )

    def setCurseWords(newCurseWords : Map[String, String]) = {
        curseWords = newCurseWords
    }

    def censorThyselfVillain (suspectPhrase : String) : String = {
       var wholesomePhrase = suspectPhrase

       for ((key, value) <- curseWords) {
            wholesomePhrase = wholesomePhrase.replaceAll(key, value)
       }

       return wholesomePhrase
    }

    def censorThyselfVillain2 (suspectPhrase : String) : String = {
        curseWords.foldLeft(suspectPhrase)((acc, pair) => acc.replaceAll(pair._1, pair._2))
    }
}

class PolitenessEnforcer extends Censor

var enforcer = new PolitenessEnforcer()

val rudePhrase = "Shoot, my darn head is stuck in the dumb freaking door. Holy gosh Batman!"

println("Spoken frankly: ")
println(rudePhrase)

println("The enforcer menaces with spikes of brass: ")
println(enforcer.censorThyselfVillain(rudePhrase))
{% endhighlight %}

<div class="question"><b>3.</b> Load the curse words and alternatives from a file.</div>

{% highlight scala %}
import scala.io.Source._

var cursesFromFile = Map.empty[String, String]

fromFile("curseWords.txt").getLines.foreach { line =>
    val curseWordPair = line.split('|')
    if(curseWordPair.length == 2) {
        cursesFromFile += ("(?i)" + curseWordPair(0).trim) -> curseWordPair(1).trim
    }
}

val stricterEnforcer = new PolitenessEnforcer()
stricterEnforcer.setCurseWords(cursesFromFile)

println("The enforcer menaces with spikes of onyx: ")
println(stricterEnforcer.censorThyselfVillain(rudePhrase))
{% endhighlight %}

</div>

Next in this series: Day 3 of Scala (coming soon).
