---
layout: project
date: 2010-12-16
title: Word Frequency
languages: Ruby
summary: Scripts to conveniently do word and string frequency analysis on source code.
github: word_frequency
thumbnail: /img/projects/word-frequency/thumb.png
screenshots: 
videos:
---

My word\_frequency script counts the number of times a each word (or phrase)
occurs in a programming project and produces a sorted list of which ones appear
most frequently. It helps identify simple trends and recurring patterns and is
most useful when trying to get familiar with a new codebase.

It answers the questions "What is the most frequently occurring phrase in this project that is 1 word long? What about 2 words long? What about 8?" etc. 

At low word counts, it mostly reflects the keywords of the language, as you would expect.  Once you get into higher counts it can reveal interesting things about patterns in the code, as well as code duplication.

Usage
---

{% highlight bash %}
cd my_csharp_project
ruby word_frequency.rb 1 cs

cd ../my_website
ruby word_frequency.rb 5 js
{% endhighlight %}

String Frequency 
---

I made an alternate version of the previous tool with one modification: it only searches inside of string literals in the source code. It is good for finding out there are 89 occurrences of `"SELECT * FROM"` (among other things). This version might be more useful for finding actual problems with code than the initial version.

It should ideally be merged with `word_frequency.rb` and be enabled with a flag,
but for now it works well enough as is.

Example
---

I'm going to use [DWSIM](http://sourceforge.net/projects/dwsim/) for this
example. DWSIM is an open source chemical process simulator written in VB.NET. I
am using it as an example for my VB.NET Signature Survey project because it is
big, open source, and written in VB.NET.  Since I already had it handy for that
one, I'll use it here too.

**Generate the word frequency files**

I started out by creating a convenience script for running word_frequency and
string_frequency multiple times:

{% highlight ruby %}
ext = ARGV[0]

(1..15).each {|num|
    puts `ruby -E 'iso-8859-1' word_frequency.rb #{num} #{ext}`
}

(1..15).each {|num|
    puts `ruby -E 'iso-8859-1' string_frequency.rb #{num} #{ext}`
}
{% endhighlight %}

For now I have to specify the external encoding when running the scripts, as the
default behavior for ruby is to assume the files are UTF-8. This ends up in my
script throwing an error when it gets to a character like &copy;. There must be
a better way to handle files with unknown encodings from within the script, but
for now this works.

So, I copied the above script along with `word_frequency.rb` and `string_frequency.rb` to the root of
the DWSIM project and ran it:

{% highlight bash %}
ruby runboth.rb vb
{% endhighlight %}

The script should have created a subdirectory called `wordfreq` in the current
directory. Let's see what's in there:

{% highlight bash %}
nick@Mengsk:~/prog/word_frequency/dwsim$ ls -lh wordfreq/
total 12M
-rw-r--r-- 1 nick nick  802K 2011-08-01 15:22 dwsim-01words.vb.wordfreq
-rw-r--r-- 1 nick nick  1.3M 2011-08-01 15:22 dwsim-02words.vb.wordfreq
-rw-r--r-- 1 nick nick  1.5M 2011-08-01 15:22 dwsim-03words.vb.wordfreq
-rw-r--r-- 1 nick nick  1.4M 2011-08-01 15:23 dwsim-04words.vb.wordfreq
-rw-r--r-- 1 nick nick  1.3M 2011-08-01 15:23 dwsim-05words.vb.wordfreq
-rw-r--r-- 1 nick nick  1.2M 2011-08-01 15:23 dwsim-06words.vb.wordfreq
-rw-r--r-- 1 nick nick  1.1M 2011-08-01 15:23 dwsim-07words.vb.wordfreq
-rw-r--r-- 1 nick nick 1014K 2011-08-01 15:23 dwsim-08words.vb.wordfreq
-rw-r--r-- 1 nick nick  950K 2011-08-01 15:23 dwsim-09words.vb.wordfreq
-rw-r--r-- 1 nick nick  873K 2011-08-01 15:23 dwsim-10words.vb.wordfreq
-rw-r--r-- 1 nick nick   75K 2011-08-01 15:23 dwsim-stringsonly-01words.vb.wordfreq
-rw-r--r-- 1 nick nick   34K 2011-08-01 15:23 dwsim-stringsonly-02words.vb.wordfreq
-rw-r--r-- 1 nick nick   26K 2011-08-01 15:23 dwsim-stringsonly-03words.vb.wordfreq
-rw-r--r-- 1 nick nick   22K 2011-08-01 15:23 dwsim-stringsonly-04words.vb.wordfreq
-rw-r--r-- 1 nick nick   20K 2011-08-01 15:23 dwsim-stringsonly-05words.vb.wordfreq
-rw-r--r-- 1 nick nick   20K 2011-08-01 15:23 dwsim-stringsonly-06words.vb.wordfreq
-rw-r--r-- 1 nick nick   19K 2011-08-01 15:23 dwsim-stringsonly-07words.vb.wordfreq
-rw-r--r-- 1 nick nick   19K 2011-08-01 15:23 dwsim-stringsonly-08words.vb.wordfreq
-rw-r--r-- 1 nick nick   18K 2011-08-01 15:23 dwsim-stringsonly-09words.vb.wordfreq
-rw-r--r-- 1 nick nick   17K 2011-08-01 15:23 dwsim-stringsonly-10words.vb.wordfreq
{% endhighlight %}

