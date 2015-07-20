
define(['jquery',
	'backbone',
	'underscore',
	'modules/cellBlockController',
	'colorpicker'
], function($,
	Backbone,
	_,
	CellBlockController,
	colorPicker
	) {

	var app = {

		init : function() {


			var cellBlockController = new CellBlockController();
			
			cellBlockController.initialize();
			cellBlockController.render();
		}
	};

	return app;

});