/*

retina jquery plugin

In the presence of a retina display, this script runs through all images, finds out if there's a 2x version, then swaps them out.

Requires a @2x version of the asset to sit next to the original asset, and height/width to be constrained either by the original img tag or the surrounding div.

So: 
	img.png
	img@2x.png
	
	<img src="img.png" height="100" width="100" />
	
	$(document).retina();

Copyright (c) 2012 Todd Greco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function( $ ) {
  $.fn.retina = function() {
  
    if (window.devicePixelRatio == 2) {
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