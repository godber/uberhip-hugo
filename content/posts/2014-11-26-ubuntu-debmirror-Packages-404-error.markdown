---
layout: post
title:  "Packages 404 Errors when using debmirror with ubuntu."
date:   2014-11-26 09:14:02
categories: ubuntu
---

This is one of those blog posts a person writes in hopes of eventually
finding it's contents via a Google search when an error is encountered
again.  So, hello Austin, you have found the answer to your 'debmirror
ubuntu package 404' error problem.

I have my own Ubuntu mirror for precise and trusty packages.  This
mirror is maintained with the `debmirror` program.  There are
occasionally situations where it starts reporting 404 errors for
`Packages` files when there are `Packages.gz` and `Packages.bz2` files
that it should be using.  These errors look like this when running my
mirror script:


{% highlight bash %}
...
[ 13%] Getting: dists/precise-updates/multiverse/binary-amd64/Packages
#** GET http://us.archive.Ubuntuuntu.com/ubuntu/dists/precise-updates/multiverse/binary-amd64/Packages ==> 404 Not Found
dists/precise-updates/multiverse/binary-amd64/Packages failed 404 Not Found
[ 13%] Getting: dists/precise-updates/multiverse/binary-i386/Packages
#** GET http://us.archive.ubuntu.com/ubuntu/dists/precisecise-updates/multiverse/binary-i386/Packages ==> 404 Not Found
dists/precise-updates/multiverse/binary-i386/Packages failed 404 Not Found
...
{% endhighlight %}

Well, this appears to be related to this `debmirror` issue:
https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=389894
which contains the critical information that the `.temp` directory in
the parent mirror directory can be cleared out:

{% highlight bash %}
rm -rf /data/www/ubuntu/.temp
{% endhighlight %}

Now rerun the mirror script and things should work again.
