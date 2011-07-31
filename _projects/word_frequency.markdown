---
layout: project
date: 2010-12-16
title: Word Frequency
languages: Ruby
summary: Scripts to conveniently do word and string frequency analysis on source code.
github: word_frequency
thumbnail: /img/mockscreenshot.png
screenshots: 
videos:
---

**What use is it?**

It answers the questions "What is the most frequently occurring phrase that is 1 word long? What about 2 words long? What about 8?" etc. 

At low word counts, it mostly reflects the keywords of the language, as you would expect.  Once you get into higher counts is can reveal interesting things about patterns in the code, as well as code duplication.

**Examples**

TODO!


String Frequency 
---

This is actually just a slight variation of the previous tool. It only searches inside of string literals in the source code. It is good for finding out there are 89 occurrences of "SELECT * FROM" among other things.


