photobox
========

A lightweight CSS3 image gallery that is pretty to look and and easy to use.

##[Demo page](http://dropthebit.com/demos/photobox/), [Blog post](http://dropthebit.com/500/photobox-css3-image-gallery-jquery-plugin/)

## BETA 1.5
Please switch to branch "1.5" and try out the new beta. I've re-wrote a LOT of the code, fixing bugs and adding support for autoplay.

## benefits
* Both the script & CSS are only 7k each (minified script, not gziped)
*    Uses silky-smooth, hardware accelerated, CSS3 transitions and animations (for better performance)
*   Pretty UI and easy UX
*   CSS3 pre-loader, tailored-made
*   The only image isa pre-loader animation for old IE. For the rest, no images at all!
*   Works also on IE8 and above, but clearly not as nice as in normal browsers
*   Uses event-delegation on all thumbnails events



## Funcionality

*    Images can be zoomed in and out with mousewheel and navigated using mousemove to move around
*    Bottom row of thumbnails, navigated by mouse movment
*    Shows the image's 'alt' or 'title' attribute text at the bottom
*    Indicate the index of the current viewed image in relation to the total, like so: (36/100)
*    Supports looping after first and last images
*    Supports keyboard keys for navigation and closing the gallery view
*    In case there was an error loading an image, a message is showen, which can be configured via CSS

## Basic use-case example:
    <div id='gallery'>
        <a href="http://www.somedomain.com/images/image1_large.jpg">
        	<img src="http://www.somedomain.com/images/image1_small.jpg" alt="photo1 title">
    	</a>
    	<a href="http://www.somedomain.com/images/image2_large.jpg">
    		<img src="http://www.somedomain.com/images/image2_small.jpg" alt="photo2 title">
    	</a>
    	<a href="http://www.somedomain.com/images/image3_large.jpg">
    		<img src="http://www.somedomain.com/images/image3_small.jpg" alt="photo3 title">
    	</a>
    	<a href="http://www.somedomain.com/images/image4_large.jpg">
    		<img src="http://www.somedomain.com/images/image4_small.jpg" alt="photo4 title">
    	</a>
    </div>
    ...
    ...
    ...
    <script>
    	$('#gallery a').photobox();
    </script>

## settings

**loop** (Default: 'true')

    Loop back to last image before the first one and to the first image after last one.
    
**thumbs** (Default: 'true') 

    Show thumbs of all the images in the gallery at the bottom.
   
**counter** (Default: 'true')

    Show the current image index position relative to the whole. Example (3,11). 
   
**hideFlash** (Default: 'true')

    Hide flash instances when viewing an image in the gallery.

**keys.close** (Default: "27, 88, 67")

    Key codes which close the gallery.

**keys.prev** (Default: "37, 80")

    Key codes which change to the previous image.

**keys.next** (Default: "39, 78")

    Key codes which change to the next image.
