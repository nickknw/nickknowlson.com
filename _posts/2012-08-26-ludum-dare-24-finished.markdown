---
layout: post
title: Ludum Dare &#35;24 - Post-mortem
---

All right, that's it - for better or for worse, I'm out of time. There were
several major features in my game that I didn't finish, but the end result is
actually playable, so I consider it a wild success!

For a description of the game and screenshots, take a look at the project page here: [Conway's Revenge](http://nickknowlson.com/projects/conways-revenge/). Also, here is my official [Ludum Dare entry page](http://www.ludumdare.com/compo/ludum-dare-24/?action=preview&uid=15084).

What was missing
---

### Soundtrack

I originally had big plans for a procedurally generated soundtrack. It would be
based off the action currently happening on the screen - each tribe of cells
would be a different instrument/sound, and the x,y positions would determine the
pitch somehow. For example, if green was winning on the top side you might hear a lot of
higher pitched trumpets.

This turned out to be too ambitious for the limited time frame. I think
somewhere deep inside I knew this, and that's why I left it until last and
implemented other, more key, features first.

### Campaign

Campaign mode was the way I envisioned turning Conway's Revenge from more of a
toy into an actual game. I had in mind a set of puzzle levels where you face off against progressively more difficult enemy formations. You would have to experiment to find the fastest growing formations with a limited amount of cells to place.

Unfortunately it took me too long to finish everything else, and I never did get
started on this.

### Multiple colour placement and Scoring

Two more minor features I wanted to get done were: allowing the player to place
all 4 (or more) cell colours, and giving them a score. I had thought
about assigning points for each enemy cell you kill. This would give you more
points for longer games, so instead of rewarding you for dominating your
opponent it rewards you for judging the minimum amount of force necessary to
eliminate them, which I thought was kind of interesting.

What was accomplished
---

Quite a lot, considering how unfamiliar with my tools I was. I came up with a
modified live/die algorithm that I'm actually quite happy with. It suits
multiple players well, has a tendency to grow and eat up space, avoids
deadlock/tie scenarios, still allows for stable formations and spinners, and can
generate some lovely-looking 'explosions'.

I implemented two game modes, **Sandbox** and **Battle Royale**. They're pretty
similar internally, but different enough to the user that it makes sense to separate them in the UI.

I made a craptastic main menu and instruction screens. My idea was small enough
in scope that I had time to do these, which I'm happy about.

Finally, I learned a bit about flash development, and discovered that I actually quite
like it. Combined with a good game framework (I used [FlashPunk](http://flashpunk.net/)) it gives you a lot of help, and makes common tasks really easy.

What went wrong
---

I couldn't make up my mind on what set of development tools to use - I picked FlashPunk
on my third attempt. Before the competition started I decided to use Unity and
read few tutorials and created a small sample project. When I finally decided on
my idea I realized that it would be using exactly zero of Unity's strengths and
decided to change to something that made simple things easier. I initially tried
XNA, downloaded it and installed Visual Studio Express, etc. then suddenly
changed my mind because it would make running my game more of a pain and because
people in the Ludum Dare chat were talking about how much of a pain XNA was to
use.

In the end Flashpunk was a good choice (I _almost_ used Flixel, and may try
it next time), but it took me too long to make and I jumped into it several
hours late without knowing the slightest thing about using it. Not the best
strategy.

What went right
---

I took my time coming up with a good idea. I must have thrown out the first ten
or so I had for various reasons (unoriginal, not fun, too nebulous to
implement). I personally find this idea really interesting, and it was small
enough in scope that it fit my ability to implement it in less than 48 hours.

Another thing I did right was prioritizing tasks and cutting down on scope at
more or less the right times. I don't have a lot of half-done things left in the
game - what is there is mostly complete (with a few exceptions of course). I
focused on what I thought was possible to do within the limited time frame and
deferred the rest until later (after the competition, even).

Of course, if I had more experience, everything would look more polished and I might have been able to finish a few more of those missing bits, but the most important stuff got done. And that's what counts.

Closing thoughts
---

I really enjoyed doing this. Quite a few times over the last few years I've
watched this event happen and thought I wasn't skilled enough to take part. I'm
glad I decided to join in anyway. Before the event started I was full of
trepidation and self-doubt, but now that I'm finished I feel exhilarated,
exhausted, and I have a great feeling of accomplishment. I learned a lot of new
skills, had fun with other people (I recommend joining in on the IRC channel),
and I even have a cool new project to show off for it!

If you're on the sidelines trying to decide whether to take part next time, I
heartily recommend it. I know I will be.
