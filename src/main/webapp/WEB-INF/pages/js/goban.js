var App = App || {};

App.goban = undefined;
App.PLAY = undefined;
App.LETTERS = 'ABCDEFGHJKLMNOPQRST';

var pass = 0;

App.game_information = {
	boardsize : {
		label : undefined,
		value : undefined
	},
	handicap : {
		label : undefined,
		value : undefined
	},
	komi : {
		label : undefined,
		value : undefined
	},
	to_move : {
		label : undefined,
		value : undefined
	},
	computer_player : {
		label : undefined,
		value : undefined
	},
	level : {
		label : undefined,
		value : undefined
	}
};

App.create_goban = function(boardsize, komi, handicap, level) {

	// TODO: THIS NEEDS A BIG REFACTOR!!

	if (boardsize === undefined || boardsize === null) {
		return false;
	}

	var j = 0;
	var COORD = "coord";
	var MARGIN_RIGHT = "margin-right";
	var MARGIN_LEFT = "margin-left";
	var MARGIN_UP = "margin-up";
	var MARGIN_DOWN = "margin-down";
	var UPPER_RIGHT = "upper-right";
	var UPPER_LEFT = "upper-left";
	var BOTTOM_RIGHT = "bottom-right";
	var BOTTOM_LEFT = "bottom-left";
	var INTERSECTION = "intersection";
	var PLAY = "playeble";

	App.PLAY = PLAY;

	var emptySpace = '<td class=' + COORD + '></td>';
	var alpha_line = emptySpace;

	var BOARDSIZE = boardsize;

	var goban = $('#goban');
	goban.html('');
	App.goban = goban;

	for (i = 0; i < BOARDSIZE; i++) {
		alpha_line += '<td class=' + COORD + '>' + App.LETTERS[i] + '</td>';
	}

	alpha_line += emptySpace;
	goban.append('<tr>' + alpha_line + '</tr>');

	for (i = 0; i < BOARDSIZE; i++) {
		var line = '';
		shift = 0;
		line += '<td class=' + COORD + '>' + (BOARDSIZE - i) + '</td>';
		for (j = 0; j < BOARDSIZE; j++) {
			var column = j;

			if (i == 0 && j == 0) {
				line += '<td id=' + column + ' class="' + UPPER_LEFT + ' '
						+ PLAY + '"></td>';
			} else if (i == BOARDSIZE - 1 && j == BOARDSIZE - 1) {
				line += '<td id=' + column + ' class="' + BOTTOM_RIGHT + ' '
						+ PLAY + '"></td>';
			} else if (i == BOARDSIZE - 1 && j == 0) {
				line += '<td id=' + column + ' class="' + BOTTOM_LEFT + ' '
						+ PLAY + '"></td>';
			} else if (i == 0 && j == BOARDSIZE - 1) {
				line += '<td id=' + column + ' class="' + UPPER_RIGHT + ' '
						+ PLAY + '"></td>';
			} else if (j == 0) {
				line += '<td id=' + column + ' class="' + MARGIN_RIGHT + ' '
						+ PLAY + '"></td>';
			} else if (j == BOARDSIZE - 1) {
				line += '<td id=' + column + ' class="' + MARGIN_LEFT + ' '
						+ PLAY + '"></td>';
			} else if (i == 0) {
				line += '<td id=' + column + ' class="' + MARGIN_DOWN + ' '
						+ PLAY + '"></td>';
			} else if (i == BOARDSIZE - 1) {
				line += '<td id=' + column + ' class="' + MARGIN_UP + ' '
						+ PLAY + '"></td>';
			} else {
				line += '<td id=' + column + ' class="' + INTERSECTION + ' '
						+ PLAY + '"></td>';
			}
		}

		line += '<td class=' + COORD + '>' + (BOARDSIZE - i) + '</td>';

		goban.children().append(
				'<tr id=' + ((BOARDSIZE - i)) + '>' + line + '</tr>');
	}
	goban.append('<tr>' + alpha_line + '</tr>');

	$('.' + PLAY).css('cursor', 'pointer');
	
	App.game_information.boardsize.value = 9;
	App.game_information.handicap.value = handicap;
	App.game_information.komi.value = komi;
	App.game_information.level.value = level;

};

App.create_game = function(komi, handicap, level) {
    var options = {
        boardsize: 'small',
        level: level,
        handicap: handicap,
        komi: komi
    };

	$.ajax({
		type : "POST",
		url : "game/create",
		data : JSON.stringify(options, null, 2),
		contentType : "application/json; charset=utf-8",
		success : function(msg) {
			if (!msg.error) {
				parseBoardInf(msg.game);
				parseBoard(msg.game);
				$.unblockUI;
                if(handicap != 0 ) {
                    getComputerStone();
                }
			} else {
				console.log(msg.message);
			}
		},
		error : function(err) {
		}
	});
};

function placeStone(position) {
    $('div#last_move div.panel-body').html('<p>BLACK ' + position.toUpperCase() + '</p>');

	$.ajax({
		type : "POST",
		url : "game/play/" + position,
		data : "",
		contentType : "application/json; charset=utf-8",
		success : function(msg) {
			if(msg.session_expired !== undefined) {
				placeStone('quit');
				window.location = "/end";
			}
			else if (!msg.error) {
				parseBoard(msg.game);
                var lastMove = msg.game.lastMove;

                if (lastMove != null) {
                    if(lastMove.position.column === 0) {
                        pass = pass + 1;

                        if(pass >= 3) {
                            finalScore();
                        }

                        $('div#last_move div.panel-body').html(
                            '<p>' + lastMove.color + ' '
                                + 'PASS' + '</p>');
                    }
                    else {

                            $('div#last_move div.panel-body').html(
                                '<p>' + lastMove.color + ' '
                                    + App.LETTERS[lastMove.position.column - 1]
                                    + lastMove.position.line + '</p>');
                            pass = 0;
                        }
                }
				getComputerStone(); 
			} else {
				console.log(msg.message);
			}
		},
		error : function(err) {
		}
	});
}

