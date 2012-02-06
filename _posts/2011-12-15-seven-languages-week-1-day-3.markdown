---
layout: post
title: "Seven Languages: Week 1 (Ruby) - Day 3"
---

Day 3 is about metaprogramming: writing code that writes code. Now we are really
getting into the meat of Ruby, exploring some of the things that things that set
it apart from other languages.  Ruby has a powerful and varied toolset to make
metaprogramming easy and natural.  It gives you full control to tweak and patch
built in classes, and even makes it convenient. These tools(SYN) can combine
with its flexible syntax to let you create readable internal DSLs especially
easily.

<div class="interjection"><p>
(This article is part of a series of posts I am doing about my journey through the exercises of the book <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages In Seven Weeks</a>. The article previous to this one is <a href="/blog/2011/12/04/seven-languages-week-1-day-2/">Week 1 (Ruby) - Day 2</a>. For an overview see the <a href="/projects/seven-languages-in-seven-weeks/">project page</a>.)
</p></div>

Topics covered
---

This was a fairly quick week, with only a few topics and one homework question.
Not that this is a bad thing necessarily -- in the end it turned out to be a nice break
before the tough stuff really started. The main three topics in Day 3 were:
open classes, method\_missing, and mixins.

<h3>Open classes</h3>
In Ruby you have the power to modify or add to any class, even the built-in
ones. You can open up the String class and add a new method called `quack()`, or
redefine `size()` to return a random integer.  Using this power without
restraint can lead to pretty impressive messes of spaghetti code.  

Modifying existing classes at runtime in this way has become known as [monkey patching](http://en.wikipedia.org/wiki/Monkey_patch), and also (my favorite) [duck punching](http://www.ericdelabar.com/2008/05/metaprogramming-javascript.html):

> Well, I was just totally sold by Adam, the idea being that if it walks like a
> duck and talks like a duck, it’s a duck, right? So if this duck is not giving
> you the noise that you want, you’ve got to just punch that duck until it returns
> what you expect.
> -- Patrick Ewing

You've got to just *punch* that duck.

<h3>Method_missing</h3>
This special method gets called any time a method that doesn't exist is called.
If you implement it you have access to the name and arguments of the method that
was called. In the book, Bruce Tate gives an example of using this to create a
nice way to specify roman numerals. The result is that you can say `roman.X`,
`roman.III`, `roman.CXII`, etc.

I saw another example of `method_missing`'s power in Chapter 8 of
[The Ruby Programming Language](http://shop.oreilly.com/product/9780596516178.do),
where a simple DSL for generating html is created. This is what it looks like in
use:

{% highlight ruby %}
pagetitle = "Test Page for XML.generate"
XML.generate(STDOUT) do
  html do
    head do
      title { pagetitle }
      comment "This is a test"
    end
    body do
      h1(:style => "font-family:sans-serif") { pagetitle }
      ul :type=>"square" do
        li { Time.now }
        li { RUBY_VERSION }
      end
    end
  end
end
{% endhighlight %}

The implementation is fairly short: they create a basic XML class in only 53
well-commented lines. If you're interested, the code examples are available for
inspection from 
[David Flanagan's website](http://www.davidflanagan.com/rpl/). For convenience, 
here is a link [directly to this snippet of code](/RPL_XML.txt).

<h3>Mixins</h3>
Mixins are a way for a class to include code from a module inside itself.
Imagine a class including a module with a `Meow()` method. This would let you
call `Meow()` on any instance of that class. Combined with open classes and the
ability to add or change methods at runtime, this makes it easy to package and
use code that changes code. 

As I understand it, ActiveRecord in Rails is sort of the poster child for how
metaprogramming using mixins. It will customize your domain models at runtime
with many things, including  accessors using the column names from the database.
I admit I don't know a lot about the details of this area, but there is a whole
book dedicated to 
[metaprogramming in Ruby](http://pragprog.com/book/ppmetr/metaprogramming-ruby) 
that I plan on reading someday.

What was missing
---
Surprisingly, an entire category of useful metaprogramming tools are are almost
skipped right over in Day 3. There are a lot of great methods to interact with
and create methods and classes on the fly, and these are only given a passing
mention in one of the examples. Methods like `define_method`, `alias_method`,
the different versions of `eval`, or `methods.grep`.

With these tools Ruby gives you, without much effort you can do things like:
find all methods that have a name like `/check.*/`, systematically rename those
methods, and replace them with a method that does something (like logging) and
THEN execute the method.

Ola Bini has a great [post about metaprogramming in Ruby](http://ola-bini.blogspot.com/2006/09/ruby-metaprogramming-techniques.html) that talks about these techniques and more. I recommend it if you have been at all interested this post so far, it is well worth reading.

Highlights from exercises
---
There was not very much to do for the homework questions this week,
unfortunately, just one fairly short exercise. This day in particular was one
that I think could have used some really cool examples. Metaprogramming has a
lot of depth and exciting possibilities, and this chapter could have shown
that off more with better exercises.

Anyway, the exercise for this day shows some basic usage of `method_missing`. The existing
ActsAsCsv module is given to you to extend, so the most interesting bit of code
in the exercise is the definition of `method_missing` in CsvRow. It takes the
name of the method and attempts to return the rows from the column that has that name.

{% highlight ruby %}
def method_missing name, *args
    content_index = @header_row.index(name.to_s)
    return @content_row[content_index]
end
{% endhighlight %}

Full solution
---

Here is a nicely formatted version of my solution to the exercise from Day 3 of Ruby. The home of the following code is [on github](https://github.com/nickknw/seven-languages-in-seven-weeks/blob/master/week-1-ruby/day3.rb) with the other exercises.

<div id="formatted_solutions">

<h3>Do:</h3>

<h4><b>1.</b> Modify the CSV application to support an each method to return a CsvRow object. Use method_missing on that CsvRow to return the value for the column for a given heading.</h4>

{% highlight ruby %}
module ActsAsCsv

    def self.included(base)
        base.extend ClassMethods
    end

    module ClassMethods
        def acts_as_csv
            include InstanceMethods
        end
    end

    module InstanceMethods

        attr_accessor :headers, :csv_rows

        def read
            @csv_rows = []
            file = File.new(self.class.to_s.downcase + '.txt')
            @headers = file.gets.chomp.split(', ')

            file.each do |row|
                csv_contents = row.chomp.split(', ')
                @csv_rows << CsvRow.new(@headers, csv_contents)
            end
        end

        def initialize
            read
        end

        def each &block
            @csv_rows.each &block
        end

    end

    class CsvRow
        attr_accessor :header_row, :content_row

        def initialize(header_row, content_row)
            @header_row = header_row
            @content_row = content_row
        end

        def method_missing name, *args
            content_index = @header_row.index(name.to_s)
            return @content_row[content_index]
        end
    end
end

class RubyCsv 
    include ActsAsCsv
    acts_as_csv
end

csv = RubyCsv.new
csv.each {|row| puts row.one}
{% endhighlight %}

<h5>Output (given the sample file in my github repo)</h5> 

{% highlight bash %}
lions
han
chewbacca
r2 d2
anakin skywalker
leia organa
threepio
jawa
emperor palpatine
darth sidious
bail organa
vader
{% endhighlight %}

</div>

Next in this series: [Day 1 of Io](/blog/2011/12/18/seven-languages-week-2-day-1/)
