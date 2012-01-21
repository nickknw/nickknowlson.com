---
layout: post
title: "Seven Languages: Week 1 (Ruby) - Day 2"
---

Day 2 of Ruby covers collections, code blocks, classes and modules. I'm familiar
enough with these already in Ruby so in this case it will be hard to provide a
'learning the language' perspective. Instead I will try to highlight a few of
the parts of Ruby in this chapter that I particularly like.

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2011/11/27/seven-languages-week-1-day-1/">Week 1 (Ruby) - Day 1</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

Ruby has closures and first-class functions - code blocks are one way of
creating a Proc - an anonymous function. A Proc is almost but not quite a lambda
- there are [a few differences between them](http://www.robertsosinski.com/2008/12/21/understanding-ruby-blocks-procs-and-lambdas/),
and Ruby has a separate `lambda` method for creating those.

Ruby's arrays and hashes are very multipurpose: hashes are frequently used to
give a method named parameters; and arrays have built in methods so that they
can be used as queues, stacks, sets, and matrices.

Its syntax is consistent and pretty. Arrays are very rich, you can do ranges
(`[1..10]`), negative indexes (`"string"[1..-2]`), and there are convenience
methods for operations like push, pop, transpose, and set intersection. You have
the three basic list manipulating higher order function equivalents: map, filter, reduce (fold).

There are many useful methods you can call right off of number literals. One
common example is `times`, which takes a code block as a parameter and executes
it. This can sometimes be a nice way to express a loop: `4.times { puts "testing" }` or
`4.times { |i| puts i }`.

For anyone coming from C#, ruby's blocks can substitute for `using` in many
places, like when opening a file:

{% highlight ruby %}
File.open("tmp.txt", "r").each { |line|
    puts line
}
{% endhighlight %}

No need to worry about forgetting to `.close()` the file later on.

Here is my full code listing for the exercises from Day 2 of Ruby. The home of this piece of code is with the other exercises [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-1-ruby/day2.rb).

{% highlight ruby %}
# Find:
# 1. Find out how to access files with and without code blocks. What is the
# benefit of the code block?
puts "\nFind:"
puts "\n1."

file = File.open("tmp.txt", "w+")
file.puts "a spoonful is great but I'd rather have a bowl"
file.close

# safer, less erroro-prone, shorter, more readable
File.open("tmp.txt", "r").each { |line|
    puts line
}


# 2. How would you translate a hash to an array? Can you translate arrays to
# hashes?
puts "\n2."
scores = { gary: 5, nick: 11, ted: 8, the_dude:9 }
print "hash: "; p scores
print "array1: "; p scores.to_a
print "array2: "; p scores.to_a.flatten

scores_array1 = scores.to_a
print "array1 to hash again 1: "; p scores_array1.inject(Hash.new) { |memo, pair| memo[pair.first] = pair.last; memo }
print "array1 to hash again 2: "; p Hash[scores_array1]
scores_array2 = scores.to_a.flatten
print "array2 to hash again 1: "; p Hash[scores_array2]
print "array2 to hash again 2: "; p Hash[*scores_array2]
puts "Yup."

# 3. Can you iterate through a hash?
puts "\n3."
scores.each { |key, value| puts "key:'#{key}', value:'#{value}'" }
puts "Yup."

# 4. You can use Ruby arrays as stacks. What other common data structures to
# arrays support?
puts "\n4."
puts "queue/deque: "
deque = [].push("1").push("2")
deque.unshift("a").unshift("b")
p deque
puts deque.shift
puts deque.shift
puts deque.pop
puts deque.pop

puts "list: "
list = [1,2,3].insert(2, "c")
puts list
puts "removed: " + list.delete("c")

puts "(rudimentary) bag/set:"
bag = [1,2,3,3,4,5]
p bag
set = bag.uniq
other_set = [3,5]
p set
p set & other_set

puts "(rudimentary) matrix:"
matrix = [[1,2,3],[4,5,6],[7,8,9]]
p matrix
p matrix.transpose


# Do:
# 1. Print the contents of an array of sixteen numbers, four numbers at a time,
# using just each. Now, do the same with each_slice in Enumerable
puts "\nDo:"
puts "\n1."
sixteen_numbers = [*(1..16)]
sixteen_numbers.each do |number|
        p sixteen_numbers[((number-4)...number)] if number % 4 == 0
end

puts "and"

sixteen_numbers.each_slice(4) { |slice| p slice }


# 2. The Tree class was interesting, but it did not allow you to specify a new
# tree with a clean user interface. Let the initializer accept a nested
# structure with hashes and arrays. You should be able to specify a tree like
# this: {'grandpa' => {'dad' => 'child 1' => {}, 'child 2' => {} }, 'uncle' =>
# {'child 3' => {}, 'child 4' => {} } } }.

class Tree
    attr_accessor :children, :node_name

    def initialize(name, children=[])
        if name.respond_to?('keys') then
            root_node = name.first
            name = root_node[0]
            children = root_node[1]
        end
        
        if children.respond_to?('keys') then
            children = children.map {|child_name, grandchildren| Tree.new(child_name, grandchildren) }
        end

        @node_name = name
        @children = children
    end

    def visit_all(&block)
        visit(&block)
        children.each {|c| c.visit_all(&block)}
    end

    def visit(&block)
        block.call self
    end
end

tree_test = Tree.new("Ruby",
    [Tree.new("Reia"),
     Tree.new("MacRuby")] )

tree_test2 = Tree.new({"Ruby" =>
    {"Reia" => {},
    "MacRuby" => {}}
})

tree_test.visit_all { |node| p node.node_name }
tree_test2.visit_all { |node| p node.node_name }


# 3. Write a simple grep that will print the lines of a file having any
# occurrences of a phrase anywhere in that line. you will need to do a simple
# regular expression match and read lines from a file. (This is surprisingly
# simple in Ruby.) If you want, include line numbers.
def rbgrep(pattern, filename)
    regexp = Regexp.new(pattern)
    File.foreach(filename).with_index { |line, line_num|
        puts "#{line_num}: #{line}" if regexp =~ line
    }
end

rbgrep("guitar", "wikipedia_page.txt")

{% endhighlight %}

And the output:

    $ ruby day2.rb

    Find:

    1.
    a spoonful is great but I'd rather have a bowl

    2.
    hash: {:gary=>5, :nick=>11, :ted=>8, :the_dude=>9}
    array1: [[:gary, 5], [:nick, 11], [:ted, 8], [:the_dude, 9]]
    array2: [:gary, 5, :nick, 11, :ted, 8, :the_dude, 9]
    array1 to hash again 1: {:gary=>5, :nick=>11, :ted=>8, :the_dude=>9}
    array1 to hash again 2: {:gary=>5, :nick=>11, :ted=>8, :the_dude=>9}
    array2 to hash again 1: {}
    array2 to hash again 2: {:gary=>5, :nick=>11, :ted=>8, :the_dude=>9}
    Yup.

    3.
    key:'gary', value:'5'
    key:'nick', value:'11'
    key:'ted', value:'8'
    key:'the_dude', value:'9'
    Yup.

    4.
    queue/deque: 
    ["b", "a", "1", "2"]
    b
    a
    2
    1
    list: 
    1
    2
    c
    3
    removed: c
    (rudimentary) bag/set:
    [1, 2, 3, 3, 4, 5]
    [1, 2, 3, 4, 5]
    [3, 5]
    (rudimentary) matrix:
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

    Do:

    1.
    [1, 2, 3, 4]
    [5, 6, 7, 8]
    [9, 10, 11, 12]
    [13, 14, 15, 16]
    and
    [1, 2, 3, 4]
    [5, 6, 7, 8]
    [9, 10, 11, 12]
    [13, 14, 15, 16]
    "Ruby"
    "Reia"
    "MacRuby"
    "Ruby"
    "Reia"
    "MacRuby"
    15: bass) and Andre Olbrich (guitar) under the name Lucifer's Heritage. The band
    17: changes: Markus Dörk (guitar) and Thomen Stauch (drums) were replaced by
    48: Nightfall, bass guitar has been played by sessional member Oliver Holzwarth,
    55: orchestral backing and a consistent vocal and guitar layering throughout.[9]
    87: Blind Guardian's music features the staccato guitars and double bass drumming
    90: the guitar and vocal tracks, creates the impression of a vast army of musicians

Next in this series: [Day 3 of Ruby](/blog/2011/12/15/seven-languages-week-1-day-3/).
