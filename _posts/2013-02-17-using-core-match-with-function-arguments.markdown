---
layout: post
title: Using core.match with function arguments
---

Recently I started learning Clojure (partly in preparation for its upcoming
section in [my tour through seven languages](http://nickknowlson.com/projects/seven-languages-in-seven-weeks/)) and I
ran into a problem when trying to pattern match on arguments. You
can't just pass them straight to `match` and expect to follow most 
current online examples. The types aren't quite right! You'll
always get back the `:else` clause or some other odd behaviour.

Function arguments in Clojure are of type `ArraySeq` ([and for good reason](http://stackoverflow.com/questions/8205209/why-argument-list-as-arrayseq)),
but using core.match with Seqs requires a different (slightly more verbose)
syntax. The simplest way to make things work as you might expect is to convert
the arguments into a Vector first.

Solution
---

Use [vec](http://clojuredocs.org/clojure_core/clojure.core/vec) to convert the
function arguments into a vector before passing them to `match`:

{% highlight clojure %}
(use '[clojure.core.match :only (match)])

(defn -main [& args]
    (println (match (vec args)
        ["echo" word] word
        :else "Invalid command")))
{% endhighlight %}

Alternate Solution
---

If spending time and processing power just to spare some syntax is
unappealing to you, then I'd recommend using core.match's [Seq Matching](https://github.com/clojure/core.match/wiki/Overview) capabilities directly:

{% highlight clojure %}
(use '[clojure.core.match :only (match)])

(defn -main [& args]
    (println (match [args]
        [(["echo" word] :seq)] word
        :else "Invalid command")))
{% endhighlight %}

Note the differences:

 1. `(match [args]` - The arguments are *wrapped* in a vector instead of being
   *converted* to one
 2. `[(["echo" word] :seq)] word` - Any pattern `x` is enclosed like so: `[(x :seq)]`


Hope this has helped!
