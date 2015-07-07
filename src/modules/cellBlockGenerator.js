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

	var CellBlockGenerator = function(parameterObj) {
		
		var that = {};
		
		that.width = parameterObj.width;
		that.height = parameterObj.height;
		that.cellSize = parameterObj.cellSize;
		that.colors = parameterObj.colors;
		that.className = "svg-wrapper";
		that.COLOR_RANGE_MULTIPLICATOR = 2;
		that.helpers = new Helper();
		
		
		
		that.render = function() {
			var 
				cellRange,
				cells;
			
			cellRange = this.determineRowsAndColumns(that.width, that.height);
			that.createScales(cellRange);
			that.createColorScale();
			that.determineColors();
			that.createSVG(this.width, this.height);
			that.drawBackground(cellRange);
			cells = this.createCellData(cellRange);
			that.renderGrid(cells);
		};

			
		that.createSVG = function(width, height) {
			$('body').append(that.el);
			that.svg = d3.select(that.el).append('svg')
				.attr('width',width)
				.attr('height', height)
				.attr("transform", "translate(100,100)");
		 };
		
		
		that.determineColors = function() {
		
			if (that.colors.length === 0) {
				that.getColor = that.helpers.createRandomRGB;
			}
			else {
				that.getColor = that.getCustomColor;
			}
		};

		that.createColorScale = function() {
			
			var 
				numOfColors = that.colors.length,
				colorDomain = _.range(0, numOfColors * that.COLOR_RANGE_MULTIPLICATOR),
				colorRange = that.colors;

			that.colorScale = d3.scale.linear()
								.domain([0,1])
								.range(colorRange);
		};
		
		that.getCustomColor = function() {
		
			var numOfColors = that.colors.length;
			var multiplicator = numOfColors * that.COLOR_RANGE_MULTIPLICATOR;
			var ranNum = Math.random();
			
			return that.colorScale(ranNum);
		};
				
				
		that.determineRowsAndColumns = function(width, height) {
			var range = {};
			var numberOfCellsPerRow = Math.floor( width / (that.cellSize + 1) ) ;
			var numberOfCellsPerColumn =  Math.floor( height / (that.cellSize + 1) );
			range.horizontal = _.range(numberOfCellsPerRow);
			range.vertical = _.range(numberOfCellsPerColumn);
			
			return range;
		};
					
					
		that.drawBackground = function(range) {
						
			that.bgWidth = ((range.horizontal.length - 2) * (that.cellSize + 1));
			that.bgHeight = ((range.vertical.length - 2) * (that.cellSize + 1));
			
			that.background = this.svg.append('rect')
			.attr('width',that.bgWidth)
			.attr('height', that.bgHeight)
			.style('fill', that.helpers.createRandomRGB())
			.attr('opacity', 0.175)
			.attr('transform', 'translate('+ that.cellSize + ',' + that.cellSize + ')');
		};
						
						
		that.changeBackgroundColor = function() {
			that.background.transition().duration(1500).style('fill', that.getColor());
		};
							
							
		that.createScales = function(range) {
			var xDomain = range.horizontal;
			var xRange = _.map(xDomain, function(position) {
				return position * that.cellSize + position * 1;
			});
			var yDomain = range.vertical;
			var yRange = _.map(xDomain, function(position) {
				return position * that.cellSize + position * 1;
			});
			
			that.xScale = d3.scale.ordinal()
			.domain(xDomain)
			.range(xRange);
			
			that.yScale = d3.scale.ordinal()
			.domain(xDomain)
			.range(xRange);
			
		};
								
								
		that.createCellData = function(range) {
			var that = this;
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
									
									
		that.renderGrid =  function(cells) {
			that.svg.selectAll('placeholder')
			.data(cells)
			.enter()
			.append('rect')
			.attr('class', function(d) {return d.class;})
			.attr('width', function(d) {return d.width;})
			.attr('height', function(d) {return d.height;})
			.attr('x', function(d) {return that.xScale(d.x);})
			.attr('y', function(d) {return that.yScale(d.y);})
			.attr('opacity',0.8)
			.style('fill', function(d) {return d.color;});
			
		};
										
										
		that.changeColorOfACell = function(){
			
			var cellToBeChanged = that.pickRandomCell();
			var cellColor = that.getColor();
			
			d3.select(cellToBeChanged)
				.transition().duration(800)
				.style('fill', cellColor);
		};
											
											
		that.validateCoordinates = function(coordinates) {
			
			if (coordinates.x < 0) {
				coordinates.x *= -1;
			}
			if (coordinates.y < 0) {
				coordinates.y *= -1;
			}    
			if (coordinates.x > (that.bgWidth + that.cellSize +1)) {
				coordinates.x -= (that.cellSize*2 + 2);
			}
			if (coordinates.y > (that.bgHeight + that.cellSize +1)) {
				coordinates.y -= (this.cellSize*2 + 2);
			}
			
			return coordinates;
		};
												
												
		that.moveCell = function(direction) {
				
			var
				cellToBeMoved,
				coordinates,
				selectedCell;
			
			cellToBeMoved = that.pickRandomCell();
			coordinates = that.helpers.getNewCoordinates(cellToBeMoved);
			coordinates = that.validateCoordinates(coordinates);
			selectedCell = d3.select(cellToBeMoved);
			
			
			if (direction === 'x') {
				selectedCell.transition("x").duration(2000)
				.attr('x', coordinates.x)
				.each("start", lock)
				.each("end", unlock);
			} else {
				selectedCell.transition("y").duration(2000)
				.attr('y', coordinates.y)
				.each("start", lock)
				.each("end", unlock);
			}
			
			function lock (d, i) {
				d3.select(this).classed({ cell: false, locked: true}); 
			}
			
			function unlock (d, i) {
				d3.select(this).classed({cell: true, locked: false});
			}  
		};
				
				
		that.pickRandomCell = function() {
			
			var cells = d3.selectAll('.cell')[0]; 
			var numOfCells = d3.selectAll('.cell')[0].length;
			var randomNumber = Math.floor(Math.random() * numOfCells);
			var randomCell = cells[randomNumber];
			
			return randomCell;
		};
		
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	
	return CellBlockGenerator;

});