Looks correct to me. One interesting thing to note is the file size will tend to
decrease as the number of words in a phrase increases. 

**Analyze the generated files**

Now on to the interesting part!

I'm going to start at the top and work my way downwards.

In `dwsim-01words.vb.wordfreq`, the top few results are pretty predictable:

    Word Frequency List:
      72445: = 
      29758: As 
      19457: End 
      16282: * 
      14307: If 
      13604: + 
      12354: ' 
      11034: Dim 

Language keywords and operators. I'd worry if this wasn't the case.

Now for some more interesting results:

       7904: Public 
       1655: Private 
        743: Protected 

There are quite a lot more public functions than private ones. It doesn't say
much by itself, but learning the reason this project has this ratio could be
enlightening. It might be an indicator of poor encapsulation, or just that this
project has a large public API. 

       4969: Sub 
       3515: Function 

In VB.NET, a Sub is just a Function that doesn't return any values. In C-style
languages this is represented by using a `void` return type. This suggests that
most methods rely on modifying shared state to make their results known. It
might be explained by other things as well, but this is something I'd keep an
eye out for while reading through the code.

       5986: ByVal 
        491: ByRef 

In VB.NET you only need to use ByRef if you want to modify a passed in *value*
type (not reference type). It's not something that should usually happen a lot,
so seeing a lot of usages of ByRef could indicate a misunderstanding of what
that keyword actually does or an alarming amount of modifying value type
parameters.

