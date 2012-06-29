JQuery Retina Display Plugin
============================

Enables retina display graphics (@2x) to any jQuery powered website. Pings out into the images directory and sees if there's an @2x asset. If it exists, it swaps out the original for the hi-rez version. If not, it moves on to the next image.

Usage:

	$(document).retina();
	
Requires @2x image, and height and width of the image to be constrained either by the original img tag or the surrounding div.

More info here: [mrballistic.com/retina](http://www.mrballistic.com/retina "retina.js main page") 