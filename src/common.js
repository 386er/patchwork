require.config({

	baseUrl: '.',
	paths: {
		jquery: 'library/jquery-1.11.3.min',
		underscore: 'library/underscore',
		backbone: 'library/backbone',
		d3: 'library/d3',
		colors: 'library/colors',
		colorpicker:'library/jqColorpicker'
	},
	shim:{
		d3:{
			exports:'d3'
		},
		colorpicker: {
			deps: ['jquery','colors'],
			exports: 'colorpicker'
		}
	}
});

require(['modules/app'], function(app) {
	
	app.init();

});