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
		
	var CellCollection = function(parameterObj) { 	
	

		var that = {};
		that.helpers = new Helper();
		that.COLOR_RANGE_MULTIPLICATOR = 2;
		
		that.assignProperties = function(parameterObj) {
			that.width = parameterObj.width;
			that.height = parameterObj.height;
			that.cellSize = parameterObj.cellSize;
			that.colors = parameterObj.colors;			
		};
		
		that.determineRowsAndColumns = function() {
			var range = {};
			var numberOfCellsPerRow = Math.floor( that.width / (that.cellSize + 1) ) ;
			var numberOfCellsPerColumn =  Math.floor( that.height / (that.cellSize + 1) );
			range.horizontal = _.range(numberOfCellsPerRow);
			range.vertical = _.range(numberOfCellsPerColumn);
			
			return range;
		};
		
				
		that.createCellData = function(range) {
			that.determineColors();
			var cells = [];   
			_.each(range.vertical, function(i) {  
				_.each(range.horizontal, function(j){        
					var cellColor = that.helpers.createRandomRGB();
					var cellObject = {};
					cellObject.class = 'cell';
					cellObject.id = 'x' + j + 'y' + 'i' + Math.floor(Math.random() * 10000) ;
					cellObject.cellSize = that.cellSize;
					cellObject.width = that.cellSize;
					cellObject.height = that.cellSize;
					cellObject.x = j;
					cellObject.y = i;
					cellObject.color = cellColor;
					cells.push(cellObject);
				});
			});
			console.log(cells.length);
			that.add(cells);
			
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
		
		
		that.getRandomCellModel = function() {

			var 
				numOfModels = that.models.length, 
				ranIndex =  Math.floor(Math.random() * numOfModels);
				model = that.models[ranIndex],
				modelID = model.get('id'),
				rect = d3.select('#' + modelID);
			
			if (rect.attr('class') === 'cell') {
				return model;
			}
			
			return that.getRandomCellModel();
		};
		
		
		
		that.getCustomColor = function() {
		
			var numOfColors = that.colors.length;
			var ranNum = Math.random();
			
			return that.colorScale(ranNum);
		};
		
		that.getWidth = function() {
			return that.width;
		};
		
		that.getHeight = function() {
			return that.height;
		}
		
		that.getCellSize = function() {
			return that.cellSize;
		}
				
		that = new (Backbone.Collection.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return CellCollection;

});	