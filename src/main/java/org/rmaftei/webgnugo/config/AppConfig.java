package org.rmaftei.webgnugo.config;

import org.rmaftei.gnugowrapper.GnuGoMode;
import org.rmaftei.gnugowrapper.GnuGoWrapper;
import org.rmaftei.webgnugo.util.OSUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import javax.servlet.ServletContext;
import java.io.IOException;

@Configuration
@ComponentScan(basePackages = {"org.rmaftei.webgnugo"})
public class AppConfig {
    @Autowired
    private ServletContext servletContext;

    @Bean()
    public GnuGoWrapper.Builder gnugoBuilder() {
        String pathToGnuGO = null;

        if(OSUtil.isUnix()) {
            pathToGnuGO = servletContext.getRealPath("gnugo");
//            pathToGnuGO = servletContext.getRealPath("/WEB-INF/gnugo/linux/gnugo");

//            chmodExecutable(pathToGnuGO);
        }
        else if(OSUtil.isWindows()) {
            pathToGnuGO = servletContext.getRealPath("/WEB-INF/gnugo/windows/gnugo.exe");
        }

        GnuGoWrapper.Builder gnugoBuilder = new GnuGoWrapper.Builder(pathToGnuGO, GnuGoMode.GTP);

        return gnugoBuilder;
    }

    /**
        There is a problem(on unix machines) when you put files
        into war archives the permissions are not kept.
        This method is making the file 'gnugo' executable
     */
    private void chmodExecutable(String pathToGnuGO) {
        try {
            String [] command = {"chmod","+x", pathToGnuGO};
            Runtime rt = Runtime.getRuntime();
            Process pr = rt.exec(command);
            pr.waitFor();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
