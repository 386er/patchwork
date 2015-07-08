define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/helpers',
	'modules/cellBlockCollection'
], function($,
	Backbone,
	_,
	d3,
	Helper,
	CellCollection
	) {

	var CellBlockView = function() {
		
		var that = {};
		that.className = "svg-wrapper";
		that.helpers = new Helper();
		
		
		that.render = function() {
			var 
				cellRange,
				cells;
			
			cellRange = that.collection.determineRowsAndColumns();
			that.createScales(cellRange);
			that.createSVG(that.width, that.height);
			that.drawBackground(cellRange);
			cells = that.collection.createCellData(cellRange);
			that.renderGrid(cells);
		};

			
		that.createSVG = function(width, height) {
			$('body').append(that.el);
			that.svg = d3.select(that.el).append('svg')
				.attr('width',width)
				.attr('height', height)
				.attr("transform", "translate(100,100)");
		 };
												
		that.drawBackground = function(range) {
						
			that.bgWidth = ((range.horizontal.length - 2) * (that.cellSize + 1));
			that.bgHeight = ((range.vertical.length - 2) * (that.cellSize + 1));
			
			that.background = that.svg.append('rect')
			.attr('width',that.bgWidth)
			.attr('height', that.bgHeight)
			.style('fill', that.helpers.createRandomRGB())
			.attr('opacity', 0.175)
			.attr('transform', 'translate('+ that.cellSize + ',' + that.cellSize + ')');
		};
						
						
		that.changeBackgroundColor = function() {
			that.background.transition().duration(1500).style('fill', that.helpers.createRandomRGB());
		};
							
							
		that.createScales = function(range) {
			var xDomain = range.horizontal;
			that.xDomain = xDomain;
			var xRange = _.map(xDomain, function(position) {
				return position * that.cellSize + position * 1;
			});
			var yDomain = range.vertical;
			that.yDomain = yDomain;
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
								
																	
		that.renderGrid =  function(cells) {
			that.svg.selectAll('placeholder')
			.data(cells)
			.enter()
			.append('rect')
			.attr('class', function(d) {return d.class;})
			.attr('id', function(d) {return d.id})
			.attr('width', function(d) {return d.width;})
			.attr('height', function(d) {return d.height;})
			.attr('x', function(d) {return that.xScale(d.x);})
			.attr('y', function(d) {return that.yScale(d.y);})
			.attr('opacity',0.8)
			.style('fill', function(d) {return d.color;});
			
		};
										
										
		that.changeColorOfACell = function(){
			
			var cellToBeChanged = that.pickRandomCell();
			var cellColor = that.helpers.createRandomRGB();
			
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
			if (coordinates.x > d3.max(that.xDomain)) {
				coordinates.x -= 1;
			}
			if (coordinates.y > d3.max(that.yDomain)) {
				coordinates.y -= 1;
			}
			
			return coordinates;
		};
												
												
		that.moveCell = function(direction) {
				
			var
				coordinates,
				cellToBeMoved = that.collection.getRandomCellModel(),
				cellID = '#' + cellToBeMoved.get('id'),
				selectedCell = d3.select(cellID);

			coordinates = that.getNewCoordinates(cellToBeMoved);
			coordinates = that.validateCoordinates(coordinates);
			cellToBeMoved.set({'x':coordinates.x})
			cellToBeMoved.set({'y':coordinates.y})
			
			if (direction === 'x') {
				selectedCell.transition("x").duration(2000)
				.attr('x', that.xScale(coordinates.x))
				.each("start", lock)
				.each("end", unlock);
			} else {
				selectedCell.transition("y").duration(2000)
				.attr('y', that.yScale(coordinates.y))
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
		

		that.getNewCoordinates = function(cell) {
			
			var
				coordinates = {},
				cellSize = cell.get('cellSize'),
				currentX = cell.get('x'),
				currentY = cell.get('y');
				
			coordinates.x = currentX + that.helpers.getPlusOrMinus();
			coordinates.y = currentY + that.helpers.getPlusOrMinus();
			
			return coordinates;
		};	
				
		that.pickRandomCell = function() {
			
			var 
				cells = d3.selectAll('.cell')[0], 
				numOfCells = d3.selectAll('.cell')[0].length,
				randomNumber = Math.floor(Math.random() * numOfCells),
				randomCell = cells[randomNumber];
			
			return randomCell;
		};
		
		
		that.getColorScale = function() {
			return that.colorScale;	
		};
		
		
		that.assignCollection = function(collection) {
			that.collection = collection;
			that.width = that.collection.getWidth();
			that.height = that.collection.getHeight();
			that.cellSize = that.collection.getCellSize();
		};
		
		
		
		
		
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	
	return CellBlockView;

});