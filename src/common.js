require.config({

	baseUrl: '.',
	paths: {
		jquery: 'library/jquery-1.11.3.min',
		underscore: 'library/underscore',
		backbone: 'library/backbone',
		d3: 'library/d3',
	},
	shim:{
		d3:{
			exports:'d3'
		}
	}
});

require(['modules/app'], function(pageloader) {
	
	console.log(pageloader);

	pageloader.init();

});