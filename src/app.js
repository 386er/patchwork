(function () {

	var cellBlockOne = cellBlockGenerator({
		width: 970,
		height: 500,
		cellSize: 15,
		colors: []
	});

	cellBlockOne.render();

	window.setInterval(function(){cellBlockOne.changeColorOfACell();}, 1);
	window.setInterval(function(){cellBlockOne.changeColorOfACell();}, 1);
	window.setInterval(function(){cellBlockOne.changeColorOfACell();}, 1);
	window.setInterval(function(){cellBlockOne.changeColorOfACell();}, 1);
	window.setInterval(function(){cellBlockOne.changeBackgroundColor();}, 1500);
	window.setInterval(function(){cellBlockOne.moveCell('x');}, 50);
	window.setInterval(function(){cellBlockOne.moveCell('y');}, 50);

}());