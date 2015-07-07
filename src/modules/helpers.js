
define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {

	
	var Helper = function() {
	
		var that = {};
			
		that.createRandomRGB = function() {
			var red = Math.floor((Math.random() * 256)).toString();
			var green = Math.floor((Math.random() * 256)).toString();
			var blue = Math.floor((Math.random() * 256)).toString();
			var rgb = 'rgb(' + red + ',' + green +',' + blue +')';
			return rgb;
		};
		
		
		that.getPlusOrMinus = function() {
			var sign = Math.random() < 0.5 ? -1 : 1;
			return sign;
		};
		
		that.getNewCoordinates = function(cell) {
			
			var 
			coordinates,
				cellSize,
				currentX,
				currentY,
				change;
			
			coordinates = {};
			cellSize = cell.width.baseVal.value;
			currentX = cell.x.baseVal.value; 
			currentY = cell.y.baseVal.value;
			change = this.getPlusOrMinus() * (cellSize + 1 );
			coordinates.x = currentX + change;
			coordinates.y = currentY + change;
			
			return coordinates;
		};
		
		return that;
	};
	
	return Helper;
		
});

