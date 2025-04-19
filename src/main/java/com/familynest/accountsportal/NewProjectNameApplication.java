package com.familynest.accountsportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class NewProjectNameApplication {

    public static void main(String[] args) {
        SpringApplication.run(NewProjectNameApplication.class, args);
    }
}
