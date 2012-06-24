---
layout: project
date: 2010-12-14
title: Craigslist Highlighter
languages: Javascript
summary: Helps find and highlight specific traits of apartments on craigslist
github: craigslist_highlighter
thumbnail: /img/projects/craigslist/thumb.png
screenshots: 
 - ["/img/projects/craigslist/list_before.png", "/img/projects/craigslist/list_before_thumb.png", "'Before' view of the search page"]
 - ["/img/projects/craigslist/list_after.png", "/img/projects/craigslist/list_after_thumb.png", "'After' view of the search page"]
 - ["/img/projects/craigslist/item_before.png", "/img/projects/craigslist/item_before_thumb.png", "'Before' view of a single listing"]
 - ["/img/projects/craigslist/item_after.png", "/img/projects/craigslist/item_after_thumb.png", "'After' view of a single listing"]
 - ["/img/projects/craigslist/options_off.png", "/img/projects/craigslist/options_off_thumb.jpg", "What Craigslist Highlighter looks like when disabled"]
 - ["/img/projects/craigslist/options_on.png", "/img/projects/craigslist/options_on_thumb.jpg", "What Craigslist Highlighter looks like when enabled"]

videos:
---

This script helps highlight things you're looking for when searching for apartments or
housing on craigslist. 

It will follow each link on the search page and
scan the individual listing's body page for the keywords you enter. When it
finds them, it will retrieve them, append them to the end of the individual
listing, and highlight them green or red for positive or negative.  You can pick
the terms you are looking for at the top of the page, the script integrates its
options panel into the search ui for craigslist.

See the screenshots above for an example of what this looks like. 

Install
---

This script is only supported for Firefox and Greasemonkey at the moment. 

 1. Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
 2. Either just click [here](/projects/craigslist-highlighter/craigslist_highlighter.user.js) or go to the [userscripts page](http://userscripts.org/scripts/show/136937) for
    Craigslist Highlighter and click the Install button in the top right corner.

Features
---

 * Location, location, location! Finds good and bad locations based on your
   input and highlights the listing in green or red. It highlights the location
   in a deeper green or red for easier scanning.
 * If you enter a maximum (and optionally minimum) value, it will put emphasis
   on the lower prices and fade out the higher ones. For best results enter both
   minimum and maximum values.
 * Finds months and highlights them in blue.
 * Fields where you can enter your own desirable traits, such as 'garden' or
   'skylight'. 
 * Checkboxes for other common desirable things, like fireplaces, balconies and
   dishwashers. These act just like predefined lists of  good and bad traits.
 * Smarter pet searching. If you check 'cats' it will search for a list of
   phrases involving cats and pets. It catches ones that would be filtered out
   by using the normal craigslist cats and dogs checkboxes, and can identify
   many bad matches (e.g. 'no cats')
 * Integrates smoothly into craigslist by emulating its style. Easy to disable.
