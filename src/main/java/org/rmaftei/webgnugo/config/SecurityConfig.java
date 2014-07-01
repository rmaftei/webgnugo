package org.rmaftei.webgnugo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("honinbo")
				.password("honinb0123").roles("USER");

		auth.inMemoryAuthentication().withUser("hayashi")
				.password("hayash1234").roles("USER");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/*").access("hasRole('USER')")
				.and().formLogin().loginPage("/login")
				.failureUrl("/login?error").and().csrf().disable();

		http.sessionManagement().maximumSessions(1)
				.expiredUrl("/session_expired");
	}
}
