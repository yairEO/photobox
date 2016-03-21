photobox
========

A lightweight CSS3 image & video viewer that is pretty to look and and easy to use.


##[Demo page](http://yaireo.github.io/photobox/)


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

```html
<div id='gallery'>
    <a href="http://www.somedomain.com/images/image1_large.jpg">
        <img src="http://www.somedomain.com/images/image1_small.jpg"
            title="photo1 title">
    </a>
    <a href="http://www.somedomain.com/images/image2_large.jpg">
        <img src="http://www.somedomain.com/images/image2_small.jpg"
            alt="photo2 title">
    </a>
    <a href="http://www.somedomain.com/images/image3_large.jpg">
        <img src="http://www.somedomain.com/images/image3_small.jpg"
            title="photo3 title">
    </a>
    <a href="http://www.somedomain.com/images/image4_large.jpg">
        <img src="http://www.somedomain.com/images/image4_small.jpg"
            alt="photo4 title" data-pb-captionLink='Google website[www.google.com]'>
    </a>
    <a href="http://www.youtube.com/embed/W3OQgh_h4U4" rel="video">
        <img src="http://img.youtube.com/vi/W3OQgh_h4U4/0.jpg"
            title="PEOPLE ARE AWESOME 2013 FULL HD ">
    </a>
</div>
...
...
...
<script>
    // applying photobox on a `gallery` element which has lots of thumbnails links.
    // Passing options object as well:
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
```


## Videos

```html
<div id='gallery'>
    ...
    <a href="http://www.youtube.com/embed/W3OQgh_h4U4" rel="video">
        <img src="http://img.youtube.com/vi/W3OQgh_h4U4/0.jpg"
            title="PEOPLE ARE AWESOME 2013 FULL HD ">
    </a>
    ...
</div>
```

A video link must have the `rel` attribute with the value of `video`. The url of the link must be the iframe embed (youtube, vimeo, etc.) And inside you can put a thumbnail of the video (of course)


## Changing Effects Is Easy!

I designed Photobox (as an image viewer) to only show a single item at a time (image or video), and so, the changing between images works is that first the current image must transition itself "out",
and the javascript code will "listen" to that transition, and when it's over, the code will reset some things to their initial state, replace the item with the new one, and will trantision that new item
into view. The effects are done via CSS and are very easy to change!

The default transition is the the current image "grows" and fades out of view, and when it is completely gone, the new image will appear to grow, rotate until it is "flat" (a bit) and fade-in.
Every time there's an image change that is either next or previous, the `pbOverlay` element will have a class for that change 'next' or 'prev', so you can work with those to achieve an effect
like the images are moving to the sides, depending on the direction, for example, you can use this CSS snippet to achieve that:

```css
.pbHide .pbWrapper > *,
.pbHide .pbWrapper > .prepare{ opacity:0; transition:.2s ease-in; }

.pbWrapper > div,
.pbWrapper > img{
    transition:.2s ease-out;
    opacity: 1;
}

/*** when going to the next slide ***/
/* prepare next slide which will be shown */
.pbWrapper > *,
.pbHide.next .pbWrapper > .prepare{ transform:translatex(40%); }
/* prepare current slide which will "go away" */
.pbHide.next .pbWrapper > *{ transform:translatex(-40%);  }

/* when going to the previous slide */
.pbWrapper > *,
.pbHide.prev .pbWrapper > .prepare{ transform:translatex(-40%); }
.pbHide.prev .pbWrapper > *{ transform:translatex(40%); }
```


## Custom Caption Links

you can add your own links along with the `title` or `alt` attributes texts, just add `data-pb-captionLink` to the image thumbnail:

`data-pb-captionLink='Google website[www.google.com]'`


## Overriding defaults

It is always recommended not to touch the source code directly, because then you will have a version which is out-of-sync with any future version, and you might face some difficult merges with your own changes.
So, if you want to change some stuff, I would recommend creating another file, typically called `jquery.photobox.mod.js`. This good practice also applies for the CSS file.

### Example:

```js
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
```


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
captionTmpl   | A string which is the template of the photo caption                                                      | *long string*
zoomable      | Enable/Disable mousewheel zooming over images                                                            | true
hideFlash     | Hide flash instances when viewing an image in the gallery                                                | true
wheelNextPrev | change image using mousewheel left/right                                                                 | true
keys.close    | Key codes which close the gallery                                                                        | "27, 88, 67"
keys.prev     | Key codes which change to the previous image                                                             | "37, 80"
keys.next     | Key codes which change to the next image                                                                 | "39, 78"


