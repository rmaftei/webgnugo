<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<link rel="stylesheet" href="css/goban.css">
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/bootstrap-theme.min.css">

<script type="text/javascript" src="js/jquery_1.9.1/jquery.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.blockUI.js"></script>
<script type="text/javascript" src="js/goban.js"></script>

<script type="text/javascript">
 		$(document).ready(function() {
 			$('button#new_game').click(function(event) {
				var komi = $('form#create_game input#komi').val();
				var handicap = $('form#create_game select#handicap').val();
				var level = $('form#create_game select#level').val();
				
	 			$.blockUI({ message: "<h1>Creating game</h1>" });
	 			$(document).ajaxStop($.unblockUI); 
	 		    App.create_goban(${boardsize},komi, handicap, level);
	 		   	App.create_game(komi, handicap, level);
	 		    App.attach_events();
 			});

            $('button#cancel').click(function(event) {
                window.location = "/WebGnuGO";
            });
 			
 			$('div#winner .modal-body p#text').html('White wins by resign');
 			$('div#new_game').modal('show');
 		});
 		
 	</script>
</head>
<body>
	<br>
	<div id='controll' class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Controls</h3>
		</div>
		<div class="panel-body">
			<div class="btn-group">
				<button id='pass' type="button" class="btn btn-default play"
					action='pass'>Pass</button>
				<button id='undo' type="button" class="btn btn-default">Undo</button>
				<button id='resign' type="button" class="btn btn-default">Resign</button>
				<button id='end' type="button" class="btn btn-default">End
					Game</button>
			</div>
		</div>
	</div>
	<div id='info' class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Game information</h3>
		</div>
		<div class="panel-body">
			<p>Board Size:</p>
			<p>Handicap:</p>
			<p>Komi:</p>
			<p>Move number:</p>
			<p>Human:</p>
			<p>Computer player:</p>
		</div>
	</div>
	<div id='last_move' class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Last Move</h3>
		</div>
		<div class="panel-body">
			<p>Good luck</p>
		</div>
	</div>
	<div id="game" class="box">
		<table id="goban"></table>
	</div>

	<div id='new_game' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3>Create game</h3>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id='create_game'>
						<fieldset>
							<!-- Text input-->
							<div class="form-group">
								<label class="col-md-4 control-label" for="komi">Komi</label>
								<div class="col-md-4">
									<input id="komi" name="komi"
										class="form-control input-md" type="text" value="5.5"><span
										class="help-block">The score of the play the white
										stones as compensation</span>
								</div>
							</div>

							<!-- Text input-->
							<div class="form-group">
								<label class="col-md-4 control-label" for="handicap">Handicap</label>
								<div class="col-md-4">
                                    <select id="handicap" name="handicap" class="form-control">
                                        <option value="0" selected="selected">0</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </select>
                                    <span class="help-block">Number of stones received as compensation</span>
								</div>
							</div>

							<!-- Select Basic -->
							<div class="form-group">
								<label class="col-md-4 control-label" for="level">Level</label>
								<div class="col-md-4">
									<select id="level" name="level" class="form-control">
										<option value="1" selected="selected">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
									</select>
								</div>
							</div>
						</fieldset>
					</form>

				</div>
				<div class="modal-footer">
					<div class="btn-group">
						<button id='new_game' type="button" class="btn btn-default"
							data-dismiss="modal">New game</button>
						<button id='cancel' type="button" class="btn btn-default"
							data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</div>

	</div>

	<div id='winner' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3>Game over</h3>
				</div>
				<div class="modal-body">
					<p id='text'></p>
				</div>
				<div class="modal-footer">
					<div class="btn-group">
						<button id='new' type="button" class="btn btn-default"
							data-dismiss="modal">New game</button>
						<button id='end' type="button" class="btn btn-default">
							End game</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</html>