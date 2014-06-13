package org.rmaftei.webgnugo.model;

import org.rmaftei.gnugoparser.lib.model.Game;

public final class Result {
	
	private Game game;
	
	private boolean error = false;
	
	private String message;
	
	public Game getGame() {
		return game;
	}

	public boolean isError() {
		return error;
	}
	
	public String getMessage() {
		return message;
	}

	public static Result Game(Game game) {
		Result result = new Result();
		
		result.game = game;
		
		return result;
	}
	
	
	public static Result Error(String message) {
		Result result = new Result();
		
		result.message = message;
		result.error = true;
		
		return result;
	} 
}