function undo() {
	$('div#last_move div.panel-body').html('<p>BLACK Undo</p>');
	$.ajax({
		type : "POST",
		url : "game/undo",
		data : "",
		contentType : "application/json; charset=utf-8",
		success : function(msg) {
			if (!msg.error) {
				parseBoard(msg.game);
				var lastMove = msg.game.lastMove;
				if (lastMove != null) {
                    if(lastMove.position.column === 0) {
                        $('div#last_move div.panel-body').html(
                            '<p>' + lastMove.color + ' '
                                + 'PASS' + '</p>');
                    }
                    else {
                        $('div#last_move div.panel-body').html(
                            '<p>' + lastMove.color + ' '
                                + App.LETTERS[lastMove.position.column - 1]
                                + lastMove.position.line + '</p>');
                    }
                }
				$('div#game').unblock();
			} else {
				console.log(msg.message);
			}
		},
		error : function(err) {
		}
	});
}

function getComputerStone() {
	$.ajax({
		type : "POST",
		url : "game/play",
		data : "",
		contentType : "application/json; charset=utf-8",
		success : function(msg) {
			if (!msg.error) {
				parseBoard(msg.game);
				var lastMove = msg.game.lastMove;
				if (lastMove != null) {
                    if(lastMove.position.column === 0) {
                        pass = pass + 1;

                        if(pass >= 3) {
                            finalScore();
                        }

                        $('div#last_move div.panel-body').html(
                            '<p>' + lastMove.color + ' '
                                + 'PASS' + '</p>');
                    }
                    else {
                        $('div#last_move div.panel-body').html(
                                '<p>' + lastMove.color + ' '
                                        + App.LETTERS[lastMove.position.column - 1]
                                        + lastMove.position.line + '</p>');
                    }
				}
				
				$('div#game').unblock();

			} else {
				console.log(msg.message);
			}
		},
		error : function(err) {
		}
	});
}

function finalScore() {
    $.ajax({
        type : "POST",
        url : "game/play/final_score",
        data : "",
        contentType : "application/json; charset=utf-8",
        success : function(msg) {
            if (!msg.error) {
                parseBoard(msg.game);
            } else {
                console.log(msg.message);
            }
        },
        error : function(err) {
        }
    });
}

// encapsulate this
function populateGameInfo() {
	App.game_information.boardsize.label = "Board Size: ";
	App.game_information.handicap.label = "Handicap: ";
	App.game_information.komi.label = "Komi: ";
	App.game_information.to_move.label = "Human: ";
	App.game_information.computer_player.label = "Computer player: ";
	App.game_information.level.label='Level: ';
	
	App.game_information.computer_player.value = 'White';
	App.game_information.to_move.value = 'Black';
}

function clearBoard() {
	App.goban.find('td').find('div').parent().html('');
}

function parseBoardInf(game) {
	var info = "";

	populateGameInfo(game);

	for ( var obj in App.game_information) {
		var prop = App.game_information[obj];

		info += '<p>' + prop.label + prop.value + '</p>';
	}

	$('div#info div.panel-body').html(info);

}

function parseBoard(game) {
	if (game.gameOver) {
		$('div#winner .modal-body p#text').html(
				game.winner + ' wins by ' + game.score);
		$('div#winner').modal('show');
		return;
	}

	var goban = App.goban;
	var board = game.board;

	clearBoard();

	for (var i = 0; i < board.length; i++) {
		var stone = board[i];

		var line_number = stone.position.line;
		var column = stone.position.column - 1;

		if (stone.color === 'BLACK') {
			goban.find('tr#' + line_number).find('td#' + column).html(
					'<div id="stone_black" class="stone"></div>');
		} else {
			goban.find('tr#' + line_number).find('td#' + column).html(
					'<div id="stone_white" class="stone"></div>');
		}
	}
}

App.attach_events = function() {
	var goban = App.goban;
	var color = 'stone_black';

	goban.find('.' + App.PLAY).click(
			function(event) {
				if (event.target.id === 'stone_white'
						|| event.target.id === 'stone_black') {
					$('div#last_move div.panel-body').html(
							'<p>Illegal move</p>');
				} else {
					placeStone(App.LETTERS[event.target.id]
							+ event.target.parentNode.id);
					$(event.target).append(
							'<div id="' + color + '" class="stone"></div>');
					$('div#game').block({
						message : 'GnuGo is thinking... ',
						overlayCSS : {
							backgroundColor: '#FFFFFF',
							opacity:0.0,
							cursor:'pointer'
						}
					});
				}
			});

	$('button.play').click(function(event) {
		placeStone(event.target.attributes.action.nodeValue);
	});

	$('button#end').click(function(event) {
		placeStone('quit');
		window.location = "/end";
	});

	$('button#resign').click(function(event) {
		$('div#winner .modal-body p#text').html('White wins by resign');
		$('div#winner').modal('show');
	});
	
	$('button#undo').click(function(event) {
		 undo();
	});

	$('button#new').click(function(event) {
        // TODO: need a better way
        placeStone('quit');
        window.location.reload();
	});
};