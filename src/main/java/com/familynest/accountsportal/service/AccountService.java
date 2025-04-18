
package com.familynest.accountsportal.service;

import com.familynest.accountsportal.model.ChildAccount;
import com.familynest.accountsportal.model.ParentAccount;
import com.familynest.accountsportal.model.User;
import com.familynest.accountsportal.repository.ChildAccountRepository;
import com.familynest.accountsportal.repository.ParentAccountRepository;
import com.familynest.accountsportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;

@Service
public class AccountService {

    @Autowired
    private ParentAccountRepository parentAccountRepository;

    @Autowired
    private ChildAccountRepository childAccountRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public ParentAccount createParentAccount(User user) {
        ParentAccount parentAccount = new ParentAccount();
        parentAccount.setAccountNumber(generateAccountNumber());
        parentAccount.setBalance(new BigDecimal("1000.00")); // Initial balance
        parentAccount.setAccountName(user.getFullName() + "'s Account");
        parentAccount.setUser(user);
        parentAccount.setSystemCreated("Web Portal");
        parentAccount.setSystemUpdated("Web Portal");
        
        return parentAccountRepository.save(parentAccount);
    }

    @Transactional
    public ChildAccount createChildAccount(User user, Long parentAccountId) {
        ParentAccount parentAccount = parentAccountRepository.findById(parentAccountId)
                .orElseThrow(() -> new RuntimeException("Parent account not found"));

        ChildAccount childAccount = new ChildAccount();
        childAccount.setAccountNumber(generateAccountNumber());
        childAccount.setBalance(new BigDecimal("100.00")); // Initial balance
        childAccount.setAccountName(user.getFullName() + "'s Account");
        childAccount.setParentAccount(parentAccount);
        childAccount.setUser(user);
        childAccount.setSystemCreated("Web Portal");
        childAccount.setSystemUpdated("Web Portal");
        
        return childAccountRepository.save(childAccount);
    }

    public ParentAccount getParentAccountByUser(User user) {
        return parentAccountRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Parent account not found for user"));
    }

    public ChildAccount getChildAccountByUser(User user) {
        return childAccountRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Child account not found for user"));
    }

    public List<ChildAccount> getChildAccountsByParentAccount(ParentAccount parentAccount) {
        return childAccountRepository.findByParentAccount(parentAccount);
    }

    public ParentAccount getParentAccountById(Long id) {
        return parentAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parent account not found"));
    }

    public ChildAccount getChildAccountById(Long id) {
        return childAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Child account not found"));
    }

    private String generateAccountNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        
        // Generate a 10-digit account number
        for (int i = 0; i < 10; i++) {
            sb.append(random.nextInt(10));
        }
        
        return sb.toString();
    }
}
