---
layout: post
title: "Seven Languages In Seven Weeks: Week 1 (Ruby) - Day 1"
---

Out of the seven languages in this book, Ruby is the one I was most familiar
with previously. It made for an easy start, and gave me a bit of momentum before
I started to tackle languages like Prolog. I'm appreciative of that, because
Prolog sure was a struggle for a while.

Day 1 of Week 1 was pretty basic - a bit of string manipulation and looping.
Ruby makes things like this very short and pretty. 

For example, being able to
repeat a string like: `"Nick " * 10` or loop like: 
`(1..10).each { |num| do_stuff(num) }` is great.

Here is my full code listing for the exercises from Day 1 of Ruby. The home of this piece of code is with the other exercises [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-1-ruby/day1.rb).

{% highlight ruby %}
# Find:
# 1. A method that substitutes a part of a string
puts "\nFind:"
puts "\n1."
puts "BAM".gsub "M", "TMAN"


# Do:
# 1. Print the string "Hello World"
puts "\nDo:"
puts "\n1."
puts "Hello World"

# 2. For the string "Hello, Ruby," find the index of the word "Ruby."
puts "\n2."
# literally:
p "Hello, Ruby,".index "Ruby."
# realistically:
puts "Hello, Ruby".index "Ruby"

# 3. Print your name ten times
puts "\n3."
puts "Nick " * 10

# 4. Print the string "This is sentence number 1," where the number 1 changes
# from 1 to 10
puts "\n4."
(1..10).each { |num| puts "This is sentence number #{num}" }

# Bonus: Write a program that picks a random number. Let a player guess the
# number, telling the player whether the guess is too low or too high.
puts "\nBonus:"

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


And the output:


{% highlight bash %}
$ ruby day1.rb

Find:

1.
BATMAN

Do:

1.
Hello World

2.
nil
7

3.
Nick Nick Nick Nick Nick Nick Nick Nick Nick Nick 

4.
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

Bonus:
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
