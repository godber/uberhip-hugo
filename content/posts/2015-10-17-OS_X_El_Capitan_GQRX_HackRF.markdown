---
layout: post
title: "Installing GQRX on OS X 10.11, El Capitan, for HackRF."
date: 2015-10-17 10:14:02
categories: rtlsdr osx gqrx
---

I have recently created two [Homebrew](http://brew.sh/) formulas to help OS X
users install GQRX on 10.11, El Capitan. Fortunately most of the dependencies
are already available so all I had to do was create a formula for
[GQRX](http://gqrx.dk/) and [Osmosdr](http://sdr.osmocom.org/trac/wiki/GrOsmoSDR).
The source to these formulas can be found in my
[homebrew-godber](https://github.com/godber/homebrew-godber) github project.
Though to install GQRX all you have to do is setup my 'tap' and then install the
package as shown below:

```bash
brew tap godber/godber
brew update

# install some dependencies just in case
brew install gnuradio
brew install rtl-sdr
brew install hackrf

# install osmosdr and gqrx from my tap
brew install gnuradio-osmosdr
brew install gqrx
brew linkapps gqrx
```

Installing the Homebrew packages above are all I had to do to get both my HackRF
and NooElec RTL-SDR working with GQRX on El Capitan. Below is a screenshot of
GQRX running with my HackRF.

![GQRX Working with HackRF](/images/gqrx.png)

Unfortunately neither GQRX nor Gr-OsmoSDR can be included in Homebrew directly.
Since GQRX generates and installs an OS X .app it cannot be included. Perhaps
it should be made a Cask, but I can't find an official release of that .app so
I will stick with the formula for now. As for gr-osmosdr, apparently Homebrew
audits the packages they include and gr-osmosdr lacks enough GitHub "watches"
and "stars". See this [github issue](https://github.com/Homebrew/homebrew/pull/42783#issuecomment-148857954)
for reference.
