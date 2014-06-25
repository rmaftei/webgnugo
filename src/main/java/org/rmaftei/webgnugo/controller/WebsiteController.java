package org.rmaftei.webgnugo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Main controller for the website.
 * 
 * @author romeo
 * 
 */
@Controller
public class WebsiteController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String welcome(ModelMap model) {
		model.addAttribute("boardsize", 9);
		return "game";
	}

	@RequestMapping(value = "/small", method = RequestMethod.GET)
	public String game9(ModelMap model) {
		model.addAttribute("boardsize", 9);
		return "game";
	}

	@RequestMapping(value = "/medium", method = RequestMethod.GET)
	public String game13(ModelMap model) {
		model.addAttribute("boardsize", 13);
		return "notfound";
	}

	@RequestMapping(value = "/big", method = RequestMethod.GET)
	public String game19(ModelMap model) {
		model.addAttribute("boardsize", 19);
		return "notfound";
	}

	@RequestMapping(value = "/end", method = RequestMethod.GET)
	public String endSession(HttpSession session) {
		session.invalidate();

		return "redirect:/";
	}

	@RequestMapping(value = "/notfound", method = RequestMethod.GET)
	public String notFound() {
		return "notfound";
	}

	@RequestMapping(value = "/session_expired", method = RequestMethod.GET)
	public String sessionExpired() {
		return "{\"session_expired\":true}";
	}
}