As I go through the rest of the files, I am more looking for phrases that are
repeated a surprising number of times. I try and follow the phrases through the
files to see what they turn into and at one point they diverge into two phrases,
etc. Here are some notes I took as I went through:

    02

       1022: 'UPGRADE_WARNING: Couldn't resolve 
        362: CSng(X + 
        356: Width), CSng(Y 
        348: * 1.25 
        346: 2 + 
        334: Or Vids(i) 
        330: Return valor 
        325: (1 + 
        289: = temp1(2, 

Looks like some possible repeated formulas.

    03

       2192: i = 0 
       1521: = n + 
       1510: n + 1 
       1022: 'UPGRADE_WARNING: Couldn't resolve 
        356: Width), CSng(Y + 
        348: * 1.25 * 
        338: ^ 2 + 
        185: = temp1(2, 0) 
        143: Return valor * 
        138: Return valor / 

Not sure what the `i = 0`, `= n + 1` stuff is about yet, probably looping
related. Notice `Return valor` has started splitting. It continues to split into
fragments like `13: Return valor / 3600`.  I won't include it from here on but
it would be worth looking into why it does this.

    04
       1467: Looks up a localized 
       1387: Loop Until i = 
       1382: = i + 1 
       1022: 'UPGRADE_WARNING: Couldn't resolve default 
        598: i = 0 To 
        591: For i = 0 
        356: Width), CSng(Y + 
        257: RET_VKij(), RET_VTC, RET_VPC, RET_VW, 
        193: * 1.25 * Width), 
        106: > temp1(2, 0) Then 
         73: ^ 2 + (pt.Y 

Yep, looping related. I also start noticing `RET_VKij()` as the extraneous
repeated stuff thins out.

    05
       1467: Looks up a localized string 
       1022: Couldn't resolve default property of 
        180: T, P, RET_VMOL(fase1), RET_VKij(), RET_VMAS(fase1), 
        127: * 1.25 * Width), CSng(Y 
        106: 0) > temp1(2, 0) Then 
         40: alpha(i) = (1 + (0.37464 
         40: RET_VTC, RET_VPC, RET_VW, Me.RET_Hid(298.15, T, 
         36: (1 + 2 ^ 0.5) 

    06
       1467: ''' Looks up a localized string 
       1022: 'UPGRADE_WARNING: Couldn't resolve default property of 
        180: T, P, RET_VMOL(fase1), RET_VKij(), RET_VMAS(fase1), RET_VTC(), 
        127: * 1.25 * Width), CSng(Y + 
        110: Return Me.m_props.CpCvR("L", T, P, RET_VMOL(fase1), RET_VKij(), 
         40: alpha(i) = (1 + (0.37464 + 

`temp1(2, 0)` splits off into two here, for brevity's sake I won't continue
listing it here, although I think it would be worth a follow-up. First time I
notice `Return Me.m\_props`, which continues showing up for a while. and
eventually shows itself to be tied to `T, P, RET_VMOL`.

    07

Here the `'UPGRADE WARNING: Couldn't resolve default property of` splits off into things like: object pressure, temperature, tau, density, pSatW... I didn't record the full list. Looks like it probably is something generated by a tool. (Confirmed later)

    08
       1467: ''' Looks up a localized string similar to 
        180: T, P, RET_VMOL(fase1), RET_VKij(), RET_VMAS(fase1), RET_VTC(), RET_VPC(), RET_VCP(T), 
        110: Return Me.m_props.CpCvR("L", T, P, RET_VMOL(fase1), RET_VKij(), RET_VMAS(fase1), RET_VTC(), 
         30: alpha(i) = (1 + (0.37464 + 1.54226 * W(i) 

This is the last time we see `''' Looks up a localized string similar to` as a
high number, it splits off into many names. Definitely generated by a tool as
well. `1.25 * Width` has now split into at least two by now as well. It still
seems odd to me, so I would look into why later.

I'm going to skip a bit here and list the rest of the phrases that I would
follow up on (if I were really learning my way around this project).

    180: T, P, RET_VMOL(fase1), RET_VKij(), RET_VMAS(fase1), RET_VTC(), RET_VPC(), RET_VCP(T), RET_VMM(), RET_VW(), 
    110: Return Me.m_props.CpCvR("L", T, P, RET_VMOL(fase1), RET_VKij(), RET_VMAS(fase1), RET_VTC(), RET_VPC(), RET_VCP(T), RET_VMM(), 
     65: / 1000 * subst.ConstantProperties.Molar_Weight / Me.m_props.liq_dens_rackett(T, subst.ConstantProperties.Critical_Temperature, subst.ConstantProperties.Critical_Pressure, subst.ConstantProperties.Acentric_Factor, subst.ConstantProperties.Molar_Weight, subst.ConstantProperties.Z_Rackett, P, 
     30: alpha(i) = (1 + (0.37464 + 1.54226 * W(i) - 0.26992 

Might be some opportunities to get rid of magic numbers and refactor a bit.

**String-only**

The last section turned out quite a bit longer than I expected, fortunately this
one turned out much much shorter! In this project I saw nothing to call
attention to in the string frequency list.  There are maybe a couple of
opportunities to put some strings in a resource file, but that's it.

I will keep running the strings-only part in the future though, just because of
that one (small!) codebase where I really did find over a hundred uses of `"SELECT *
FROM"`.

