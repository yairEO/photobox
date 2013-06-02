photobox
========

A lightweight CSS3 image & video gallery that is pretty to look and and easy to use.

##[Demo page](http://dropthebit.com/demos/photobox/), [Blog post](http://dropthebit.com/500/photobox-css3-image-gallery-jquery-plugin/)

## Benefits
*    Lightweight! Both script & CSS are no more than 10k each (minified, no gzip)
*    Silky-smooth, hardware accelerated, CSS3 transitions and animations (for better performance)
*    Support videos via iframe embedding
*    Stunning UI and user-friendly UX
*    Built so everything could be changed directly from the CSS
*    Observes DOM changes (if images were added/removed) and adapt accordingly
*    CSS3 pre-loader, tailored-made
*    Uses event-delegation on all thumbnails clicks (obviously...)
*    Uses HTML5 History to update location with the currently viewed image
*    The only image is a pre-loader animation for old IE. For the rest, no images at all!
*    Browsers support: IE8+ (graceful degradation), Modren browsers

## Funcionality
*    Images/videos can be zoomed in and out with mousewheel and navigated using mousemove to move around
*    Bottom row of thumbnails, navigated by mouse movment, can be resized using the mousewheel
*    Shows the image's 'alt' or 'title' attribute text at the bottom
*    Indicate the index of the current viewed image in relation to the total, like so: (36/100)
*    Touch-friendly swipe left/right to change image. Swipe up/down to toggle the thumbnails stripe
*    Supports looping after first and last images
*    Auto-playing of images at a set interval (see "time" in Settings)
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
		<a href="http://www.youtube.com/embed/W3OQgh_h4U4" rel="video">
			<img src="http://img.youtube.com/vi/W3OQgh_h4U4/0.jpg" title="PEOPLE ARE AWESOME 2013 FULL HD ">
		</a>
    </div>
    ...
    ...
    ...
    <script>
        // applying photobox on a `gallery` element which has lots of thumbnails links. Passing options object as well:
		//-----------------------------------------------
		$('#gallery').photobox('a',{ time:0 });
       
	    // using a callback and a fancier selector
		//----------------------------------------------
        $('#gallery').photobox('li > a.family',{ time:0 }), callback);
        function callback(){
           console.log('image has been loaded');
        }
		
		// destroy the plugin on a certain gallery:
		//-----------------------------------------------
		$('#gallery').data('_photobox').destroy();
		
		// re-initialize the photbox DOM (does what Document ready does)
		//-----------------------------------------------
		$('#gallery').photobox('prepareDOM');
    </script>
	
## How to put a video link
    <div id='gallery'>
		...
		<a href="http://www.youtube.com/embed/W3OQgh_h4U4" rel="video">
			<img src="http://img.youtube.com/vi/W3OQgh_h4U4/0.jpg" title="PEOPLE ARE AWESOME 2013 FULL HD ">
		</a>
		...
	</div>
	
A video link must have the `rel` attribute with the value of `video`. The url of the link must be the iframe embed (youtube, vimeo, etc.) And inside you can put a thumbnail of the video (of course)

## Changing effects is easy!
Advanced CSS users would know this, but for rest, you can just copy the below example code at the end of the photobox.css file:
    
    #pbOverlay .imageWrap img, #pbOverlay.hide .imageWrap img.prepare{ transform:rotateX(90deg); -webkit-transform:rotateX(90deg); -ms-transform:rotateX(90deg); }
    #pbOverlay.hide .imageWrap img{ transform:rotateX(-90deg); -webkit-transform:rotateX(-90deg); transform:none\9; opacity:.6; }

Basicly, I'm just playing with the image's style state; before it's appearance and during hiding, so you can do whatever here really.

## Settings
**history** (default: true)

    Enable/disable HTML5 history using hash urls

**time** (default: 3000) minimum 1000ms allowed

    The time in miliseconds when autoplaying a gallery. Set as '0' to hide the autoplay button completely.

**autoplay** (default: false)

    should the gallery autoplay on start or not.

**loop** (Default: 'true')

    Loop back to last image before the first one and to the first image after last one.
    
**thumbs** (Default: 'true') 

    Show thumbs of all the images in the gallery at the bottom.
   
**counter** (Default: 'true')

    Show the current image index position relative to the whole. Example (3,11). 
	
**zoomable** (Default: 'true')

    Enable/Disable mousewheel zooming over images
   
**hideFlash** (Default: 'true')

    Hide flash instances when viewing an image in the gallery.

**keys.close** (Default: "27, 88, 67")

    Key codes which close the gallery.

**keys.prev** (Default: "37, 80")

    Key codes which change to the previous image.

**keys.next** (Default: "39, 78")

    Key codes which change to the next image.
