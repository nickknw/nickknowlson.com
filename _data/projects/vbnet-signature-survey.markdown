---
layout: project
date: 2010-12-16
title: VB.Net Signature Survey
languages: Ruby
summary: Ward Cunningham's Signature Survey, adapted for vb.net, with some enhancements of my own.
github: vbnet_signature_survey
thumbnail: /img/projects/vbnet-signature-survey/thumb.png
screenshots: 
 - ["/img/projects/vbnet-signature-survey/5.png", "/img/projects/vbnet-signature-survey/5thumb.jpg", "Sample VB.NET signature survey page"]
 - ["/img/projects/vbnet-signature-survey/4.png", "/img/projects/vbnet-signature-survey/4thumb.jpg", ""]
 - ["/img/projects/vbnet-signature-survey/3.png", "/img/projects/vbnet-signature-survey/3thumb.jpg", ""]
 - ["/img/projects/vbnet-signature-survey/2.png", "/img/projects/vbnet-signature-survey/2thumb.jpg", ""]
 - ["/img/projects/vbnet-signature-survey/1.png", "/img/projects/vbnet-signature-survey/1thumb.jpg", ""]

videos:
---

A signature survey is a simple text-only visualization of source code, pioneered
by Ward Cunningham. The original was written with Java in mind and essentially
strips out all characters except for curly braces and semicolons. Check out the
[interactive example](report/) to really get a feel for my version.

What use is it?
---

First I'll summarize a few of the neat points of Ward Cunningham's original [Signature Survey](http://c2.com/doc/SignatureSurvey/):

 * Quick visual summary of code of a file by file basis.
 * Easy to distinguish classes with low and high complexity 
 * Helps represent a few defining characteristics of classes in an easy to remember form
 
Here are a few improvements that I implemented in mine:

 * Distinction between methods, if statements, and loops. 
 * Tell at a glance how big methods tend to be in a single file; whether there are lots of small ones or a few huge ones 
 * Added color to mitigate the amount of syntactic noise and help to highlight possible trouble points.
 * Include a line count and method count before the signature line of a file.
 
 And a few things that were adjusted because of language and personal preference:
 
 * VB.NET doesn't use curly braces or semicolons in the same way as c-style languages, so alternatives will have to be used.
 * In the 'detailed view' of each file, I prefer to see just a list of methods, with parameter types and the return type, instead of the whole file. I can open the whole file in my main editor, but having a list of the methods in the order they are in is quite helpful. 

Usage
---

Move `vb_signature_survey.rb` to the root directory of your project, then run
it.

{% highlight bash %}
ruby vb_signature_survey.rb
{% endhighlight %}

Example
---

I searched around on github and sourceforge for a decent-sized vb.net project,
and ended up with [DWSIM](http://sourceforge.net/projects/dwsim/). DWSIM is an
open source chemical process simulator written in VB.NET.

I ran the script on this project and put up the results as an [interactive
example](report/). Try browsing around and imagine having it up beside the actual source
code in your editor of choice.
