---
layout: post
title: Representing Emptiness In Scala (with Null, null, Nothing, Nil, None, and Unit)
description:
---

There are a
[couple](http://lousycoder.com/index.php?/archives/92-Scala-So-many-ways-to-say-nothing.html)
of [explanations](http://oldfashionedsoftware.com/2008/08/20/a-post-about-nothing/)
of these terms out there already, but my needs weren't quite satisfied by them. Detail
is great, but I wanted concise high level descriptions that explain what the
primary purpose for each construct is and emphasize the ones you're most likely
to see in practice. This explanation is intended to _complement_ ones with more detail, not
replace them.

<h4>null</h4>
Scala's `null` is the same as in Java. Any reference type can be `null`, like
Strings, Objects, or your own classes. Also just like Java, value types like
Ints can't be `null`. <strong>Odds are you'll see this
one.</strong>

<h4>Null</h4>
[Null](http://www.scala-lang.org/api/current/index.html#scala.Null) is a trait
whose only instance is `null`. It is a subtype of all reference types, but not of
value types. It purpose in existing is to make it so reference types can be
assigned `null` and value types can't. <strong>Don't worry about this one.</strong>

<h4>Nothing</h4>
[Nothing](http://www.scala-lang.org/api/current/index.html#scala.Nothing) is a
trait that is guaranteed to have _zero_ instances. It is a subtype of all
other types. It has two main reasons for existing: to provide a return type for
methods that **never** return normally (i.e. a method that always throws an exception).  The other reason is to provide a type for
Nil (explained below). <strong>Don't worry about this
one.</strong> 

<h4>Nil</h4>
[Nil](http://www.scala-lang.org/api/current/index.html#scala.collection.immutable.Nil$)
is just an empty list, exactly like the result of `List()`. It is of type
`List[Nothing]`. And since we know there are no instances of Nothing, we now have a list
that is statically verifiable as empty. Nice to have. <strong>Odds are you'll see this one.</strong>

<h4>None</h4>
[None](http://www.scala-lang.org/api/current/index.html#scala.None$) is the
counterpart to
[Some](http://www.scala-lang.org/api/current/index.html#scala.Some), used when
you're using Scala's
[Option](http://www.scala-lang.org/api/current/index.html#scala.Option) class to
help avoid `null` references. If you're not familiar with the idea of Option or
Maybe, here's an [introduction to
Option](http://blog.danielwellman.com/2008/03/using-scalas-op.html).
<strong>Odds are you'll see this one.</strong>

<h4>Unit</h4>
[Unit](http://www.scala-lang.org/api/current/index.html#scala.Unit) in Scala is
the equivalent of `void` in Java. It's used in a function's signature when that
function doesn't return a value. <strong>Odds are you'll see this one.</strong>

Hope this has helped!
