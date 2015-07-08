
define(['jquery',
	'backbone',
	'underscore',
	'modules/cellBlockController'
], function($,
	Backbone,
	_,
	CellBlockController
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