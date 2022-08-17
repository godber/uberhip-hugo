---
layout: post
title:  "Experiment - Rogers Ruins"
date:   2017-12-09 06:28:00
categories: ar vr xr immersive virtualreality
---

Recently, in my free time, I've been playing with VR/AR related technologies.
My interests have mostly been building photorealistic scenes or models using
photogrammetry tools like [Agisoft Photoscan](http://www.agisoft.com/).  I may
start sharing more of my experiments, like this one, here in the future.

![Superstition Mountains]({{ site.url }}/images/south-central-superstitions.jpg)

In November 2017 friends and I went for a hike deep into the Superstition
Mountains in central Arizona to 600 year old Native American Indian ruins
called "Rogers Canyon Ruins" ([GPS route](https://hikearizona.com/map.php?QX=6728)).
I documented the hike with a few 360 photos along the trail using my 2016
Samsung Gear 360 camera and used Google's [Marzipano](http://www.marzipano.net/)
to create this [360 Tour of Roger's Trough Trail hike](http://uberhip.com/misc/rr/)

<div class="marzipano-embed">
  <iframe width="800" height="600" src="http://uberhip.com/misc/rr/" allowvr
  allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true"
  frameborder="0" onmousewheel=""></iframe>
</div>

Once we got to these ruins I took a couple hundred photos of the ruins from many
different angles.  I used some of these photos in Photoscan to generate a model
which I then cleaned up using [meshlab](http://www.meshlab.net/).  This was a
quick first effort at this kind of thing.  The work I did in meshlab was mostly
deleting extraneous parts and simplifying the model using the filter
`Simplification: Quadratic Edge Collapse Decimation (with texture)` so it was
small enough to load into other things, like [Sketchfab](sketchfab.com).

So, I got the final model rendered and uploaded and it turned out pretty good!

<div class="sketchfab-embed-wrapper"><iframe width="800" height="600"
     src="https://sketchfab.com/models/bd0910690fc24b478ee97d750c77b600/embed"
     frameborder="0" allowvr allowfullscreen mozallowfullscreen="true"
     webkitallowfullscreen="true" onmousewheel=""></iframe>

<p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;">
    <a href="https://sketchfab.com/models/bd0910690fc24b478ee97d750c77b600?utm_medium=embed&utm_source=website&utm_campain=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Rogers Ruins</a>
    by <a href="https://sketchfab.com/godber?utm_medium=embed&utm_source=website&utm_campain=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">godber</a>
    on <a href="https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campain=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a>
</p>
</div>

I was even able to "walk around" inside this model using my Oculus Rift by using
the Mozilla Nightly WebVR enabled build.

A few things I might like to do to improve the model is:

* Fill the holes
* Put in a fake sky dome or what ever people call that.
* Extend the model with lower resolution surroundings, perhaps using USGS 3DEP
  data like this 1/3rd arc second

Thanks for reading, hopefully you found this as interesting as I did!
