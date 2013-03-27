---
layout: post
title: "Seven Languages: Week 4 (Scala) - Day 1"
description: I have to admit Day 1 of Scala was a bit of a relief. Forcing myself to think
through the perspective of Prolog was
---

I have to admit Day 1 of Scala was a bit of a relief. Forcing myself to think
through the perspective of Prolog was enlightening but still a bit of a
struggle. It's nice to come back to paradigms I'm familiar with again. Scala is
a hybrid language, with great support for both object-oriented and functional
programming, both of which I'm fairly comfortable with.

That's not to say everything went smoothly however - danger lies in
overfamiliarity. At first I was writing Java in Scala, then when I tried to fix
it I realized I was now trying to write Haskell in Scala. Neither approach felt
very good.

The beauty of Scala (in my eyes) is its flexibility and practicality.   It
pushes you towards immutability and is capable of very succinct functional code,
but it also has that mutable imperative escape hatch, and a good set of tools
for working with problems that suit code like that. It will let you write in the 
style that is most appropriate for the problem you are trying to solve.

The collection libraries in 2.8+ also deserve special mention: a lot of work
has been put into them and it shows!

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2012/02/18/seven-languages-week-3-day-3/">Week 3 (Prolog) - Day 3</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

Topics Covered
---

<h3>Syntax</h3>

