
package com.familynest.accountsportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FamilyNestApplication {

    public static void main(String[] args) {
        SpringApplication.run(FamilyNestApplication.class, args);
    }
}
