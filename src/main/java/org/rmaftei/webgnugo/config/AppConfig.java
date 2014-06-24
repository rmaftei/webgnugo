package org.rmaftei.webgnugo.config;

import org.rmaftei.gnugowrapper.GnuGoMode;
import org.rmaftei.gnugowrapper.GnuGoWrapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"org.rmaftei.webgnugo"})
public class AppConfig {

    @Bean()
    public GnuGoWrapper.Builder gnugoBuilder() {
        String pathToGnuGO = "gnugo/gnugo";

        GnuGoWrapper.Builder gnugoBuilder = new GnuGoWrapper.Builder(pathToGnuGO, GnuGoMode.GTP);
        System.out.println(gnugoBuilder);

        return gnugoBuilder;
    }
}
