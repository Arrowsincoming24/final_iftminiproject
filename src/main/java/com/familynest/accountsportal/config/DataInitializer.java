
package com.familynest.accountsportal.config;

import com.familynest.accountsportal.model.ERole;
import com.familynest.accountsportal.model.Role;
import com.familynest.accountsportal.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        if (roleRepository.count() == 0) {
            Role parentRole = new Role(ERole.ROLE_PARENT);
            Role childRole = new Role(ERole.ROLE_CHILD);
            
            roleRepository.save(parentRole);
            roleRepository.save(childRole);
            
            System.out.println("Roles initialized successfully!");
        }
    }
}
