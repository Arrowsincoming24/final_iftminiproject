package com.familynest.accountsportal.controller;

import com.familynest.accountsportal.model.ChildAccount;
import com.familynest.accountsportal.model.ParentAccount;
import com.familynest.accountsportal.model.User;
import com.familynest.accountsportal.repository.UserRepository;
import com.familynest.accountsportal.security.services.UserDetailsImpl;
import com.familynest.accountsportal.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/parent")
    @PreAuthorize("hasRole('ROLE_PARENT')")
    public ResponseEntity<?> getParentAccountDetails(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        ParentAccount parentAccount = accountService.getParentAccountByUser(user);
        List<ChildAccount> childAccounts = accountService.getChildAccountsByParentAccount(parentAccount);
        
        Map<String, Object> response = new HashMap<>();
        response.put("parentAccount", mapParentAccount(parentAccount));
        response.put("childAccounts", childAccounts.stream()
                .map(this::mapChildAccount)
                .collect(Collectors.toList()));
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/child")
    @PreAuthorize("hasRole('ROLE_CHILD')")
    public ResponseEntity<?> getChildAccountDetails(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        ChildAccount childAccount = accountService.getChildAccountByUser(user);
        
        return ResponseEntity.ok(mapChildAccount(childAccount));
    }
    
    @GetMapping("/parent/{id}")
    @PreAuthorize("hasRole('ROLE_PARENT')")
    public ResponseEntity<?> getParentAccountById(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Verify that the parent is accessing their own account
        ParentAccount userParentAccount = accountService.getParentAccountByUser(user);
        if (!userParentAccount.getId().equals(id)) {
            return ResponseEntity.status(403).body("You can only access your own account");
        }
        
        ParentAccount parentAccount = accountService.getParentAccountById(id);
        return ResponseEntity.ok(mapParentAccount(parentAccount));
    }
    
    @GetMapping("/child/{id}")
    @PreAuthorize("hasAnyRole('ROLE_PARENT', 'ROLE_CHILD')")
    public ResponseEntity<?> getChildAccountById(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        ChildAccount childAccount = accountService.getChildAccountById(id);
        
        // If child, verify they are accessing their own account
        if (userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_CHILD"))) {
            ChildAccount userChildAccount = accountService.getChildAccountByUser(user);
            if (!userChildAccount.getId().equals(id)) {
                return ResponseEntity.status(403).body("You can only access your own account");
            }
        }
        
        // If parent, verify they are accessing a child account linked to them
        if (userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_PARENT"))) {
            ParentAccount parentAccount = accountService.getParentAccountByUser(user);
            if (!childAccount.getParentAccount().getId().equals(parentAccount.getId())) {
                return ResponseEntity.status(403).body("You can only access child accounts linked to your parent account");
            }
        }
        
        return ResponseEntity.ok(mapChildAccount(childAccount));
    }
    
    @GetMapping("/parents/available")
    public ResponseEntity<?> getAvailableParentAccounts() {
        List<ParentAccount> parentAccounts = accountService.getAllParentAccounts();
        List<Map<String, Object>> result = parentAccounts.stream()
                .map(account -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", account.getId());
                    map.put("accountNumber", account.getAccountNumber());
                    map.put("accountName", account.getAccountName());
                    return map;
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(result);
    }
    
    private Map<String, Object> mapParentAccount(ParentAccount account) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", account.getId());
        map.put("accountNumber", account.getAccountNumber());
        map.put("accountName", account.getAccountName());
        map.put("balance", account.getBalance());
        map.put("createdAt", account.getCreatedAt());
        map.put("updatedAt", account.getUpdatedAt());
        map.put("createdAtIST", account.getCreatedAtIST());
        map.put("updatedAtIST", account.getUpdatedAtIST());
        map.put("systemCreated", account.getSystemCreated());
        map.put("systemUpdated", account.getSystemUpdated());
        return map;
    }
    
    private Map<String, Object> mapChildAccount(ChildAccount account) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", account.getId());
        map.put("accountNumber", account.getAccountNumber());
        map.put("accountName", account.getAccountName());
        map.put("balance", account.getBalance());
        map.put("parentAccountId", account.getParentAccount().getId());
        map.put("createdAt", account.getCreatedAt());
        map.put("updatedAt", account.getUpdatedAt());
        map.put("createdAtIST", account.getCreatedAtIST());
        map.put("updatedAtIST", account.getUpdatedAtIST());
        map.put("systemCreated", account.getSystemCreated());
        map.put("systemUpdated", account.getSystemUpdated());
        return map;
    }
}
