---
layout: post
title: Categorized Weaknesses from the State of Haskell 2011 Survey
---

After reading about the results of the [State of Haskell, 2011
Survey](http://blog.johantibell.com/2011/08/results-from-state-of-haskell-2011.html),
I was curious about the free-form feedback given in response to "What do you
think is Haskell's most glaring weakness / blind spot / problem?".

So I got the raw results and started reading through and categorizing them as I
went. I didn't intend to do the whole thing when I started -- there are a LOT of
answers -- but over a few days I finished it off.

As I read each one I decided whether it would fit into an existing category or
whether it deserved a new one. If one person gave multiple weaknesses I split
them up and put each where it belonged. A couple of times one issue really
seemed to fit in two categories, so I put it in each of them, but I tried to
minimize the amount of times this happened.

It's currently in [a spreadsheet on Google Docs](https://docs.google.com/spreadsheet/ccc?key=0Aq8X8wb4SdlWdG1XM3NoLXhnWl9VR3d6OURYMTA2ZXc&hl=en_US).

If you read through it carefully enough you almost definitely will see feedback
in one category that should have been in another. There _WILL BE_ mistakes.
There were a lot of responses and with continually evolving categories it is
easy to mix some up. Feel free to let me know if you see any errors and I'll
update it.

So what **were** the results?  
---

Here's an overview of roughly how many people thought there was a problem in each category:

![Weaknesses from State of Haskell Bar
Graph](/img/state_of_haskell_2011_weakness.png)

It is probably important to note that I didn't attempt to verify the accuracy of
any of the claims, so this graph represents the public **perception** of where the
problems are, not necessarily where the problems actually are. It is still very
important information though, and likely does match up very closely with where
the problems are. 

<h3>Libraries, Documentation, Hackage and Cabal</h3>

The category for libraries absolutely overwhelmed the rest. I ended up
splitting it into three: Libraries / Packages, Documentation / Library
Documentation, Cabal, and Hackage. The feedback in the general 'Libraries / Packages' category ranged from requests for specific kinds of libraries to pointing out dependency problems to problems with library stability and maturity. Here's a few samples:

> Most libraries are not ready for production use because they   
> a) are incomplete (wrt. to conformance to specifications like XML / XML InfoSet)  
> b) have unacceptable performance for non-toy use (i.e. use strings, too many allocations, etc)  
> c) too often change APIs or don't have a stable maintained version along with an unstable development version  


> Competing and incomplete libraries.  


> I've had problems with borking my packages when installing a new one. New req gets pulled in and causes global/user level dependency problems. If I didn't already know how to fix it, there's a good chance I'd give up.  

A few responses in the **Library Documentation** category walk a fine line
between it and the 'hard to learn' one, but enough people targeted library docs
specifically that I broke it off into its own. Aside from the general statements
of "not enough, and what is there is largely not good", something specific that
was repeatedly asked for was *more examples*. There was some great feedback in
this section:


> A lot of libraries seem to rely on only having "reference" documentation, that
> is an index of every function. This is not enough: More documentation should be
> written geared towards use of the library. Index and reference is good for
> hacking the library or doing weird stuff, but when developing, I just want to
> grab the library and start using it in the way the developer intended.


