---
layout: post
title: Counting Powers of Two - A Neat Pattern
description: Article about a neat pattern I observed when counting powers of two.
---

A little while ago I was going for a walk and searching for something to occupy
my mind for a while. Something that would take my mind away from other problems
and give it a simple, solvable, repetitive activity to do for a while. I hit
upon counting up by powers of two.

Why? I'm a programmer, and powers of two are important and prevalent numbers in
this field. By this point 128, 256 and 512 seem like nice round numbers to me,
and I wouldn't mind feeling the same way about 65,536 and 131,072. Also,
counting powers of two has the virtue of getting hard before getting boring.

As I counted I noticed a neat pattern starting at the higher numbers.  I thought
it was pretty cool and  maybe even a bit easier than
doubling the numbers in the standard fashion (once you're out of memorized
territory anyway).

From what I've seen of this pattern it only works at and above 1024 
(2<sup>10</sup>) so
that's what I'll focus on.

The Pattern
---

Take the number 1024 and split it into two parts, 1000 and 24. Keep on doing this:

    1000 and 24
    2000 and 48
    4000 and 96
    8000 and 192

There's an interesting relationship between the thousands digit and the rest,
do you see it yet?

What if I represent it like this:

    1000 + (25 - 1)
    2000 + (50 - 2)
    4000 + (100 - 4)
    8000 + (200 - 8)

You can just keep on going, doubling both numbers and subtracting the thousands
digit from the other number. But what does this look like if you generalize it one
step more...?

The Formula
---

Where `x` represents the thousands digits and is equal to 1 or greater (multiple
digits work fine but substituting 0 in doesn't end up making any sense):

    (x * 1000) + ((25 * x) - x)

An interesting benefit is that now you can answer the question "Okay, `64kB`... 64 thousand
and _how many_ bytes?" 

Well using our formula it is `(25 * 64) - 64` bytes, but that's easier to do
with rounder numbers so let's multiply `25` by `4` and divide `64` by `4` to get
`100 * 16`.  Way easier, that's `1,600`. Now the subtraction: `1,600 - 64 =
1,536`. The answer is 64 thousand and `1,536` bytes, or `65,536` bytes.  For
those like me who were wondering, that's 2<sup>16</sup>!

In Closing
---

I feel like this formula is only partway to somewhere - sure it's a neat pattern but
it is a bit awkward. I'd love to hear about any more cool patterns or neat
mathematical tricks, if you know any and would like to share!