In Day 1 we went over the basics of Scala syntax and some object-oriented
features. Scala is loosely based around traditional C-style curly brace syntax
with some helpful differences. The first is that you don't need
semicolons at the end of the line, woohoo! Also, in [certain
situations](http://docs.scala-lang.org/style/method-invocation.html#suffix_notation)
you can use whitespace instead of a `.` for method calls, Haskell-style.

In order to declare a variable, you must make a choice right away whether you
want it to be immutable or not. Declarations using `val` are immutable,
declarations using `var` are mutable. There are mutable and immutable
versions of most of the collections in the standard library as well, but
the default is immutable (you need to be explicit if you want mutable versions).
As someone who is a fan of Haskell and made generous use of `final` in Java, I
really appreciate making it so easy to use immutability in Scala.

Another couple of differences have to do with type information. Type information
is now attached to variables with a colon and is optional in many cases (when it
can be inferred from context). 

{% highlight scala %}
val i: Int = 1  // explicit type info
val i = 1       // using type inference
{% endhighlight %}

Scala also has [several helpful looping constructs](http://www.matthicks.com/2009/10/loops-in-scala.html), [ranges](http://www.scala-lang.org/api/current/index.html#scala.collection.immutable.Range), and [tuples](http://codemonkeyism.com/tuples-scala-goodness/), but I don't want to focus on them right now. Moving on!

<h3>Object-Oriented Features</h3>

<h4>Classes and Companion Objects</h4>
Like any good object-oriented language Scala has classes, where you can put your
state and instance methods. Static methods (class methods if you prefer) are
treated a bit differently - they must all reside in a static Companion Object.
This is unusual but I've found the separation kind of nice so far. Here's a
stripped-down version of my TicTacToeBoard class from the exercise:

{% highlight scala %}
class TicTacToeBoard(board : Array[Array[Player]]) {

    val rowCount = board.length
    val columnCount = if (board.isEmpty) 0 else board(0).length

    def validMove(row : Int, col : Int) : Boolean = {
        return row < rowCount && row >= 0 && col < columnCount && col >= 0 && board(row)(col) == Blank
    }
}

object TicTacToeBoard {
    def getPlayersFromString(row : String) : Array[Player] = {
        row.map(char => { 
            if(char == 'X') X : Player 
            else if(char == 'O') O : Player 
            else Blank : Player } 
        ).toArray
    }
}
{% endhighlight %}

Head ups: this example depends on a few classes (Player, X, O, Blank) that are
defined in the next section. You could use this class like so:

{% highlight scala %}
val board = new TicTacToeBoard(Array(
    "XOX",
    "OO ",
    "XXO").map(row => TicTacToeBoard.getPlayersFromString(row)))

println(board.validMove(0, 0)) // false
println(board.validMove(1, 2)) // true
{% endhighlight %}

<h4>Case Classes</h4>
[Case Classes](http://www.scala-lang.org/node/107) are a great addition to Scala, they are one of my favourite things.
They are basically a shortcut to define simple data holding classes with a few
[extra features](http://stackoverflow.com/questions/2312881/what-is-the-difference-between-scalas-case-class-and-class). The big one is that you can use case classes with pattern
matching. If you're coming from Haskell, you'll be interested
to know that they let you imitate algebraic datatypes smoothly and easily! 

Here I'm using case classes (although technically they are case objects) to
represent the ownership of squares on my tic tac toe board. With this code the
example above is now functional and runnable.

{% highlight scala %}
sealed abstract class Player
case object X extends Player
case object O extends Player
case object Blank extends Player {
    override def toString = " "
}
{% endhighlight %}

This segment of code gives me pretty much what you'd expect: three classes that
share an abstract parent Player class. Since X, O, and Blank are defined using
`object` this also results in three singleton objects `X`, `O`, and `Blank`.
There are sensible default toString implementations for X and O, and I can
pattern match against the classes (which I do in [TicTacToeBoard.determineWinner](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-4-scala/day1.scala#L112).

Scala also has [traits](http://www.scala-lang.org/node/126) which are great but
will be talked about next post, where I will be able to show you an example from the
exercise.

Highlights From Exercises
---

The exercise this week was quite fun, although I went a bit overboard with it.
I made a game game that will let you play arbitrarily sized tic tac toe! I
checked the rules for [m,n,k games](http://en.wikipedia.org/wiki/M,n,k-game) and
put a few limits in so depending on the board size you choose you're playing
[Tic Tac Toe](http://en.wikipedia.org/wiki/Tic_Tac_Toe),
[Gomoku](http://en.wikipedia.org/wiki/Gomoku),
[Connect6](http://en.wikipedia.org/wiki/Connect6), or some custom variation in
between.

Unfortunately because of this, one of my favourite bits of code from this
exercise is now obsolete. I had written a really simple three in a row checking
function using pattern matching, and I was (and still am!) quite happy with it.

It only works if you know at compile-time how many in a row you're checking for,
so it sadly had to be replaced for me to expand to arbitrarily sized games. But
here it is:

{% highlight scala %}
def threeInARow(list : List[Player]) : Option[Player] = list match {
    case Nil => None
    case x :: y :: z :: tail if x == y && y == z && z != Blank => Some(z)
    case _ :: tail => threeInARow(tail)
}
{% endhighlight %}

Isn't pattern matching nice to have?

I actually went overboard in another way as well on this exercise. I spent a
fair amount of time making it solid and usable. It's command-line Tic Tac Toe,
but hopefully it's among the best damn command-line Tic Tac Toes you've seen.

Because of this, I decided I may as well give it a permanent home and I gave it
its own [Arbitrary-Sized Tic Tac Toe project page](/projects/arbitrarily-sized-tic-tac-toe/)!

Here's what it looks like:

<div class="symmetrical_line_height">
{% highlight bash %}
Player X's turn.
Enter square: (e.g. A0): a2

     A   B   C   
   ┌───┬───┬───┐
0  │ X │ X │ O │
   │───│───│───│
1  │   │ O │   │
   │───│───│───│
2  │ X │   │   │
   └───┴───┴───┘
{% endhighlight %}
</div>

What, you want bigger? Okay!

<div class="symmetrical_line_height">
{% highlight bash %}
Enter board size: 9

5 in a row to win (9x9 board)

     A   B   C   D   E   F   G   H   I   
   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
0  │   │   │   │   │   │   │   │   │   │
   │───│───│───│───│───│───│───│───│───│
1  │   │   │   │   │   │   │   │   │   │
   │───│───│───│───│───│───│───│───│───│
2  │   │   │   │   │   │   │   │   │   │
   │───│───│───│───│───│───│───│───│───│
3  │   │   │   │   │   │   │   │   │   │
   │───│───│───│───│───│───│───│───│───│
4  │   │   │   │   │   │   │   │   │   │
   │───│───│───│───│───│───│───│───│───│
5  │   │   │   │   │   │   │   │   │   │
   │───│───│───│───│───│───│───│───│───│
6  │   │   │   │   │   │   │   │   │   │
   │───│───│───│───│───│───│───│───│───│
7  │   │   │   │   │   │   │   │   │   │
   │───│───│───│───│───│───│───│───│───│
8  │   │   │   │   │   │   │   │   │   │
   └───┴───┴───┴───┴───┴───┴───┴───┴───┘


Player X's turn.
Enter square: (e.g. A0): 
{% endhighlight %}
</div>

Want to see how big it can go? Go [download it now](/projects/arbitrarily-sized-tic-tac-toe/) and try it out! I haven't
enforced any kind of sensible limit, so you can fill your terminal with
characters or get OutOfMemory errors to your heart's content.

Full solutions
---

Here is a nicely formatted version of my solutions to the exercises from Day 1 of Scala. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-4-scala/day1.scala) with the other exercises.  

<div id="formatted_solutions">

<h3>Find:</h3>

<h4>1. The Scala API</h4>

<p><a href="http://www.scala-lang.org/api/current/index.html">http://www.scala-lang.org/api/current/index.html</a></p>

<h4>2. A comparison of Java and Scala</h4>

<ul>
   <li>Quite a nice article, well-written, good detail level</li>
   <ul><li><li><a href="http://www.ibm.com/developerworks/java/library/j-scala01228/index.html">http://www.ibm.com/developerworks/java/library/j-scala01228/index.html</a></li></li></ul>

   <li>Overiew/summary level comparison of Java, Scala, Groovy, Clojure</li>
   <ul><li><li><a href="http://stackoverflow.com/questions/1314732/scala-vs-groovy-vs-clojure">http://stackoverflow.com/questions/1314732/scala-vs-groovy-vs-clojure</a></li></li></ul>

   <li>This is funny and kind of revealing, even if the question leads to a bit of a biased picture.</li>
   <ul><li><li><a href="http://stackoverflow.com/questions/2952732/samples-of-scala-and-java-code-where-scala-code-looks-simpler-has-fewer-lines">http://stackoverflow.com/questions/2952732/samples-of-scala-and-java-code-where-scala-code-looks-simpler-has-fewer-lines</a></li></li></ul>

   <li>More low-level comparison</li>
   <ul><li><li><a href="http://blogs.sun.com/sundararajan/entry/scala_for_java_programmers">http://blogs.sun.com/sundararajan/entry/scala_for_java_programmers</a></li></li></ul>

   <li>Some more</li>
   <ul><li><li><a href="http://www.artima.com/scalazine/articles/scalable-language.html">http://www.artima.com/scalazine/articles/scalable-language.html</a></li></li>
   <li><li><a href="http://www.ibm.com/developerworks/java/library/j-scala01228/index.html">http://www.ibm.com/developerworks/java/library/j-scala01228/index.html</a></li></li></ul>
</ul>

<h4>3. A discussion of val versus var</h4>

<p><a href="http://stackoverflow.com/questions/1791408/what-is-the-difference-between-a-var-and-val-definition-in-scala">http://stackoverflow.com/questions/1791408/what-is-the-difference-between-a-var-and-val-definition-in-scala</a></p>

<h3>Do:</h3>

<h4><b>1.</b> Write a game that will take a tic-tac-toe board with X, O, and blank characters and detect the winner or whether there is a tie or no winner yet.  Use classes where appropriate.</h4>

{% highlight scala %}
// Run this file with 'scala -Dfile.encoding=UTF-8 day1.scala'

sealed abstract class Player
case object X extends Player
case object O extends Player
case object Blank extends Player {
    override def toString = " "
}

object GameResult extends Enumeration {
    type GameResult = Value
    val X, O, Tie, NoResult = Value

    def displayGameResult(gameResult: GameResult) : String = {
        val winnerText = "Player %s won!"

        gameResult match {
            case GameResult.NoResult => "No winner yet!"
            case GameResult.Tie => "It's a tie!"
            case player => winnerText.format(player)
        }
    }
}

class TicTacToeBoard(board : Array[Array[Player]]) {

    def this(stringBoard: Array[String]) = this(stringBoard.map(row => TicTacToeBoard.getPlayersFromString(row)))
    def this(rows: Int, cols: Int) = this(Array.fill(rows, cols)(Blank) : Array[Array[Player]])
    def this(size: Int) = this(size, size)

    val rowCount = board.length
    val columnCount = if (board.isEmpty) 0 else board(0).length
    val columnNameMapping = (0 until 5*columnCount).map(n => (TicTacToeBoard.numToAlpha(n), n)).toMap

    val numInARowNeeded : Int = {
        // numbers chosen rather arbitrarily by me. I looked at this: http://en.wikipedia.org/wiki/M,n,k-game
        // and tried to pick numbers that more or less made sense
        if(rowCount <= 3|| columnCount <= 3)
        {
            // tic tac toe or bizarre tiny variants
            scala.math.min(rowCount, columnCount)
        } else if(rowCount <= 5) {
            // connect 4, sort of
            4
        } else if(rowCount <= 14) {
            // gomoku
            5
        } else {
            // connect6. Seems like a good place to leave it
            6
        }
    }

    def rows: Seq[Array[Player]] = {
        for(r <- 0 until rowCount) 
            yield board(r)
    }

    def columns: Seq[Array[Player]] = {
        for(c <- 0 until columnCount) yield (
            for(r <- (0 until rowCount)) 
                yield board(r)(c)).toArray
    }

    def diagonalsLTR: Seq[Array[Player]] = {
        for(offset <- (1-columnCount) until columnCount) yield (
            for(row <- 0 until rowCount if offset + row < columnCount && offset + row > -1)
                yield(board(row)(row+offset))).toArray
    }

    def diagonalsRTL: Seq[Array[Player]]  = {
        for(offset <- 0 until rowCount + rowCount - 1) yield (
            for(col <- 0 until columnCount if offset - col < rowCount && offset - col > -1)
                yield(board(offset - col)(col))).toArray
    }

    def determineWinner : GameResult.Value = {
        val winnerText = "Player %s won!"
        val checkForWinner = { array : Array[Player] =>
            TicTacToeBoard.nInARow(numInARowNeeded, array) match {
                case Some(player) => return player match { // non-local return!
                    case X => GameResult.X
                    case O => GameResult.O
                    case other => throw new Exception("Error, '" + other + "' is not a player.")
                }
                case None => // do nothing
            }
        }

        rows foreach checkForWinner
        columns foreach checkForWinner
        diagonalsLTR foreach checkForWinner
        diagonalsRTL foreach checkForWinner

        if(board.map(row => row.contains(Blank)).contains(true)) {
            return GameResult.NoResult
        }

        return GameResult.Tie
    }

    override def toString : String = {
        var boardRepresentation = ""

        def p = { str : String => boardRepresentation = boardRepresentation.concat(str + "\n") }

        val topLine = (1 until columnCount).foldLeft("   ┌")((acc, c) => acc.concat("───┬")).concat("───┐")
        val middleLine = (0 until columnCount).foldLeft("   │")((acc, c) => acc.concat("───│"))
        val bottomLine = (1 until columnCount).foldLeft("   └")((acc, c) => acc.concat("───┴")).concat("───┘")

        p("")
        p((0 until columnCount).foldLeft("     ")((acc, n) => acc.concat("%-4s".format(TicTacToeBoard.numToAlpha(n)))))
        p(topLine)
        for(r <- 0 until rowCount) {
            var rowString = "%-3d".format(r).concat("│")
            for(c <- 0 until columnCount) {
                rowString = rowString.concat(" %s │".format(board(r)(c)))
            }
            p(rowString)
            if(r < rowCount-1) {
                p(middleLine)
            }
        }
        p(bottomLine)
        p("")

        return boardRepresentation
    }

    def validMove(row : Int, col : Int) : Boolean = {
        return row < rowCount && row >= 0 && col < columnCount && col >= 0 && board(row)(col) == Blank
    }

    def update(row : Int, col : Int, player : Player) = {
        board(row)(col) = player
    }

    def columnNumber(columnName : String) : Int = {
        return columnNameMapping(columnName)
    }
}

object TicTacToeBoard {

    def numToAlpha(number : Int) : String = {
        var dividend = number + 1 // internally, treat 1 as A - just makes it easier
        var letters = ""
        var modulo = 0

        while(dividend > 0) {
            modulo = (dividend - 1) % 26
            letters = (65 + modulo).toChar + letters
            dividend = (dividend - modulo) / 26
        }

        return letters
    }

    def getPlayersFromString(row : String) : Array[Player] = {
        row.map(char => { if(char == 'X') X : Player else if(char == 'O') O : Player else Blank : Player } ).toArray
    }

    def threeInARow(list : List[Player]) : Option[Player] = list match {
        case Nil => None
        case x :: y :: z :: tail if x == y && y == z && z != Blank => Some(z)
        case _ :: tail => threeInARow(tail)
    }

    def nInARow(n : Int, array : Array[Player]) : Option[Player] = {
        for(i <- 0 until array.length - (n-1)) {
            var allTrue = true;
            for(j <- i+1 until i+n) {
                allTrue &= array(j-1) == array(j)
            }
            if(allTrue && array(i) != Blank) {
                return Some(array(i))
            }
        }

        return None
    }

}

// 2. Bonus Problem: Let two players play tic-tac-toe.

object Game {
    val Position = """([A-Za-z]+)\s*(\d+)""".r

    def main(args:Array[String]) {
        val size = readBoardSize
        var board = new TicTacToeBoard(size)
        println("\n" + board.numInARowNeeded + " in a row to win (" + size + "x" + size + " board)")

        var player : Player = X
        while(board.determineWinner == GameResult.NoResult) {
            println(board)
            println("Player %s's turn.".format(player))

            val (row, col) = readNextMove(board)
            board.update(row, col, player)

            player = if(player == X) O else X
        }

        println(board)
        println(GameResult.displayGameResult(board.determineWinner))
        println
    }

    def readBoardSize: Int = {
        var size = -1

        while(size < 1) {
            try {
                print("Enter board size: ")
                size = Console.readInt
            } catch {
                case e => { size = -1 }
            }
            if (size < 1) {
                println("Invalid board size. Please enter a number greater than 0.")
            }
        }

        return size
    }

    def readNextMove(board: TicTacToeBoard): (Int, Int) = {
        var validMove = false
        var col = -1
        var row = -1
        while(!validMove) {
            var input = ""
            try {
                print("Enter square: (e.g. A0): ")
                input = Console.readLine
                val Position(columnName, rowNumber) = input
                row = rowNumber.toInt
                col = board.columnNumber(columnName.toUpperCase)
            } catch {
                case e => { println("Error reading input: Could not understand \"" + input + "\"") }
            }

            validMove = board.validMove(row, col)
            if(!validMove) {
                println("Can't move there, try again!\n")
            }
        }

        return (row, col)
    }

}

Game.main(null)
{% endhighlight %}
</div>

Phew! That was a long one, eh? Once again, you can see more about this by going
to its [project page](/projects/arbitrarily-sized-tic-tac-toe/).

Next in this series: Day 2 of Scala (coming soon).
