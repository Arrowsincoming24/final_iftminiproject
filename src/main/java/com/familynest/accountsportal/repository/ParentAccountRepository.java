
package com.familynest.accountsportal.repository;

import com.familynest.accountsportal.model.ParentAccount;
import com.familynest.accountsportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParentAccountRepository extends JpaRepository<ParentAccount, Long> {
    Optional<ParentAccount> findByUser(User user);
    Optional<ParentAccount> findByAccountNumber(String accountNumber);
}
