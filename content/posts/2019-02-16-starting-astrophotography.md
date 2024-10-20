---
layout: post
title:  "Astrophotography - Getting Started"
date:   2019-02-16 06:28:00
categories: astrophotography
---

![m42 and m43 nebulae](/images/m42-large.png)

The above image is a smaller version of the first decent picture I took with my
recently acquired astrophotography setup.  It was taken on Feb 11th, 2019 from,
my driveway in Tempe, AZ, in the middle of the Phoenix, AZ metropolitan area.
The image is a composite of 19 x 30s exposures, stacked with the free Windows
program, [DSS](http://deepskystacker.free.fr/english/index.html), and a little
histogram tweaking in Photoshop.  The image is of the
[Orion nebula (M42)](https://en.wikipedia.org/wiki/Orion_Nebula) and
[M43](https://en.wikipedia.org/wiki/Messier_43).  More info and the full
resolution image can be found where I uploaded the image to
[Astrobin](https://www.astrobin.com/390498/0/).

This post is intended to explain what my setup is and what resources I used
to get started.  One of the first resources I looked at was probably the
[Astrophotography Subreddit](https://old.reddit.com/r/astrophotography/).
Their wiki, and specifically their
[DSO Imaging](https://old.reddit.com/r/astrophotography/wiki/what_telescope#wiki_dso_imaging)
page was very helpful.  Then I watched a bunch of YouTube videos, specifically
I learned quite a bit from [AstroBackyard](https://www.youtube.com/channel/UCn3npsPixgoi_xLdCg9J-LQ).
I also got a few books, ["The Astrophotography Manual"](https://www.amazon.com/Astrophotography-Manual-Practical-Scientific-Approach-dp-1138055360/dp/1138055360/)
being the best, though the other two I have are helpful as well.

## The equipment

My specific choice of equipment was influenced by AstroBackyard and I am pretty
sure I saw a picture on [Astrobin](https://www.astrobin.com) where they
shared all of the equipment they used, and I just went and saved that same
exact equipment in my Amazon cart for a while.  Then I watched and read some
more and finally fine tuned my choices, mostly from Amazon.  I do regret
not getting everything from a smaller independent shop.  I've been buying
accessories from the smaller shops with good luck.

So, what did I start off with?

* Mount
  * [SkyWatcher EQ6-R Pro](http://www.skywatcherusa.com/eq6-r-pro/)
* Telescope (OTA/Optical Tube Assembly)
  * [SkyWatcher ProED 120mm Refractor](http://www.skywatcherusa.com/product/proed-120mm-doublet-apo-refractor/)
* Camera
  * [Nikon D750](https://www.nikonusa.com/en/nikon-products/product/dslr-cameras/d750.html)
  * [Field Corrector](http://www.skywatcherusa.com/product/reducer-corrector-85x-for-proed-120/)
  * [Nikon Camera Adapter m48](http://www.skywatcherusa.com/product/nikon-camera-adapter-m48/)

I decided I wanted a DSLR camera instead of an Astrophotography only camera,
since I didn't have one already.  Had I already had a DSLR I might have bought
a dedicated Astrophotography camera.  Something cooled ... probably color, though
having a filter wheel WOULD be cool.

The setup can be seen below:

![Telescope setup](/images/telescope.jpg)

The camera, adapter and field corrector can be seen attached to the OTA below:

![Telescope zoom](/images/telescope-zoom.jpg)

## The Setup

Once I got the mount and scope I asked on the Cloudy Nights forums how one goes
about controlling everything with a computer, I 
[received lots of useful answers](https://www.cloudynights.com/topic/644409-eq6-r-pro-pc-connection/).
The most complete answer was from John D Upton who wrote excellent instructions
for connecting the mount to my Windows 10 PC.  I used his
[Basic ASCOM Control Connection Method](https://www.atm-workshop.com/synscan-pc-connect.html),
which just requires connecting a standard USB printer cable directly to the USB
port on the hand controller of the mount.  With this and another USB cable
going to the camera, I was able to control both the mount and the Nikon, which makes
basic control and imaging possible.  There are other options, as described by
John's post, but so far I've just used the hand controller and a USB cable.

## The Observations

The setup goes roughly as follows:

* Put out tripod, align it north.
* Polar align the mount using it's polar scope
* Attach the telescope and camera
* Connect camera and mount to the computer
* Attach power to the mount
* 2 or 3 star align the mount with the hand controller

Now I can control the mount and camera with the computer.  So far, I've used 
[Cartes du Ceil](https://www.ap-i.net/skychart/en/start) to control the mount,
which allows me to find and point to things on a sky chart.  But so far really
I've mostly just used the hand controller to point at a few easy things.  But
it was cool to click on something in Cartes du Ceil and have it slew to the
right spot and see the target in the pointing scope.

So far, I've taken images using [APT (Astro Photography Tool)](https://ideiki.com/astro/Default.aspx)
but I also have [SGP (Sequence Generator Pro)](http://mainsequencesoftware.com/Products/SGPro).
APT worked with the combination of equipment I had.  The LiveView with the Nikon
was a little puzzling and sometimes I couldn't get the exposure or focus quite right.
I managed to focus close enough through the Nikon's viewfinder, APT LiveView has to be
off to make sure the mirror is down.  Then I'd use the 
[APT Focus Aid](https://ideiki.com/astro/usersguide/focusing_aid.htm) tool
to try and minimize the FWHM of a selected star in the LiveView image.  It helps to
zoom into the image when doing this.  Then I'd take a few trial images and zoom
in and look around to see if the stars looked small enough.  Once I felt like I'd
got it worked out, I cloned one of their default plans in the
[Plan Editor](https://ideiki.com/astro/usersguide/dslr_mode_2.htm?ms=AAA%3D&st=MA%3D%3D&sct=Mzk3&mw=MjQw)
and made a new plan where I just set it up for 20 exposures at 30 seconds with
an ISO of 400 with quantity raw.  Then I fired away and took the lights.

I had done some imaging the previous night and noticed the vignetting so I
looked into taking some flats.  AstroBackyard recommended stretching  white
t-shirt over the lens and shooting at the horizon at dusk ... well ... I
didn't have the foresight to do so so I tried to illuminate it with a headlamp
from a distance so the illumination was somewhat even, but who knows.  I took
about 10 of those.

## The Post Processing

Like I said in the intro, I took this set of images:

* 1 Bias
* 19 x 30s Lights
* Some flats

and threw them into DSS and mostly followed the brief instructions on
[Stacking Deep Sky Objects](https://old.reddit.com/r/astrophotography/wiki/stacking_dsos)
from the Astrophotograpy SubReddit.  My results with DSS were much better
than the ones he shared.  Not sure why that is.  Maybe my flats worked
better.  Maybe my post processing in photoshop hid my problems more.

## The Future

Really, there's a lot to learn here.  I only have some parts of it barely
figured out.  For instance any given step above could be done with far
more detail and precision than I applied when obtaining the image shown above.
I'll be working on developing all of these skills as time goes on.

The next steps that I am thinking about are:

* Post processing with [PixInsight](http://pixinsight.com/) - I think this will give me more control
and provide enough detail that I'll have a better feel for what's going on
than I did just dumping images into DSS.
* Auto Guiding Scope - It's my understanding that even with a decent mount
you'll need a guide scope to take great long exposures (this is why I've only
taken 30s exposures).  I've got a guide scope and guide camera I'll be working
into the mix when I can.
* Use light pollution filter.
* More Bias Frames - [250 bias frames](http://dslr-astrophotography.com/shoot-bias-frames-dslr/), Wow!!
* Dark frames (do I need it with raws from the Nikon?)
* Learn how to properly polar align.
* Learn how to plate solve.
* Do it all from Linux.
* Get one of the Raspberry Pi things that do all this for you.
