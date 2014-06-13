package org.rmaftei.webgnugo.model;

public interface GameSession {

	Result startGame(GameOptions gameOptions);

	void stopGame();

	Result play(String position);
	
	Result generateMove();

	Result undo();
}
