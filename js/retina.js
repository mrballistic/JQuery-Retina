

/*
 * jQuery Retina - jQuery plugin for enabling retina display images
 *
 * Copyright (c) 2012 Todd Greco
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.mrballistic.com/retina
 *
 * Version:  1.0.2
 *
 */
 
 
 /*
 

 In the presence of a retina display, this script runs through all images in the document, finds out if there's a 2x version, and, if so, swaps them out.
 
 Requires a @2x version of the asset to sit next to the original asset, and height/width to be constrained either by the original img tag or the surrounding div.
 
 So: 
 	img.png
 	img@2x.png
 	
 	<img src="img.png" height="100" width="100" />
 	
 	$(document).retina();
 
 Certainly, this adds to the server connection load, but is very useful if you're not sure that there will be 2x assets available. If you're worried about load, just target a block inside of the document:
 $('#uprez').retina();
 
 
*/
 

(function( $ ) {
  $.fn.retina = function() {
  
    if ((window.devicePixelRatio == 2)||(screen.width > 1920)) {
		$('img').attr('src', function(e){
		
			var newImg = ""; // holds our path to the 2x asset
			var oldImg = $(this).attr('src'); // grabs image src
			
			oldImg = oldImg.split('.'); // splits against "."
			
			var partLength = oldImg.length; // how many parts are there?
			
			for(i=0; i<partLength; i++){ 
				
				if(i<partLength -1){
					newImg += oldImg[i]; // reassemble the front parts
				} else {
					newImg += "@2x." + oldImg[i]; // put on the tail
					
					if(oldImg[i]=="svg"){ // if there's an svg, we don't need to make an @2x version, do we
						newImg=oldImg;
					}
					
				}
			}

			var thisImg = $(this); // this, in this scope, refers to the img
			
			// do a quickie ajax query to see if the 2x asset exists
			$.ajax({
			    url:newImg,
			    type:'HEAD',
			    error:
			        function(){
			            //log('img does not exist');
			        },
			    success:
			        function(){
			          thisImg.attr('src', newImg);
			        }
			 });
		});
	}


  };
})( jQuery );