var CROSS = "<div class='cross'><div class='vr-line'></div><hr class='hr-line'></hr></div>";

function generateLine(columns) {
	var line = "<div class='line'>";

	for (var i = 0; i < columns; i++) {
		line += CROSS;
	}

	line += "</div>"

	return line;
}
function generateGrid(gridSize) {
	var grid = '';
	
	for(var i = 0; i < gridSize; i++) {
		grid += generateLine(gridSize);
	}
	
	return grid;
}

$(document).ready(function() {
	$('div#goban').append(generateGrid(0));
});