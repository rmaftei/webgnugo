package org.rmaftei.webgnugo.model;

import org.rmaftei.gnugowrapper.Boardsize;

public class GameOptions {

	private Boardsize boardsize;

	private Long level;

	private Long handicap;

	private Double komi;

	public Boardsize getBoardsize() {
		return boardsize;
	}

	public void setBoardsize(String boardsize) {
		this.boardsize = Boardsize.valueOf(boardsize.toUpperCase());
	}

	public Long getLevel() {
		return level;
	}

	public void setLevel(Long level) {
		this.level = level;
	}

	public Long getHandicap() {
		return handicap;
	}

	public void setHandicap(Long handicap) {
		this.handicap = handicap;
	}

	public Double getKomi() {
		return komi;
	}

	public void setKomi(Double komi) {
		this.komi = komi;
	}
}
