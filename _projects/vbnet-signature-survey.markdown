---
layout: project
date: 2010-12-16
title: VB.Net Signature Survey
languages: Ruby
summary: Ward Cunninham's Signature Survey, adapted for vb.net, with some enhancements of my own.
github: vbnet_signature_survey
thumbnail: /img/mockscreenshot.png
screenshots: 
videos:
---

A signature survey is a simple text-only visualization of source code, pioneered
by Ward Cunningham. The original was written with Java in mind and essentially
strips out all characters except for curly braces and semicolons.

What use is it?
--------------------------

First I'll summarize a few of the neat points of Ward Cunningham's original [Signature Survey](http://c2.com/doc/SignatureSurvey/):

 * Quick visual summary of code of a file by file basis.
 * Easy to distinguish classes with low and high complexity 
 * Helps represent a few defining characteristics of classes in an easy to remember form
 
Here are a few improvements that I ended up implementing in mine:

 * Distinction between methods, if statements, and loops. 
 * Tell at a glance how big methods tend to be in a single file; whether there are lots of small ones or a few huge ones 
 * Added color to mitigate the amount of syntactic noise and help to highlight possible trouble points.
 * Include a line count and method count before the signature line of a file.
 
 And a few things that were adjusted because of language and personal preference:
 
 * VB.NET doesn't use curly braces or semicolons in the same way as c-style languages, so alternatives will have to be used.
 * In the 'detailed view' of each file, I prefer to see just a list of methods, with parameter types and the return type, instead of the whole file. I can open the whole file in my main editor, but having a list of the methods in the order they are in is quite helpful. 


Examples
--------------------------

[(Click for full size)](http://i.imgur.com/KRRQl.png)

[![Picture of a VB.NET signature survey page](http://i.imgur.com/KRRQl.png)](http://i.imgur.com/KRRQl.png)

**TODO:** find an existing open source project to generate a working example from so I can link to an actual page instead of just having a screenshot
