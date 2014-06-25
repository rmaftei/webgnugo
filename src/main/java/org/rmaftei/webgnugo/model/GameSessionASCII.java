package org.rmaftei.webgnugo.model;

import java.util.List;
import java.util.logging.Logger;

import org.rmaftei.gnugoparser.GnuGOModes;
import org.rmaftei.gnugoparser.lib.parsers.GnuGoParser;
import org.rmaftei.gnugowrapper.Boardsize;
import org.rmaftei.gnugowrapper.Command;
import org.rmaftei.gnugowrapper.GnuGoMode;
import org.rmaftei.gnugowrapper.GnuGoWrapper;
import org.rmaftei.gnugowrapper.exceptions.GnuGOWrapperException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * This class keeps the GNU Go game wrapper<br>
 * on session
 * 
 * @author romeo
 * 
 */
@Component(value = "ASCII")
@Scope("session")
public class GameSessionASCII implements GameSession {

	public static final String PATH_EXEC = "gnugo";
	Logger LOGGER = Logger.getLogger(GameSessionASCII.class.getName());

	private GnuGoWrapper gnuGoWrapper;

	private final GnuGoParser gnuGoParser = GnuGOModes.ASCII.createParser();

	public Result startGame(GameOptions gameOptions) {
		gnuGoWrapper = new GnuGoWrapper.Builder(PATH_EXEC, GnuGoMode.ASCII)
				.boardsize(gameOptions.getBoardsize()).build();
		try {
			gnuGoWrapper.start();
		} catch (GnuGOWrapperException e) {
			e.printStackTrace();
		}

		sleep();
		String res = gnuGoWrapper.getOutputAsString(2L);
		try {
			return Result.Game(gnuGoParser.parse(res));
		} catch (Exception e) {
			return Result.Error(e.getMessage());
		}
	}

	public Result play(String pos) {
		gnuGoWrapper.sendCommand(Command.PLAY_BLACK, pos);

		return getOutput();
	}

	private Result getOutput() {
		sleep();
		try {
			List<String> listResult = gnuGoWrapper.getOutput(2L);
			int splitIdx = listResult.indexOf("GNU Go is thinking...");

			listResult = listResult.subList(splitIdx + 1, listResult.size());
			StringBuilder resultBuilder = new StringBuilder();

			for (String str : listResult) {
				resultBuilder.append(str);
				resultBuilder.append("\n");
			}

			LOGGER.info(resultBuilder.toString());

			return Result.Game(gnuGoParser.parse(resultBuilder.toString()));
		} catch (Exception e) {
			return Result.Error(e.getMessage());
		}
	}

	private void sleep() {
		try {
			Thread.sleep(3000L);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public void stopGame() {
		gnuGoWrapper.stop();
	}

	public Result generateMove() {
		return null;
	}

	public Result undo() {
		// TODO Auto-generated method stub
		return null;
	}

	public Result resign() {
		// TODO Auto-generated method stub
		return null;
	}
}
