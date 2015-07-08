
define(['jquery',
	'underscore'
], function($,_) {

	
	var Helper = function() {
	
		var that = {};
			
		that.createRandomRGB = function() {
			var 
				red = Math.floor((Math.random() * 256)).toString(),
				green = Math.floor((Math.random() * 256)).toString(),
				blue = Math.floor((Math.random() * 256)).toString(),
				rgb = 'rgb(' + red + ',' + green +',' + blue +')';
				
			return rgb;
		};
		
		
		that.getPlusOrMinus = function() {
			var sign = Math.random() < 0 ? -1 : 1;
			return sign;
		};
		
				
		return that;
	};
	
	return Helper;
		
});

