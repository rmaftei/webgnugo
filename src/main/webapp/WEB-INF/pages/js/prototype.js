var CROSS = "<div class='cross'><div class='vr-line'></div><hr class='hr-line'></hr></div>";
var TOP_LEFT = "<div class='cross'><div class='vr-line-top-margin'></div><hr class='hr-line-top-left-margin'></hr></div>";
var TOP_RIGHT = "<div class='cross'><div class='vr-line-top-margin'></div><hr class='hr-line-top-right-margin'></hr></div>";
var BOTTOM_LEFT = "<div class='cross'><div class='vr-line-bottom-margin'></div><hr class='hr-line-bottom-left-margin'></hr></div>";
var BOTTOM_RIGHT = "<div class='cross'><div class='vr-line-bottom-margin'></div><hr class='hr-line-bottom-right-margin'></hr></div>";
var LEFT_MARGIN = "<div class='cross'><div class='vr-line-margin'></div><hr class='hr-line-left-margin'></hr></div>";
var RIGHT_MARGIN = "<div class='cross'><div class='vr-line-margin'></div><hr class='hr-line-right-margin'></hr></div>";
var TOP_MARGIN = "<div class='cross'><div class='vr-line-top-margin'></div><hr class='hr-line-center'></hr></div>";
var BOTTOM_MARGIN = "<div class='cross'><div class='vr-line-bottom-margin'></div><hr class='hr-line-center'></hr></div>";


function generateLine(line, size) {
	var output = "<div class='line'>";

	for (var column = 0; column < size; column++) {
		if(isTopLeft(line, column)) {
			output += TOP_LEFT;
		} else if(line == 0 && column == size - 1) {
			output += TOP_RIGHT;
		} else if(line == size - 1 && column == 0) {
			output += BOTTOM_LEFT;
		} else if(line == size - 1 && column == size - 1) {
			output += BOTTOM_RIGHT;
		} else if(column == 0) {
			output += LEFT_MARGIN;
		} else if(column == size - 1) {
			output += RIGHT_MARGIN;
		} else if(line == 0) {
			output += TOP_MARGIN;
		} else if(line == size - 1) {
			output += BOTTOM_MARGIN;
		}
		else {
			output += CROSS;
		}
	}

	output += "</div>"

	return output;
}

function isTopLeft(line, column) {
	return line == 0 && column == 0;
}

function generateGrid(gridSize) {
	var grid = '';
	
	for(var i = 0; i < gridSize; i++) {
		grid += generateLine(i, gridSize);
	}
	
	return grid;
}

$(document).ready(function() {
	$('div#goban').append(generateGrid(13));
});