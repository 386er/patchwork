
define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/cellBlockGenerator'
], function($,
	Backbone,
	_,
	d3,
	CellBlockGenerator
	) {

	var pageloader = {

		init : function() {

			var cellBlock = new CellBlockGenerator({
				width: 970,
				height: 500,
				cellSize: 15,
				colors: []
			});
				
			cellBlock.render();

			window.setInterval(function(){cellBlock.changeColorOfACell();}, 1);
			window.setInterval(function(){cellBlock.changeColorOfACell();}, 1);
			window.setInterval(function(){cellBlock.changeColorOfACell();}, 1);
			window.setInterval(function(){cellBlock.changeColorOfACell();}, 1);
			window.setInterval(function(){cellBlock.changeBackgroundColor();}, 1500);
			window.setInterval(function(){cellBlock.moveCell('x');}, 50);
			window.setInterval(function(){cellBlock.moveCell('y');}, 50);
		}
	};

	return pageloader;

});