> By far the biggest problem is the lack of a "middle ground" in documentation. There is ample beginner/tutorial documentation, and extensive "academic expert" documentation (proofs, discussions of mathematical properties of zippers, etc). However, there is very little "application writing" documentation. The problem crops up most often with libraries. Often a library that does something very useful has no non-trivial examples included, and no discussion or tutorial of how to actually put it to use. The library's API functions are often described in terms of their mathematical properties rather than what you would use them for in a "real" program.  
> 
> A few libraries I've suffered this with include fclabels, data-accessor, fgl, and especially haxml. All of these are practically indispensable for writing applications, but have almost no application-oriented documentation. Haxml was a particularly sad case; I had to give up trying to understand it entirely due to the lack of useful documentation.
> 
> This type of documentation may seem to "fall out" from a mathematically-oriented understanding of the library (such as haxml's combinator scheme, or the concept of "lenses" in fclabels), but an application programmer does not have time to work through proofs of lens properties and then figure out what they might be good for in a program. Instead, the application programmer needs cookbook-style documentation to get something up and running, and then s/he can come to understand and make use of the underlying math. 
> 
> One of the few libraries that does this right is Parsec. fclabels at least had a reasonable toy example, but data-accessor fails epically in this regard.
> 
> If application programmers could "get their programs started" more easily, without having to burn so much time wading through math-oriented documentation, I believe Haskell would be more widely adopted. The existence of math-oriented documentation is a very good thing, and is quite helpful when you need to know about those properties, but such documentation is not sufficient for bootstrapping an application.

What a great, detailed response.

The **Hackage** responses had a clear central theme of 'we need a way to gauge the
quality and popularity of packages'. People really want a way to find out how many other people
are using a library, and to see what the general opinion of it is.


> It is still not always easy to know what the "canonical" library for a given
> task is, although one often exists. Hackage feels too crowded at times.


> Hackage is a mess, it's very difficult to find libraries, it's very difficult to
> know which libraries are well designed for which tasks and there are no links
> between libraries that are similar. There are no statistics to know which
> libraries are widely used and no voting system. Old libraries that no longer
> work are sill in Hackage and it is not possible to filter them out. Package
> groups like yesod are a mess on Hackage, some packages are up to date, others
> are old, others have been folded into larger packages and will cause errors if
> you try to build them.


The feedback that mentioned **Cabal** specifically was complaining about how cabal
handles dependency problems and versioning. Notably, one person wrote in to
champion cabal-dev as the solution to the exact problems everyone else is
having:

> This isn't a weakness exactly. In fact, having found cabal-dev, I find it is
> rather a strength. I would like to see more "official" development done with it,
> and would like to see it become a part of the Haskell Platform.
> 
> 
> Without cabal-dev, the "likelihood that a library will build on my machine"
> would be very low (a 1). With it, it jumps to 5. I put in a 4, to indicate that
> it is a solved problem, IF one has the right tools installed. Also, I have built
> up a lot of bash scripts to streamline my cabal-dev workflow.

There is a great post on the Haskell reddit where [jmillikin goes into
detail](http://www.reddit.com/r/haskell/comments/f3ykj/psa_use_cabaldev_to_solve_dependency_problems/)
about how and why cabal-dev can help with dependency hell. I am getting
the impression that the real problem with cabal is just that more people need to
be aware of cabal-dev!

<h3>Tools and Performance</h3>
The next largest group of responses centered around the tools available. In this
category I included everything from IDEs like Leksah, to requests for better
debugging and profiling tools. Very closely linked to the Tools category was
Performance; most responses in that category were saying that it was difficult
to *reason* about performance. That performance was not typically poor, just
that it was unpredictable. This problem can be alleviated by having better
tools. 

The feedback that mentioned **tools** targeted a bunch of different things.
These were the most commonly mentioned:

 * IDE support (mostly: Leksah is good but could be better)
 * Space leak analysis tools
 * Hard to analyze statically
 * Refactoring
 * Debugging

Some people give very specific examples, it is worth looking through these
responses to hear them describe it themselves. Here are a couple samples:

> Reasoning about strictness is often difficult, but even finding simple problems like circular computations that trigger <<loop>> exceptions in the runtime system and similar exceptions are hard to trace to a particular source. +RTS -xc -RTS helps, but is often not very precise. Debugging tools to make this easier would be the most useful improvement for me (or a more robust GHCi that won't choke on unusual projects).


> My major concerns are with runtime analysis. I find it difficult to get the stack when the head of an empty list is requested or to infer by profiling which part of a program is retaining memory which should be freed.


> Lack of a decent IDE. Leksah is the closest yet, but if you compare Haskell to other languages with good commercial penetration, it's a glaring omission. The IDE should be cross-platform and offer a single integration point for all Haskell's development tools, which I hope will continue to improve. 

Almost everyone giving **performance** feedback was echoing the same sentiments: 

> hard to reason about performance,


> hard to reason about space usage


> As noted and clearly in the mind of this survey's author, reasoning about space and time is the single most tricky thing when programming in a lazy FL. I can wax lyrical as much as anyone else about the representational benefits of Haskell and indeed all the robust compile-time type checking, but runtime performance _can_ be the thorn in the flesh. 


> Space leaks/how often we have to deal with them, and how difficult it can be to
> figure out where they are in large applications.


<h3>Learning / Teaching, Mainstream Usage, and Culture</h3>

This group is all about the barrier to entry that there is when trying to learn
Haskell. 

Feedback in the **Learning / Teaching** category says that it is just a
difficult language to learn, full of concepts that you don't normally get
exposure to in other languages. Some people also say that there could be better
materials available to help people that are learning. Amusingly, one person
complained that there were not enough monad tutorials.

> Height of the learning curve. To write useful code, many concepts must be understood (laziness, functional programming, declarative vs imperative code, monads, monad transformers, applicative functors) which takes a lot of time. 
> 
> This makes writing Haskell code at work hard, since nobody will be able to understand it.
> 
> Avoid success at all costs though, right? We wouldn't want a community like the Ruby one.


> Availability of instruction to go from beginner to intermediate


> The Haskell "way" of doing things is so different, it's a lot of effort to adapt. That said there's not really a way round it I don't think. Things like LYAH and RWH help too.

There was more feedback about how **mainstream** Haskell is (or isn't) than I
would have guessed. Half the responses just leave it at "not enough people using
it", the rest pinpoint specific problems or offer some solutions. Notably, one
person disagrees with almost everyone who thought that Performance was a serious
problem for Haskell.

> Bad public image due to FUD, such as ""It is hard to reason about performance and space usage of Haskell programs"" (not any harder in practice than for other mainstream languages given the same level of skill and experience, which is usually not the case for people who complain), ""Haskell is not suitable for enterprise commercial development"" (that's what I do for a living now and it's great; how hard have the people who complain tried to build a Haskell career?), etc. The problem with this kind of ""survey"" is that it tends to reinforce that kind of FUD. But it's good to look for ways to improve; I just hope you'll try to remove some of that bias in the tone of your results. Thanks for this great survey!


> Lack of backing in time and resources to take the language and turn it into a professional grade platform. The community has put in an incredible amount of effort, and it shows. But it just doesn't have anywhere near the polish of commercially backed platforms such as Java or C++. This is very disappointing since the language itself and a lot of the libraries on Hackage are so incredible.


> The reputation as an "academic" language you can't do "real world" development in is still out there and hurts adaption.

The **Culture** group is pretty small and has a lot of overlap with the above
two. It maybe actually should have been merged into one or the other, looking
back at it now. Really what is emphasized though, is that Haskell still very much
has an academic culture, and that can make it harder for people to pick it up.

Darrin Thompson made a blog post with a good explanation of why the academic
culture can make things more difficult and linked to it in the response box.
I'll include a tantalizing quote, but you really should [go read the rest of
it](http://willowbend.cx/2011/07/22/whats-wrong-with-learning-haskell/).

> ...  
> I think especially early on that I could have had an easier time. Some mechanism
> to steer me away from some Haskell resources would have helped. I’m not sure
> what that mechanism might have looked like, so I handwave over the details here.
> Perhaps you formalists know handwaving over the details as the “Axiom of
> Choice,” no? I hearby invoke it.
> 
> For instance, (Or in formal terms, Example 1.1)  I tried to get in tune with the
> current practice of Haskell by lurking on Haskell-Cafe. It worked when I was
> learning Ruby. Not here. This was a bad idea. I learned nothing and it made me
> feel bad. Yeah, poor me.
> 
> Another time (Example 1.2) I tried to read the Comonad Reader blog. Another bad
> idea.
> 
> As a relative Haskell newbie, whose not-Haskell day job is web development,
> integrating systems, build engineering, tormenting managers, and sometimes just
> writing a lot shell scripts, Haskell-Cafe and the Comonad Reader are, and this
> important, don’t miss this: not _for_ me.  
> ...  
>
> [&#91;source&#93;](http://willowbend.cx/2011/07/22/whats-wrong-with-learning-haskell/)

I didn't get the impression anyone was trying to target this as a _negative_
thing, just point out that it does have its tradeoffs.

<h3>GUI and Support For Other Platforms</h3>

These two categories also blend together a bit. I think of the GUI responses as
just a kind of special case of the Platform Support responses.

People _really_ want an easy, good cross-platform **GUI** toolkit to use with
Haskell (as well as better platform-specific solutions).

> Easy and stable out-of-box cross-platform GUI,


> There still does not exist an obvious GUI solution for OS X, or an obvious audio
> solution that does not require the writing of a great deal of "boilerplate"
> code.


> Haskell doesn't have a great GUI story. I think I'm allowed to say this as I maintain wxHaskell, and it's not where I would like it to be.

In the more general case of **Platform Support** responses, there were a fair
amount of people saying getting programs to run on Windows was pretty difficult.
Some people mentioned a problem with OS X Snow Leopard as well.

> If the goal is for Haskell to be more widely adopted, I think a number of integration details are important. Things like a stable ABI, bindings to more OS-specific services (such as Mac and Windows GUI systems), and even things like smaller compiled executables would probably make Haskell more attractive in production environments.


> Working with foreign libraries on a non-unix system (microsoft windows) is a pain. The build system could definitely need some improvements in that area.


<h3>Language and Laziness</h3>

The feedback on the **language** itself is going to be harder for me to sum up.
There are a few obvious trends (no parameterized modules, module system, stack traces, record syntax), and a lot of detailed feedback that I can't understand. :) I'll try to pick out a couple of replies that looked especially well-thought out. 

> Too many string-like types. Abstraction over them that would provide stable and practical API would be nice. Change String from type to class?
> 
> I'd really like to see Functor (=> Pointed) => Applicative => Monad one day.


> Then, of course, the big HList elephant. It gives much needed expressivity and generalisation to everything having to do with records, and having appropriate type-level programming capabilities to write an easy to use and extend HList library would be awesome. The current state is almost as bad as C++ templates."


> Some of the cruft from ancient history, such as Monad not being a subclass of Pointed, Monad having “fail” and pure Prelude functions using exceptions would be nice to get fixed. Not that any of that is really a problem, just a wart.
> 
> It would be nice to have a sufficiently powerful macro/metaprogramming system that is considerably nicer than TH (to the programmer who has to implement the generation of the AST).
> 
> (Haskell is also missing PHP’s excellent Magic Quotes functionality.)

I like that last person's sense of humour.

**Laziness** by default was such a common item of contention (almost equaling
the rest of the language feedback combined!) that I split it out into its own
category. A lot of the remarks in this one are very terse (e.g. 'laziness' or 'being lazy by
default'). Here's one person that expanded on their thoughts a bit:

> \- lazy evaluation incompatible with strong analysis of algorithms
> 
> \- lazy evaluation and parallel computing seem to be at odds in GHC. Robert
>   Harper has commented on that.

And here's a counterpoint by another respondent:

> The community seems to largely believe that laziness is a weakness, when in fact it is very substantially important to getting both good performance and good compositionality.

In any case, since Haskell is partially a long-term experiment to see how well being
lazy by default works out, I don't see this changing any time soon.

<h3>Stability and GHC</h3>

A lot of people expressed concerns about having no serious alternatives to GHC.
The downsides most cited are over-dependence on GHC-specific features, and that
few people are sticking to the Haskell 98 or 2010 standards. There is also
some concern about how frequently GHC makes breaking changes, preventing old
libraries from building on a newer version.

This first person summarizes very well the feedback involving **stability**.

> API/language stability!
> 
> When I come back to code I wrote back in 2009 and try to compile with current Haskell platform, new libraries cabal installs have different APIs, old version of libraries won't compile on current platform. This is very different to my experience with java/python, and makes it hard to conceive of putting Haskell into production products.
> 
> Somewhat unusually, Haskell does have a good language definition, but it's almost useless since the vast majority of useful packages depend on non-standardised extensions. Haskell' needs enough features that the majority of Hackage can be built within the standard language so that it's feasible to code real world applications against a standard with long term support.


> GHC is absolutely great but it would be good to have some serious alternative


> Even though Haskell is standardized, the old code seems to be breaking quite often! Either the API of the base libraries is changed, or GHC behaves differently, or cabal stops working. Sure, all languages have that phase in the beginning, but I think Haskell should be past that by now. I wish the Haskell ecosystem could be a bit more stable while still making progress.

Some also had criticisms specific to **GHC**, mostly mentioning its error messages
and stability.

> (not Haskell per se, but ...) ghc minor version changes breaking (hackage)
> libraries


> Static type compiler errors, when behaviour is not as expected. Compiler
> diagnostic messages could be much more helpful. The user should not have to
> reverse engineer GHC and/or wade through weeks of sprawling academic reading
> material to discover what is going on.

One person had license concerns:

> LGPL.  ghc cannot be used for developing commercial software products out of the box.
> Many Hackage libraries that are not LGPL are still infected by it indirectly due to library dependencies.

I would actually love it if someone could go into more detail on this. I know GHC itself uses a BSD-like license. Is this person maybe referring to [the GMP issue](http://www.well-typed.com/blog/32)?

<h3>Other Backends, FFI, Integration</h3>

These three categories are all about how well Haskell plays with other
languages.

I was actually pretty shocked to discover how many people thought Haskell's
most glaring weakness was not being able to **run on the CLR or JVM**. 

> CLR/JVM/JavaScript backends


> Another problem for adopting Haskell at work would be that it doesn't run on JVM/CLR. So there is no option for polyglotting

There were also some less ambitious requests for a better **FFI** to C++,
Objective-C and Python. 

> Difficulty of integration with C++ (not C). Ability to import C++ headers directly and call C++ methods without inventing wrapper layers would help immensely here at Google.


>Can't communicate with scripting languages like Python (actually possible but painful).

There were 4 responses that I ended up putting under a general **Integration**
category. Three were (kind of vague) requests for more integration with
mainstream OOP environments, but one person had a more detailed request:

> Integration with other build systems. Pretending that cabal is the only true thing is only that, pretending. Until integration with at least auto tools is better, Haskell project will be standalone and integration Haskell into a bigger system will be painful (one has to duplicate cabal's work in detecting libraries, library version, etc.).

<h3>Distribution and Deployment</h3>

There was only a little bit of feedback that fit into this category, but there
seemed to be some pretty good points.

> We're not looking at easy distribution in a serious way yet.


> Distribution of Haskell programs to others is still hard: at best I can tell them to get the platform, run a bunch of cabal commands, then build my program. 

<h3>Doesn't Improve Productivity</h3>

I'm not sure what to say about this category. I don't think I've heard of
someone having this experience with Haskell before. I'm glad it doesn't seem to
be a widespread occurrence (although I will concede the survey audience is probably _just a
little bit_ biased).

> Although the purity and strong-type-system sound all well and good, I'm not
> actually convinced yet that Haskell improves productivity. Perhaps I'm not
> "doing it right", but even after 8 months I generally write code and think, "I
> could have slogged through that faster in C++." And at least then I could have
> used it at work without fear of being 'that guy'.

Responses I Couldn't Fit In A Category
---

These were the responses that either mystified me, covered too many topics to
split apart and remain coherent, or were just too well written for me to be able
to break them up.

This first one was definitely one of the former!

> confusion with Pascal!

...And now on to a few responses that I thought really deserved a highlight.

> Although it is generally regarded a good thing to have diversification, there are two items where I'd like appreciate an authoritatively dictated choice:
> 
> 1.) The non-unified (esp. among libraries) Error/Exception handling, as well as
> 
> 2.) the record-update problem (there are the lenses/fclabels/etc packages, but again, this is a non-unified approach, and it feels clumsy to have to use underscores to mark fields -- I'd prefer a GHC language extension)
> 
> These are _the_ two things (among a few other minor issues) that I dislike the most


> 2) Lack of support for dev environments -- coming from Python where it's extremely easy and beneficial to build a virtualenv or sandbox environment, using cabal-dev requires a lot more work. And when you're trying to use it with packages like Yesod that rely on your main cabal folder or global variables, it either doesn't work or requires a lot of tweaking. I'd love to see a better way to build supported virtual Haskell environments to cut down on the headaches of managing multiple dependencies and different versions of packages


> Even after 20 years we are still struggling with some basic concepts and their implementation in Haskell. A good example is iteratees: the idea is rather new, the problem that it solves is one of the most basic ones, and there are several competing implementations, so it's not clear what should one use.

And with that, I've finally reached the end of this in-depth look at the
feedback on Haskell's most glaring weakness!

Raw Data
---

My list that is split up by categories is currently in a [spreadsheet on Google
Docs](https://docs.google.com/spreadsheet/ccc?key=0Aq8X8wb4SdlWdG1XM3NoLXhnWl9VR3d6OURYMTA2ZXc&hl=en_US).
From there you have a bunch of different formats available download or export it in.

Summary
---

<h3>First Place: Libraries</h3>
By far the largest amount of people think
Haskell's most glaring weakness is related to its libraries and the ecosystem
around them. Specifically:

 * Quality of libraries is inconsistent, and we are missing some specific kinds of libraries
 * Both the quality and amount of library documentation are lacking (needs more examples!) 
 * Hackage needs to include a way for people to gauge package quality and
   popularity
 * More people need to know about cabal-dev (also cabal and cabel-dev could
   possibly use some improvements)

<h3>Second Place: Tools</h3>
There seems to be a lot of room for improvement in Haskell's toolchain as well.
Some specific kinds of tools that were mentioned often were:

 * IDE support (mostly: Leksah is good but could be better)
 * Space leak analysis tools
 * Hard to analyze statically
 * Refactoring
 * Debugging

Having good tools for time and space leak analysis will also help to address all
the concerns raised about performance.

<h3>Third Place: Barrier to Entry</h3>
There are several different parts to the barrier to entry. I can pick out the following common threads from the feedback available:

 * The inherent difficulty of the language
 * Gaps in instructional material between beginner and intermediate. More material that emphasizes being friendly and practical would help.
 * Reputation as difficult, academic, and hard to reason about performance
 * Academic culture

I want to reiterate --- these are not all 'problems that should be fixed'.
Haskell would not be what it is without the academic culture and the powerful
language, for example. But, both of these have tradeoffs that should be acknowledged, and
maybe rendered less important by improving the areas that **do** need it.

<h3>Honourable Mentions: Cross-platform support and Language</h3>

I also want to shine the spotlight on at least two more areas. There were a lot
of people that wanted better cross platform support, of which the majority were
most concerned with GUI support. The cross-platform feedback generally fell into two areas: 

 * The ability to easily write a simple cross-platform application 
 * The ability to better integrate with OS-specific libraries for a better
    experience

There weren't as many people with feedback on the language itself, but there
was some good targeted feedback that I don't think should be overlooked. I
highlighted a couple of more detailed replies in the main section of this above,
but the general trend looked like:

 * Haskell is lazy by default
 * Lack of parameterized modules
 * Module system needs improvement in general
 * Lack of stack traces
 * Record syntax needs work

And that's it! Please feel free share your own thoughts on this or point out any errors I've made. I'd like to thank [Johan Tibell](http://blog.johantibell.com/) for running the [State of Haskell 2011 Survey](http://blog.johantibell.com/2011/08/results-from-state-of-haskell-2011.html); all the respondents for providing this useful feedback; and you, dear reader, for getting this far!
