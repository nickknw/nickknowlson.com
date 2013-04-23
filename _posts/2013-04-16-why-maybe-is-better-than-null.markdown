---
layout: post
title: The Definitive Reference To Why Maybe Is Better Than Null
description: Maybe, at its core, is a construct that allows programmers to move null checks into the type system, so they can be enforced at compile-time.
---

This article is divided into two parts: explanation and FAQ. The
explanation explains why there are a lot of people who think the idea behind
Maybe is way more useful than `null`. The FAQ is mostly a list of my responses
to common arguments I've seen about the shortcomings of Maybe.

I'm going to try to not go overboard with details here - my aim with this
explanation is to make it accessible to as many programmers as possible, not
to be as thorough as possible.

Explanation
---

<h3>Motivation</h3>

Tony Hoare, the inventor of `null`, [has gone on record calling it his
'billion-dollar mistake'](http://qconlondon.com/london-2009/presentation/Null+References:+The+Billion+Dollar+Mistake). So what should replace it?

Maybe, at its core, is a construct that allows programmers to **move null checks
into the type system**, so they can be enforced at _compile-time_. Instead of
forgetting to deal with a null check and finding out with an exception at
run-time, you forget to deal with a null check and _find out at compile-time,_
before anyone else even sees it! And that's **not just some null checks**, that's **all of
them, guaranteed!**

<h3>Details</h3>

There are two components to an environment free
of null pointer exceptions:

 1. The elimination of `null`. This means that all types (even reference types!)
    become non-nullable. 
 2. An alternative representation for the idea of "may contain an empty
    or invalid value". This is what Maybe is for.

So how does Maybe accomplish this, and how does it achieve all those benefits
listed above? It's actually very straightforward.

In object-oriented terms, think of `Maybe` as a generic interface that has
exactly two implementing classes: `Just` and `Nothing`. The `Just` class wraps a value
of some other type and the `Nothing` class doesn't. There are a variety of ways to
extract the value safely, but I'm going to omit these for now, as they're not
the point. When you receive an object of type `Maybe<String>` (for example) you now have
the type system helping you out, telling you "there _might_ be a String here but
it _might_ be empty". You **can't** perform operations on the String until you've
safely extracted it and _made a choice_ about what to do in the case that its
empty. 

By itself (without point **#1**) this is nice but not fantastic. The benefit
really kicks in when you also have non-nullable types. It simplifies the 80% of
the cases that don't involve `null` and gives significance and meaning to the
times when you do deal with objects wrapped in `Maybe<T>`. It lets you say both
"I know that this value will _literally never_ be null" and "It is immediately
obvious to me that I need to handle the case of an empty value here".

<h3>Conclusion</h3>

It's not that dealing with any given instance of null is particularly hard, it's
that it is [so easy to miss one](http://james-iry.blogspot.ca/2013/03/king-null-stubborn.html). Removing this concern and encoding the
information in the type system means programmers have less things to keep track
of and simplifies control flow across the entire program. Like with memory
management: when you don't have to keep track of it manually it is just plain
easier to write code. More importantly, it is easier to write **more robust**
code. For all programmers, not just the experienced or talented.

And that is something I am firmly in favour of. A product is rarely built by a
single person. Improvements to other people's code benefit all of us. 

<h3>Addendum</h3>

There are two more points I'd like to address about Maybe that are separate from
actually explaining why it is useful.

**First**, I've been a bit inaccurate on purpose when just referring to this
idea as Maybe. There is an implementation of this idea in Haskell called Maybe,
but implementations in different languages have different names.

 * ML, Scala, F#, Rust: Option
 * C#: Nullable
 * Fantom, Kotlin: ? appended to type

**Second**, not all environments with Maybe have non-nullable types. This makes
Maybe less valuable in those environments (since you lose the **very** useful "I
know this value will never contain `null`" guarantee") and ends up confusing
people who are skeptical of Maybe's benefits.  

To help clarify this: I agree that in a language where you don't have the
guarantee provided by non-nullable types, Maybe _just isn't as useful_. But it
is not use_less_ either and depending on the environment may still provide some
benefit.

FAQ
---

Posts like these are tricky. To explain something understandably and
(relatively) concisely I can't qualify every statement and address all the holes
inline. Here is where I'll address the bits I skipped as well as some common 
sentiments I've previously seen on this topic.

I have made each headline a link as well so each question/answer combo can be linked
to individually.

<h4><a id="maybe-shortcomings" href="#maybe-shortcomings" class="header_link">Maybe isn't the be-all
end-all.</a> </h4>

I definitely agree. For one thing, I haven't even mentioned
[Either](http://www.haskell.org/ghc/docs/6.12.2/html/libraries/base-4.2.0.1/Data-Either.html)!
This article is for people who aren't convinced of the benefits of Maybe yet. In
order to get my point across effectively I want to avoid overwhelming the reader
with information, so I restricted the topics brought up here.

If you want a higher level perspective on this issue, take a look at [dmbarbour's
view:](http://lambda-the-ultimate.org/node/3186#comment-46637)

<blockquote>
<p>There are two mistakes. One mistake is providing a 'sum' type (eqv. to Just
Object | Nothing) without recognition of the typechecker. The other mistake
is joining this sum type at the hip with the idea of references, such that
you cannot have one without the other.</p>

<p>These mistakes may, and I suspect should, be resolved independently.
Thinking there's just one mistake, and thus just one language feature to
solve it, might very well be a third mistake.</p>
</blockquote>

Beautifully stated! This is a much more general (and elegant) way to look at
it. It's a somewhat harder sentiment to communicate effectively to a lot of
people though.

<h4><a id="ide-plugin" href="#ide-plugin" class="header_link">My IDE plugin already does this.</a> </h4>

Yes, there are some IDEs and plugins that provide limited null reference analysis.
The key though, is that it **is** limited. As far as I know none of them
provide the same system-wide elimination of `null` that encoding it in the
type-system can guarantee.

And so, you still don't get the same reassurances of "I know this value will
_literally never_ be null" and "It is immediately obvious that I have to handle
the case of an empty value here".

<h4><a id="hiding" href="#hiding" class="header_link">NPEs are the proper
response to a missing value you forgot to consider. You should be notified when
something goes wrong, not hide it with Maybe.</a> </h4>

I've got good news for you - we fundamentally agree in our approach to how
errors should be handled! You have probably seen some bad examples of Maybe
usage, since proper usage would lead to these errors being caught _even earlier_
than a NullPointerException would have.

Buggy code is instead caught at compile-time and your program ends up not
_having_ to throw an exception and terminate gracefully because _the bug has
already been fixed!_

<h4><a id="real-problem" href="#real-problem" class="header_link">The real
problem is people not properly reasoning about their functions, that isn't the
fault of null.</a> </h4>

Sure, that is one way to look at it: it's not `null`'s fault, it is the
programmer's fault. If you take this view then `null` is just one of the tools
used to represent emptiness and invalid values. But it isn't a very good tool,
or at least not as good as it could be.

Maybe is a tool that fills the same gap as `null` but is much more helpful to
programmers. It helps directly address the core problem of "people not properly
reasoning about their functions" by pointing out mistakes in reasoning earlier.
With it you can statically verify that all null checks are made, and eliminate
an entire class of run-time errors.

I'm not claiming it is a silver bullet, but it **is** a better tool.

<h4><a id="default-value" href="#default-value" class="header_link">Null is meaningful! What if a value cannot have any meaningful default value?</a> </h4>

Then either wait until it has a meaningful value to put in it or wrap it in
Maybe and give it a value of Nothing. That's what Maybe is for - To provide a
type-checkable alternative to `null`!

<h4><a id="same-thing" href="#same-thing" class="header_link">So you're still testing against null, except that it's called Nothing. What have we gained?</a> </h4>

We have gained earlier detection of an entire class of errors! Now if there is a
missed check for an empty value you will find out at compile-time rather than
run-time. The user doesn't see the error, it is fixed before it gets outside the
developer's computer.

<h4><a id="safe-invoke" href="#safe-invoke" class="header_link">I think the safe-invoke operator in Groovy/Kotlin/Fantom/CoffeeScript is better than Maybe.</a> </h4>

I'm going to talk about Kotlin and Fantom separately in the next section because
they're special.

In Groovy/CoffeeScript, the safe invoke operator (`?.`) lets you safely call a method or access
a field on an object that may be `null`. If the object IS `null` then the
method/field just returns `null` as well, instead of an exception being thrown.

I agree that the safe-invoke operator is certainly convenient but it is solving
a different problem.  If you compare it directly to Maybe, it's only solving the
'retrieve value from possibly empty object' part of Maybe.  This is a nice thing
to have, but isn't nearly as interesting as moving a whole class of run-time
exceptions to compile-time.

Which is fine, [Groovy isn't really about statically enforcing things](http://james-iry.blogspot.ca/2009/07/groovy-does-not-have-optional-static.html) and neither is CoffeeScript.
Just don't misrepresent this feature as being anything more than **a convenient
syntax for null checks**.

<h4><a id="fantom-kotlin" href="#fantom-kotlin" class="header_link">What About Fantom &amp; Kotlin?</a> </h4>

Fantom and Kotlin are different because they are both languages that have
non-nullable reference types and have built Maybe in as a language
feature. In both languages ([Fantom](http://fantom.org/doc/docLang/TypeSystem.html#nullableTypes), [Kotlin](http://confluence.jetbrains.com/display/Kotlin/Null-safety)), you can distinguish a reference that may hold `null`
by appending a ? to its type (i.e. `String?`). The compiler can then keep track
of it as if it were a `Maybe<String>` and is able to prevent you from unsafely
accessing its contents. They provide safe-invoke and elvis operators to extract
the value like Groovy does.

This is probably where opinions will start to differ among people who think
Maybe is a good idea.

I personally am thrilled by the steps Fantom and Kotlin have taken and think
that they are a great solution to eliminating null reference
exceptions. They use the fact that they've implemented it as a language feature
to provide really convenient and easy to understand syntax. So easy to
understand, in fact, that it might not be obvious that **it is the same damn
thing as Maybe**. The only differences are that Fantom and Kotlin have a
special syntax for it baked in, and that (in exchange) it is a little bit more
limited than Maybe as a library is.

The only downsides to this approach are related to the fact that it is
specialized. When you stretch against the limits of Maybe you can't drop in
[Either](http://www.haskell.org/ghc/docs/6.12.2/html/libraries/base-4.2.0.1/Data-Either.html)
instead. You also can't wrap Maybes in another Maybe (`Maybe<Maybe<String>>`),
which you might do when you have nested calls that could fail. 

I can't speak to how often this ends up being an issue for people working in
Fantom/Kotlin and what alternatives the language provides because, frankly, I am
pretty unfamiliar with them. If anyone with experience would like to speak up
I'd be happy to annotate this section with their information.

<h4><a id="option-scala" href="#option-scala" class="header_link">But Option in Scala DOESN'T save you from null!</a> </h4>

Yes, in Scala you can still get NullPointerExceptions. Scala doesn't have
non-nullable reference types because Martin Odersky (for what were probably good
reasons - I'm guessing related to java interop) decided to include `null` in his
language. That doesn't invalidate all the other implementations of Maybe
and it doesn't mean it can't still be somewhat useful in Scala. 

Feel free to point out to people that Scala's implementation of Option still
allows for NullPointerExceptions, just don't generalize it to "Maybe and Option
aren't useful".

<h4><a id="unsafe-methods" href="#unsafe-methods"
class="header_link">Safety ISN'T guaranteed because of the existence of unsafe
extraction methods.</a> </h4>

Often implementations of Maybe will include more than just safe extraction
methods. Haskell's `fromJust` and Scala's `get` are both retrieval functions
that throw runtime errors if the value wrapped in Maybe doesn't exist. Just like
how `null` usually works.

So it **is** possible to shoot yourself in the foot if you want to. The difference
is: you have to **explicitly ask** for this behaviour, it cannot sneak in by
accident.

Whenever I claim Maybe can move null reference exceptions to compile-time,
it comes with the assumption that you're using the built-in safe extraction
methods and that you're not _requesting_ run-time exceptions.
