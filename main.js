!(function(){
    'use strict';
    // Get some photos from Flickr for the demo
    $.ajax({
        url: 'http://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.interestingness.getList',
            api_key: '7617adae70159d09ba78cfec73c13be3'
        },
	    dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (data){
        var gallery = $('#gallery'), url;
        $.each(data.photos.photo, function (index, photo) {
            url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
			var img = $('<img>').prop({'src': url + '_s.jpg', 'title': photo.title});
            var link = $('<a rel="gallery">')
						.append( img )
						.prop('href', url + '_b.jpg')
						.appendTo(gallery);
			// lazy show the photos one by one
			img.on('load', function(e){
				setTimeout( function(){ link.addClass('loaded'); }, 20*index);
			});
        });
		
		// finally, initialize photobox on all retrieved images
		$('#gallery').find('a').photobox({ thumbs:true });
    });
})();