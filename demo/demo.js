//-------------------------------------------------------------------------------------
//
// THIS FILE IS NOT A PART OF THE PLUGIN, IT'S ONLY FOR THE DEMO
//
//-------------------------------------------------------------------------------------
!(function(){
    'use strict';

	var numOfImages = window.location.search ? parseInt(window.location.search.match(/\d+$/)[0]) : 70,
		gallery = $('#gallery'),
		videos = [
			{
				title: "Victoria's Secret",
				url: "http://player.vimeo.com/video/8974462?byline=0&portrait=0",
				thumb: "http://b.vimeocdn.com/ts/432/699/43269900_100.jpg"
			},
			{
				title: "PEOPLE ARE AWESOME 2014",
				url: "https://www.youtube.com/embed/LVn8ei8d4iU",
				thumb: "http://img.youtube.com/vi/LVn8ei8d4iU/0.jpg"
			},
			{
				title: "Biting Elbows - 'Bad Motherfucker' Official Music Video",
				url: "http://player.vimeo.com/video/62092214?byline=0&portrait=0",
				thumb: "http://b.vimeocdn.com/ts/431/797/431797120_100.jpg"
			}
		];
		
    // Get some photos from Flickr for the demo
    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.interestingness.getList',
			per_page : numOfImages,
            api_key: 'b51d3a7c3988ba6052e25cb152aecba2' // this is my own API key, please use yours
        },
	    dataType: 'jsonp',
        jsonp: 'jsoncallback'
    })
	.done(function (data){
        var loadedIndex = 1, isVideo;
		
		// add the videos to the collection
		data.photos.photo = data.photos.photo.concat(videos);
		
        $.each( data.photos.photo, function(index, photo){
			isVideo = photo.thumb ? true : false;
			// http://www.flickr.com/services/api/misc.urls.html
            var url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret,
				img = document.createElement('img');
			
			// lazy show the photos one by one
			img.onload = function(e){
				img.onload = null;
				
				var link = document.createElement('a'),
					li = document.createElement('li');
					
				link.href = this.largeUrl;

				link.appendChild(this);
				if( this.isVideo ){
					link.rel = 'video';
					li.className = 'video'
				}
				li.appendChild(link);
				gallery[0].appendChild(li);
			
				setTimeout( function(){ 
					$(li).addClass('loaded');
				}, 25*loadedIndex++);
			};
			
			img['largeUrl'] = isVideo ? photo.url : url + '_b.jpg';
			img['isVideo'] = isVideo;
			img.src = isVideo ? photo.thumb : url + '_t.jpg';
			img.title = photo.title;
        });

		// finally, initialize photobox on all retrieved images
		$('#gallery').photobox('a', { thumbs:true, loop:false }, callback);
		// using setTimeout to make sure all images were in the DOM, before the history.load() function is looking them up to match the url hash
		setTimeout(window._photobox.history.load, 2000);
		function callback(){
			console.log('callback for loaded content:', this);
		};
    });
})();