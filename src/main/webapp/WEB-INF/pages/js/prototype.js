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
	var margin = '';
	
	for (var column = 0; column < size; column++) {
		margin = setMargin(line, column, size);
		
		if(margin.length != 0) {
			output += margin;
			margin = '';
		}
		else {
			output += CROSS;
		}
	}

	output += "</div>"

	return output;
}

function setMargin(line, column, size) {
	var margin = "";
	
	if(line == 0 && column == 0) {
		margin += TOP_LEFT;
	} else if(line == 0 && column == size - 1) {
		margin += TOP_RIGHT;
	} else if(line == size - 1 && column == 0) {
		margin += BOTTOM_LEFT;
	} else if(line == size - 1 && column == size - 1) {
		margin += BOTTOM_RIGHT;
	} else if(column == 0) {
		margin += LEFT_MARGIN;
	} else if(column == size - 1) {
		margin += RIGHT_MARGIN;
	} else if(line == 0) {
		margin += TOP_MARGIN;
	} else if(line == size - 1) {
		margin += BOTTOM_MARGIN;
	}
	
	return margin;
}

function generateGoban(id, gridSize) {
	var grid = '';
	
	for(var i = 0; i < gridSize; i++) {
		grid += generateLine(i, gridSize);
	}
	
	var goban = $('div#' + id);
	
	goban.append(grid);
	goban.css('width', gridSize*50-74);
}

$(document).ready(function() {
	generateGoban('19', 19);
	generateGoban('13', 13);
	generateGoban('9', 9);
});