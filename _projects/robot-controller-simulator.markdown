---
layout: project
date: 2009-07-20
title: Robot Controller Simulator
languages: Java
summary: A multi-threaded Java application (server & client) that controls a simulated Lego MindStorms robot
github: Robot-Controller-Simulator
thumbnail: /img/mockscreenshot.png
screenshots: 
videos:
---

This was a project made by myself and a partner for one of our programming
courses. 

It is a two-part project: 

 * a server run from the command line that pretends to be a robot with
   sensors similar to to what you would find on a Lego Mindstorms robot.
 * a GUI application that, given the ip address, will connect to the
   server, then receive and display sensor information from it as well as
   enabling the user to give the server commands.

It shows off some neat things, like the sensor displays in the UI, and how each of the sensors runs in its own thread.

But, it is also an old project and it has some rough spots:

 * If you disconnect with the client, after 4 seconds the server will pause everything and wait for a new communication, up to a maximum of 15 seconds.  These settings are changeable in the util.Constants class.  
 * Some problem areas are when a client disconnects and tries to reconnect too soon, or if the client tries to connect with no server running.
 * The GUI is pretty awkward and confusing. 
 * It needs a serious refactoring pretty badly. Apparently when we wrote this
   we really liked  Singletons.

