define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/helpers'
], function($,
	Backbone,
	_,
	d3,
	Helper
	) {
		
	var CellCollection = function(cellSize, colors) { 	
	

		var that = {};
		
		that.cellSize = cellSize;
		that.colors = colors;
		
		that.helpers = new Helper();
		
		that.determineRowsAndColumns = function(width, height) {
			var range = {};
			var numberOfCellsPerRow = Math.floor( width / (that.cellSize + 1) ) ;
			var numberOfCellsPerColumn =  Math.floor( height / (that.cellSize + 1) );
			range.horizontal = _.range(numberOfCellsPerRow);
			range.vertical = _.range(numberOfCellsPerColumn);
			
			return range;
		};
		
				
		that.createCellData = function(range) {
			that.determineColors();
			var cells = [];   
			_.each(range.vertical, function(i) {  
				_.each(range.horizontal, function(j){        
					var cellColor = that.getColor();
					var cellObject = {};
					cellObject.class = 'cell';
					cellObject.width = that.cellSize;
					cellObject.height = that.cellSize;
					cellObject.x = j;
					cellObject.y = i;
					cellObject.color = cellColor;
					cells.push(cellObject);
				});
			});
			return cells;
		};
		
		
		that.determineColors = function() {
		
			if (that.colors.length === 0) {
				that.getColor = that.helpers.createRandomRGB;
			}
			else {
				that.getColor = that.getCustomColor;
			}
		};
		
		
		that.getCustomColor = function() {
		
			var numOfColors = that.colors.length;
			var multiplicator = numOfColors * that.COLOR_RANGE_MULTIPLICATOR;
			var ranNum = Math.random();
			
			return that.colorScale(ranNum);
		};
		
		that = new (Backbone.Collection.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return CellCollection;

});	