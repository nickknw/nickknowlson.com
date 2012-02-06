---
layout: post
title: "Seven Languages: Week 1 (Ruby) - Day 1"
---

Out of the seven languages in this book, Ruby is the one I was most familiar
with previously. It made for an easy start, and gave me a bit of momentum before
I started to tackle languages like Prolog. I'm appreciative of that, because
Prolog sure was a struggle for a while.

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. This article is the first one in the series. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

Day 1 of Week 1 was pretty basic - a bit of string manipulation and looping.
Ruby makes things like this very short and pretty. 

For example, being able to
repeat a string like: `"Nick " * 10` or loop like: 
`(1..10).each { |num| do_stuff(num) }` is great.

Here is a nicely formatted version of my solutions to the exercises from Day 1 of Ruby. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-1-ruby/day1.rb) with the other exercises.  

<div id="formatted_solutions">

<h3>Find:</h3>

<h4><b>1.</b> A method that substitutes a part of a string</h4>

{% highlight ruby %}
puts "BAM".gsub "M", "TMAN"
{% endhighlight %}

<h5>Output:</h5>

{% highlight bash %}
BATMAN
{% endhighlight %}

<h3>Do:</h3>

<h4><b>1.</b> Print the string "Hello World"</h4>

{% highlight ruby %}
puts "Hello World"
{% endhighlight %}

<h5>Output:</h5>

{% highlight bash %}
Hello World
{% endhighlight %}

<h4><b>2.</b> For the string "Hello, Ruby," find the index of the word "Ruby."</h4>

{% highlight ruby %}
# literally:
p "Hello, Ruby,".index "Ruby."
# realistically:
puts "Hello, Ruby".index "Ruby"
{% endhighlight %}

<h5>Output:</h5>

{% highlight bash %}
nil
7
{% endhighlight %}

<h4><b>3.</b> Print your name ten times</h4>

{% highlight ruby %}
puts "Nick " * 10
{% endhighlight %}

<h5>Output:</h5>

{% highlight bash %}
Nick Nick Nick Nick Nick Nick Nick Nick Nick Nick 
{% endhighlight %}

<h4><b>4.</b> Print the string "This is sentence number 1," where the number 1 changes from 1 to 10</h4>

{% highlight ruby %}
(1..10).each { |num| puts "This is sentence number #{num}" }
{% endhighlight %}

<h5>Output:</h5>

{% highlight bash %}
This is sentence number 1
This is sentence number 2
This is sentence number 3
This is sentence number 4
This is sentence number 5
This is sentence number 6
This is sentence number 7
This is sentence number 8
This is sentence number 9
This is sentence number 10
{% endhighlight %}

<h4><b>Bonus:</b> Write a program that picks a random number. Let a player guess the number, telling the player whether the guess is too low or too high.</h4>

{% highlight ruby %}
random_number = rand(1000) + 1
guess = 0

while guess != random_number do
    print "Pick a number between 1 and 1000: "
    guess = gets.to_i
    puts "Too low!" if guess < random_number
    puts "Too high!" if guess > random_number
end

puts "Got it! It was #{random_number}"
{% endhighlight %}

<h5>Output:</h5>

{% highlight bash %}
Pick a number between 1 and 1000: 500
Too high!
Pick a number between 1 and 1000: 250
Too high!
Pick a number between 1 and 1000: 125
Too low!
Pick a number between 1 and 1000: 192
Too high!
Pick a number between 1 and 1000: 158
Too high!
Pick a number between 1 and 1000: 141
Too high!
Pick a number between 1 and 1000: 133
Too high!
Pick a number between 1 and 1000: 129
Got it! It was 129
{% endhighlight %}

</div>

Next in this series: [Day 2 of Ruby](/blog/2011/12/04/seven-languages-week-1-day-2/)
