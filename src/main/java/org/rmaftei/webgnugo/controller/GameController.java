package org.rmaftei.webgnugo.controller;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.parser.ParseException;
import org.rmaftei.webgnugo.model.GameOptions;
import org.rmaftei.webgnugo.model.GameSession;
import org.rmaftei.webgnugo.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
@Scope("request")
public class GameController {
	
	@Autowired(required = true)
	@Qualifier("GTP")
	private GameSession gameSession;
	
	@RequestMapping(value = "/game/create", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public Result createGame(@RequestBody String request) throws ParseException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        GameOptions gameOptions = mapper.readValue(request, GameOptions.class);

		return gameSession.startGame(gameOptions);
	}

	@RequestMapping(value = "/game/undo", method = RequestMethod.POST)
	@ResponseBody
	public Result undo() {
		return gameSession.undo();
	}
	
	@RequestMapping(value = "/game/play/{position}", method = RequestMethod.POST)
	@ResponseBody
	public Result putStone(@PathVariable String position) {
		return gameSession.play(position);
	}
	
	@RequestMapping(value = "/game/play", method = RequestMethod.POST)
	@ResponseBody
	public Result putStone() {
		return gameSession.generateMove();
	}
}
