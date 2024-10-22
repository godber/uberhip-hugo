---
layout: post
title: "Warping Brien - Image Reprojection with Python OpenCV"
date: 2014-10-26 07:14:02
categories: python image-processing opencv
---

> NOTE: This post was converted from HTML generated from an Jupyter Notebook to
> markdown so it includes discussion of using Jupyter notebook, I left this
> language in the post itself.

# Image reprojection

My friend Brien is a bit of an artist and a bit of a tech nerd so he thought it
would be a great idea to make a timelapse video of him drawing. So he put the
[CHDK firmware](http://chdk.wikia.com/wiki/CHDK) on his Canon S90 camera and
set it up to take an exposure every 2-3 seconds. He reprojected the drawing
portion of the image back into a rectangle and made a video out of it. He
managed to do the original video using only [ImageMagick](http://www.imagemagick.org/)
command line tools. You can watch his
[Timelapse Drawing 1](https://www.youtube.com/watch?v=BPijRAK2NHg) on YouTube.

That worked out pretty well, but we thought it would also be cool to make a
video with both the original image containing Brien and the extracted drawing
image shown side by side. This would allow one to see the drawing progress and
the artist at work.

I thought this would be a good chance for me to do a little image manipulation in
Python, so I fired up my IPython notebook and make use of OpenCV. I started the
process off by working through and validating each step I wanted to perform,
beginning with standard imports and reading in the sample image.

```python
import numpy as np
from scipy import ndimage
import matplotlib.pyplot as plt
import cv2
from cvutil import url_to_array, color_flip
from pylab import rcParams

%matplotlib inline

# set the figsize and dpi globally for all images
rcParams['figure.figsize'] = (16, 16)
rcParams['figure.dpi'] = 300

# color_flip converts cv2 BGR image to numpy RGB image
brien_drawing = color_flip(cv2.imread('IMG_1482.JPG'))
```

Now that I have read in the sample image, I want to see what it looks like.
Note that below I place a `;` at the end of my call to `imshow()`, this
supresses the return value that the IPython Notebook automatically prints out for
every cell. We only care to see the image itself. I&#39;ll do this every time I use
`imshow()`.

```python
plt.imshow(brien_drawing);
```

![Brien](/images/brien1.png)

#### Defining Box

We are interested in extracting the region of this image that contains the
drawing. To do that I need to identify the corner coordinates of the drawing. I
was able to roughly pick them out from the image above but actually I wanted to
get slightly more accurate points. So I opened the image separately on the IPython
command line and showed the image with `plt.imshow()` so I could zoom in and get
more accurate coordinates for the corners. Recent versions of IPython have much
improved interactive widgets but I am unaware of anything that works as easily as
Matplotlib&#39;s `imshow()`.

I use the coordinates found above to define a
[NumPy float32 array](http://docs.scipy.org/doc/numpy/user/basics.creation.html)
that contains the original coordinates of the image corners: `orig_pts`. Then I
define the coordinates I want the original points to be mapped to: `dest_pts`.
The ordering here doesn&#39;t matter except that the orders must match in both
arrays. The transformation we define later will use both the orignal and
destination coordinates as the basis of the transformation, so the first element
of `orig_pts` will be transformed to the first element of `dest_pts`, the second
element of `orig_pts` will be transformed to the second element of `dest_pts` and
so on.

We will want the order of these coordinates for visualizing the region extracted
later, so the order is: top left corner, top right corner, bottom left corner and
bottom right corner.

```python
orig_pts = np.float32([[1184.91, 532.945], [1984.19, 725.804], [2089.56, 2079.8],
                       [2757.61, 1857.11]])
dest_pts = np.float32([[0, 0], [1520, 0], [0, 2000], [1520, 2000]])
```

#### Verifying Selected Box

Now, lets verify that the region we've defined by corner coordinates is actually
the region we are interested in. Below, I make a copy of the drawing, then use
[`cv2.line()`](https://docs.opencv.org/4.x/dc/da5/tutorial_py_drawing_functions.html)
to draw the box defined by the coordinates.

```python
brien_drawing_lines = brien_drawing.copy()
cv2.line(brien_drawing_lines, tuple(orig_pts[0]), tuple(orig_pts[1]), (255,0,0), 2)
cv2.line(brien_drawing_lines, tuple(orig_pts[1]), tuple(orig_pts[3]), (255,0,0), 2)
cv2.line(brien_drawing_lines, tuple(orig_pts[3]), tuple(orig_pts[2]), (255,0,0), 2)
cv2.line(brien_drawing_lines, tuple(orig_pts[2]), tuple(orig_pts[0]), (255,0,0), 2)

plt.imshow(brien_drawing_lines);
```

![Brien](/images/brien2.png)

#### Transforming and Extracting Drawing

The box above looks good, so I proceed with defining the transform using
`cv2.getPerspectiveTransform()` and then use that transform with
`cv2.warpPerspective` to project and extract an image of just the drawing.

```python
# Get perspective transform M
M = cv2.getPerspectiveTransform(orig_pts, dest_pts)
# warp image with M
drawing = cv2.warpPerspective(brien_drawing, M, (1520, 2000))
# show the image
plt.imshow(drawing);
```

![brien](/images/brien3.png)

That turned out to look pretty good. The left hand side is well defined but I
was off a bit on the top right corner and the right hand edge appears to not be
straight anyway. Also, since this is just one of 3000 images, I am not going to fine
tune anything based on this single image selection. I think I will call this
good enough.

#### Resizing Original

Since we want to put these two images back together and side by side, they have
to have the same height. So, below I resize the original image with `cv2.resize()`,
to be 2000 pixels high and 2667 pixels wide to preserve the aspect ratio.

```python
brien_drawing_smaller = cv2.resize(brien_drawing, (2667, 2000),
                                   interpolation=cv2.INTER_AREA)
plt.imshow(brien_drawing_smaller);
```

![brien](/images/brien5.png)

#### Cropping and Scaling the Final Image

The resultant image looks great, but the aspect ratio is suboptimal for
generating a video. Below we use the shape of the combined image and the desired
aspect ratio, 16:10, to compute then generate the `final_image`. I am going to crop
out the left hand side of this image since there is little action on that edge,
so first off, I will compute the left hand starting point of our `final_image`.

```python
h, w, d = combined_image.shape
starting_column = w - h * 16/10
print starting_column
>>987
```

Now, with the `starting_column` identified, I will display the cropped image.

```python
plt.imshow(combined_image[:,starting_column:,:]);
```

![brien](/images/brien6.png)

#### Wrap Up

So the image above is an example of what we&#39;d like a single frame to look
like. The next step is to clean this code up, and wrap it up in a function and
then run that on all the input images. I&#39;ll do this work later and it might
result in a future blog post.

If you&#39;re wondering about how I drafted this blog post inline with my Python
code then you should check out the
[IPython notebook (now Jupyter notebook)](https://jupyter.org/). Its great for
exactly this type of thing. For a broader sense of what it does you can check
out the [IPython presentation](https://github.com/desertpy/presentations/blob/master/ipython-godber/IPython_Presentation.ipynb) I gave to [DesertPy](http://desertpy.com) in the spring of 2014.
