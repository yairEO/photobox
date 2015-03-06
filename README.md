photobox
========

A lightweight CSS3 image & video gallery that is pretty to look and and easy to use.

##[Demo page](http://dropthebit.com/demos/photobox/), [Blog post](http://dropthebit.com/500/photobox-css3-image-gallery-jquery-plugin/)

## Benefits
*    Lightweight! `jquery.photobox.js` is only 5kb (gziped & minified)
*    Silky-smooth, hardware accelerated, CSS3 transitions and animations (for better performance)
*    Support videos via iframe embedding
*    Stunning UI and user-friendly UX
*    Built so everything could be changed directly from the CSS
*    Observes DOM changes (if images were added/removed) and adapt accordingly
*    CSS3 pre-loader, tailored-made
*    Uses event-delegation on all thumbnails clicks (obviously...)
*    Uses HTML5 History to update location with the currently viewed image
*    The only image is a pre-loader animation for old IE. For the rest, no images at all!
*    Browsers support: IE8+ (graceful degradation), Modern browsers

## Functionality
*    Images/videos can be zoomed in and out with mousewheel and navigated using mousemove to move around
*    Bottom row of thumbnails, navigated by mouse movement, can be resized using the mousewheel
*    Shows the image's 'alt' or 'title' attribute text at the bottom
*    Indicate the index of the current viewed image in relation to the total, like so: (36/100)
*    Touch-friendly swipe left/right to change image. Swipe up/down to toggle the thumbnails stripe
*    Supports looping after first and last images
*    Auto-playing of images at a set interval (see "time" in Settings)
*    Supports keyboard keys for navigation and closing the gallery view
*    In case there was an error loading an image, a message is shown, which can be configured via CSS

## Basic use-case example:
    <div id='gallery'>
        <a href="http://www.somedomain.com/images/image1_large.jpg">
            <img src="http://www.somedomain.com/images/image1_small.jpg" title="photo1 title">
        </a>
        <a href="http://www.somedomain.com/images/image2_large.jpg">
            <img src="http://www.somedomain.com/images/image2_small.jpg" alt="photo2 title">
        </a>
        <a href="http://www.somedomain.com/images/image3_large.jpg">
            <img src="http://www.somedomain.com/images/image3_small.jpg" title="photo3 title">
        </a>
        <a href="http://www.somedomain.com/images/image4_large.jpg">
            <img src="http://www.somedomain.com/images/image4_small.jpg" alt="photo4 title" data-pb-captionLink='Google website[www.google.com]'>
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
        $('#gallery').photobox('li > a.family',{ time:0 }, callback);
        function callback(){
           console.log('image has been loaded');
        }

        // destroy the plugin on a certain gallery:
        //-----------------------------------------------
        $('#gallery').photobox('destroy');

        // re-initialize the photbox DOM (does what Document ready does)
        //-----------------------------------------------
        $('#gallery').photobox('prepareDOM');
    </script>

## Videos
    <div id='gallery'>
        ...
        <a href="http://www.youtube.com/embed/W3OQgh_h4U4" rel="video">
            <img src="http://img.youtube.com/vi/W3OQgh_h4U4/0.jpg" title="PEOPLE ARE AWESOME 2013 FULL HD ">
        </a>
        ...
    </div>

A video link must have the `rel` attribute with the value of `video`. The url of the link must be the iframe embed (youtube, vimeo, etc.) And inside you can put a thumbnail of the video (of course)

## Changing Effects Is Easy!
Advanced CSS users would know this, but for rest, you can just copy the below example code at the end of the photobox.css file:

    #pbOverlay .imageWrap img, #pbOverlay.hide .imageWrap img.prepare{ transform:rotateX(90deg); -webkit-transform:rotateX(90deg); -ms-transform:rotateX(90deg); }
    #pbOverlay.hide .imageWrap img{ transform:rotateX(-90deg); -webkit-transform:rotateX(-90deg); transform:none\9; opacity:.6; }

Basicly, I'm just playing with the image's style state; before it's appearance and during hiding, so you can do whatever here really.

## Custom Caption Links
you can add your own links along with the `title` or `alt` attributes texts, just add `data-pb-captionLink` to the image thumbnail:<br>
`data-pb-captionLink='Google website[www.google.com]'`


## Overriding defaults
It is always recommended not to touch the source code directly, because then you will have a version which is out-of-sync with any future version, and you might face some difficult merges with your own changes.
So, if you want to change some stuff, I would recommend creating another file, typically called `jquery.photobox.mod.js`. This good practice also applies for the CSS file.
### Example:
````
/*!
    photobox modifications,
    after it has been loaded
*/

(function(){
    "use strict";
    // adding a "userInfo" HTML to the overlay container:
    var userInfo = $('<div class="userInfo"><img><span></span></div>');

    var photoboxCallbacks = (function(){
        // do something
    })();

    // change defaults:
    window._photobox.defaults.time = 0;
    window._photobox.defaults.beforeShow = photoboxCallbacks.beforeShow;

    // append "userInfo" after DOMReady has been fired
    // (the overlay won't exist in the DOM before then)
    $(document).ready(function(){
        var overlay = $('#pbOverlay');

        // add class to the default close button
        $('#pbCloseBtn').addClass('btn');

        // append user info DOM structure
        overlay.append(userInfo);
    });
})();
````

## Settings


Name          | Info                                                                                                     | Default
------------- | -------------------------------------------------------------------------------------------------------- | -----------------------------
single        | if "true" - gallery will only show a single image, with no way to navigate                               | false
history       | Enable/disable HTML5 history using hash urls                                                             | true
time          | The time in milliseconds when autoplaying a gallery. Set as '0' to hide the autoplay button completely.  | 3000, minimum of 1000 allowed
autoplay      | should the gallery autoplay on start or not.                                                             | false
loop          | Loop back to last image before the first one and to the first image after last one.                      | true
thumb         | A relative path from the link to the thumbnail (if it's not inside the link)                             | null
thumbAttr     | A custom Attribute for the source of the thumbnail (for lazy-loaded thumbs)                              | 'data-src'
thumbs        | Show thumbs of all the images in the gallery at the bottom.                                              | true
counter       | Show the current image index position relative to the whole.                                             | (A/B)
zoomable      | Enable/Disable mousewheel zooming over images                                                            | true
hideFlash     | Hide flash instances when viewing an image in the gallery                                                | true
wheelNextPrev | change image using mousewheel left/right                                                                 | true
keys.close    | Key codes which close the gallery                                                                        | "27, 88, 67"
keys.prev     | Key codes which change to the previous image                                                             | "37, 80"
keys.next     | Key codes which change to the next image                                                                 | "39, 78"


