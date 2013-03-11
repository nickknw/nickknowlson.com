---
layout: post
title: Command line file transfer
description: An article on how nice sshfs is and how to get it set up.
---

(**\*\*Old post alert\*\*** This is an old post I dug up from sometime around college)

I've gotten really used to using bash now, so it's always a drag when I want to
upload a file using sftp and lose my aliases, tab completion and everything else
from my .bashrc.  It's also more of a pain to copy directories.

I know there are a couple of replacements for the default sftp client, and up
until now, I had only tried lftp briefly.  It was better,but not quite what I
was looking for, and I found a bit awkward to use.  Although that part could
just be my own inexperience with it.

Anyway, I just stumbled upon a solution to my problem that is dead simple and ALSO lets me get all the power and ease of use my personalized bash environment.  Double win!  It's called <a href="http://fuse.sourceforge.net/sshfs.html">sshfs</a> (SSH FileSystem), it's in the Debian and Ubuntu package repos already, and I doubtless should have found it a long time ago.  It lets you mount a directory on your remote machine using ssh.  Magical!

In case you need it, here's a quick runthrough of what you need to get this working:

{% highlight bash %}
sudo aptitude install sshfs
sshfs user@host: localmountpoint
{% endhighlight %}

It defaults to your home directory as the point to mount, but if you want to you can specify a location after 'host:' like so:

{% highlight bash %}
sshfs user@host:/home/user/data/ localmountpoint
{% endhighlight %}

When you're done, you can unmount it with this command:

{% highlight bash %}
fusermount -u localmountpoint
{% endhighlight %}

If it a location that you use frequently like me, you could put an alias in your .bash\_aliases file so mounting is a single 'mount\_server' command, and unmounting is 'unmount\_server'.
Now when I want to upload something it's as painless as using cp or mv!
