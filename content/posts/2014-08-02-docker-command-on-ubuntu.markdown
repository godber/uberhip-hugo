---
layout: post
title: "Using update-alternatives to make docker.io accessible as docker."
date: 2014-08-02 07:14:02
categories: docker
---

I've seen some people ask about making the [Docker][docker] command
`docker.io` on Ubuntu work like it does in the examples: `docker`. I
found this inconvenient too, but fortunately, Ubuntu and Debian have
had a solution to this for a long time, it's called
[alternatives][alternatives]. In
this particular case, there is already an Ubuntu package called `docker`
which is why they are trying to de-conflict executable names by using
`docker.io` in the first place. Ironically, the original `docker`
package doesn't even contain an executable named `docker`. Or at least
it doesn't as of Ubuntu 14.04.

```bash
$ dpkg -L docker
/.
/usr
/usr/share
/usr/share/menu
/usr/share/menu/docker
/usr/share/doc
/usr/share/doc/docker
/usr/share/doc/docker/changelog.Debian.gz
/usr/share/doc/docker/README
/usr/share/doc/docker/copyright
/usr/share/man
/usr/share/man/man1
/usr/share/man/man1/wmdocker.1.gz
/usr/bin
/usr/bin/wmdocker
```

I don't fully understand the Ubuntu/Debian policies on package and
executable naming, but perhaps the use of `docker.io` is unnecessary.
Regardless, those of us who aren't concerned with building packages can
either simply soft link the `docker.io` command to `docker` or create
an alternative:

```bash
# Making a link
sudo ln /usr/bin/docker.io /usr/bin/docker

# Using Alternatives
sudo update-alternatives --install /usr/bin/docker docker \
 /usr/bin/docker.io 1
```

[docker]: https://www.docker.com/
[alternatives]: http://www.debian-administration.org/article/91/Using_the_Debian_alternatives_system
