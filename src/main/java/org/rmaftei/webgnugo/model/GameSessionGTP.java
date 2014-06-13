package org.rmaftei.webgnugo.model;

import java.util.logging.Logger;

import org.rmaftei.gnugoparser.GnuGOModes;
import org.rmaftei.gnugoparser.lib.model.Game;
import org.rmaftei.gnugoparser.lib.parsers.GnuGOParseException;
import org.rmaftei.gnugoparser.lib.parsers.GnuGoParser;
import org.rmaftei.gnugowrapper.Command;
import org.rmaftei.gnugowrapper.GnuGoWrapper;
import org.rmaftei.gnugowrapper.exceptions.GnuGOWrapperException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component(value = "GTP")
@Scope("session")
public class GameSessionGTP implements GameSession {
    private static Logger LOGGER = Logger.getLogger(GameSessionASCII.class.getName());

    @Autowired
    private GnuGoWrapper.Builder gnugoBuilder;

    private GnuGoWrapper gnugo;

    private final GnuGoParser gnuGoParser = GnuGOModes.GTP.createParser();

    private int moveNumber = 0;

    private int playNumber = 0;

    public Result startGame(GameOptions gameOptions) {
        this.playNumber = gameOptions.getBoardsize().getSize() * gameOptions.getBoardsize().getSize();

        gnugo = gnugoBuilder.boardsize(gameOptions.getBoardsize())
                .level(gameOptions.getLevel())
                .handicap(gameOptions.getHandicap())
                .komi(gameOptions.getKomi())
                .build();

        try {
            gnugo.start();
        } catch (GnuGOWrapperException e) {
            e.printStackTrace();
        }

        gnugo.sendCommand(Command.SHOWBOARD);

        String res = gnugo.getOutputAsString(1000L);
        try {
            return Result.Game(gnuGoParser.parse(res));
        } catch (GnuGOParseException e) {
            return Result.Error(e.getMessage());
        }
    }

    public Result play(String pos) {
        incrementMoveNumber();

        if (Command.FINAL_SCORE.isSame(pos)) {
            gnugo.sendCommand(Command.FINAL_SCORE);
        } else if (Command.QUIT.isSame(pos)) {
            gnugo.sendCommand(Command.QUIT);
        } else {
            gnugo.sendCommand(Command.PLAY_BLACK, pos);
            gnugo.sendCommand(Command.SHOWBOARD);
        }

        return getOutput(100L);
    }

    public Result generateMove() {
        incrementMoveNumber();

        gnugo.sendCommand(Command.GENERATE_WHITE_MOVE);
        gnugo.sendCommand(Command.SHOWBOARD);
        gnugo.sendCommand(Command.LAST_MOVE);

        return getOutput(2000L);
    }

    private Result getOutput(long timeout) {
        try {
            String res = gnugo.getOutputAsString(addMoreTime(timeout));

            LOGGER.info(res);

            Game game = gnuGoParser.parse(res);

            LOGGER.info(game.toString());
            return Result.Game(game);
        } catch (GnuGOParseException e) {
            return Result.Error(e.getMessage());
        }
    }

    private long addMoreTime(long timeout) {
        if ((getMoveNumber() / playNumber) >= 0.24) {
            timeout += 500L;
        }
        if ((getMoveNumber() / playNumber) >= 0.50) {
            timeout += 1000L;
        }
        if ((getMoveNumber() / playNumber) >= 0.74) {
            timeout += 1500L;
        }

        return timeout;
    }

    public void stopGame() {
        gnugo.stop();
    }

    public Result undo() {
        gnugo.sendCommand(Command.UNDO);
        gnugo.sendCommand(Command.UNDO);
        gnugo.sendCommand(Command.SHOWBOARD);

        return getOutput(1000L);
    }

    public void incrementMoveNumber() {
        this.moveNumber++;
    }

    public long getMoveNumber() {
        return moveNumber;
    }
}
