//-------------------------------------------------------------------------------------
//
// THIS FILE IS NOT A PART OF THE PLUGIN, IT'S ONLY FOR THE DEMO
//
//-------------------------------------------------------------------------------------
!(function(){
    'use strict';

	var numOfImages = window.location.search ? parseInt(window.location.search.match(/\d+$/)[0]) : 80;
    // Get some photos from Flickr for the demo
    $.ajax({
        url: 'http://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.interestingness.getList',
			per_page : numOfImages,
            api_key: 'b51d3a7c3988ba6052e25cb152aecba2' // this is my own API key, please use yours
        },
	    dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (data){
        var gallery = $('#gallery'),
			loadedIndex = 1;
        $.each( data.photos.photo, function(index, photo){
			// http://www.flickr.com/services/api/misc.urls.html
            var url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret,
				img = new Image();
			
			// lazy show the photos one by one
			img.onload = function(e){
				var link = document.createElement('a'),
				li = document.createElement('li')
				link.href = this.largeUrl;
				link.appendChild(this);
				li.appendChild(link);
				gallery[0].appendChild(li);
			
				setTimeout( function(){ 
					li.className = 'loaded'; 
				}, 20*loadedIndex++);
			};
			
			img['largeUrl'] = url + '_b.jpg';
			img.src = url + '_t.jpg';
			img.title = photo.title;
        });

		// finally, initialize photobox on all retrieved images
		$('#gallery').photobox('a', { thumbs:true }, callback);
		function callback(){
			console.log('loaded!');
		};
    });
})();