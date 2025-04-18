
package com.familynest.accountsportal.repository;

import com.familynest.accountsportal.model.ERole;
import com.familynest.accountsportal.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
