
package com.familynest.accountsportal.repository;

import com.familynest.accountsportal.model.ChildAccount;
import com.familynest.accountsportal.model.ParentAccount;
import com.familynest.accountsportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChildAccountRepository extends JpaRepository<ChildAccount, Long> {
    List<ChildAccount> findByParentAccount(ParentAccount parentAccount);
    Optional<ChildAccount> findByUser(User user);
    Optional<ChildAccount> findByAccountNumber(String accountNumber);
}
