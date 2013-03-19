---
layout: post
title: Vim as an IDE
description: Using several plugins to make vim's functionality approach that of an IDE.
---

(**\*\*Old post alert\*\*** This is an old post I dug up from sometime around college)

[Two](http://i.imgur.com/8Yopn.png) [screenshots](http://i.imgur.com/pZtNP.png).

In my linux class last year, I was introduced to vim, and I've been fairly impressed with its powerful text-editing capabilities. What I didn't know is that it really can just about replace an IDE.

What features does an IDE have that make it more useful than most text editors?

Group 1

 * Being able to jump to the definition of a variable, function, class etc.
 * Autocompletion of variables, functions, classes etc.
 * Outline of a class, with variables and functions
 * Project explorer
 * Syntax highlighting

Group 2

 * Compile-time error checking
 * Step by step debugger

Group 3

 * Refactoring across projects
 * Automatic insertion of language specific code (ex: imports needed in Eclipse, generate getters and setters in java, files that Visual Studio makes when you use the visual editor, templates in Dreamweaver)

Okay, that's quite a bit. Vim can do the first group perfectly, can sort of do the second group ( depending on language), and can't do the last one. At least as far as I know, anyway.

Just recently I've been interested in editing php with vim, so here's a few things I found out:

[PHP parser check and running current file with the CLI](http://weierophinney.net/matthew/archives/164-Vim-Productivity-Tips-for-PHP-Developers.html)

Add the following to your .vimrc:

    " run file with PHP CLI (F5)
    autocmd FileType php noremap <F5> :w!<CR> :!$HOME/bin/php %<CR>

    " PHP parser check (F4)
    autocmd FileType php noremap <F4> :!usr/bin/php -l <CR>

I changed the mappings to the function keys because &lt;c-m&gt; corresponds to &lt;return&gt; as well, which I find annoying because I like to use CTRL+ movement keys for changing windows.

[Project](http://www.vim.org/scripts/script.php?script_id=69)

Just like what it sounds like, it opens a side window that keeps track of all your folders and files in the project that you specify. Has lots of neat features, including a project-wide search and replace, which can be useful. I suggest adding this to your .vimrc to have a 'Project toggle' rather than typing :Project each time:

    nmap <silent> <F10> <plug>ToggleProject

Also, since by default folds have a hideous color scheme in my theme, I added this to my .vimrc to change that a bit.

    hi Folded ctermbg=0 ctermfg=3
    hi FoldColumn ctermbg=0 ctermfg=3

Once you've got the Project plugin installed, \C while in the Project
window is the command that you'll probably want to use to help set up
your first project (this took me a while). Also, make sure to use the help file that comes with the script (:help project).

[Taglist](http://www.vim.org/scripts/script.php?script_id=273)

This opens up a side window that shows a list of classes, variables and functions in all files that you have open at the time. I set a a taglist toggle in my .vimrc file with this line:
nmap &lt;silent&gt; &lt;f12&gt; :TlistToggle&lt;cr&gt;

In taglist.vim I changed a couple of the values so that it would look a bit better:

    let Tlist_Use_Right_Window = 1 "so that it doesn't conflict with the project plugin
    let Tlist_WinWidth = 25 "make it a bit slimmer
    let Tlist_Enable_Fold_Column = 0 "Disable the fold column (it's thick and not too useful for me)
    let Tlist_Inc_Winwidth = 0 "Don't attempt to resize my terminal - this may vary depending on how you are running vim


[Using ctags well](http://weierophinney.net/matthew/archives/134-exuberant-ctags-with-PHP-in-Vim.html)

This lets you jump around to the definition of functions, classes etc. Just follow his instructions.

**Autocompletion**

&lt;c-x&gt; + &lt;c-?&gt; when in insert mode. You get a list of letters that can be used in place of ? when you press . Some notable ones are:

 * `<c-f>` File - Autocompletes file names
 * `<c-n>`, `<c-p>` Forward, Back respectively
 * `<c-i>` Path - keywords in the current and included files
 * `<c-o>` Omni - Omni complete.

Many thanks and full credit to Matthew Weier O'Phinney, whose [blog post](http://weierophinney.net/matthew/archives/164-Vim-Productivity-Tips-for-PHP-Developers.html) started me on all of this and indeed is the source of many of these tips.

I didn't cover debugging, I'll save it for a later post maybe. If you're interested, go ahead and [search the scripts](http://www.vim.org/scripts/script_search_results.php?keywords=debug&amp;script_type=&amp;order_by=downloads&amp;direction=descending&amp;search=search) for yourself.

Also, here's some [vim tips and tricks](http://stackoverflow.com/questions/95072/what-are-your-favorite-vim-tricks)!
