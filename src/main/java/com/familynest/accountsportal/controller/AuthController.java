package com.familynest.accountsportal.controller;

import com.familynest.accountsportal.model.ERole;
import com.familynest.accountsportal.model.Role;
import com.familynest.accountsportal.model.User;
import com.familynest.accountsportal.payload.request.LoginRequest;
import com.familynest.accountsportal.payload.request.SignupRequest;
import com.familynest.accountsportal.payload.response.JwtResponse;
import com.familynest.accountsportal.payload.response.MessageResponse;
import com.familynest.accountsportal.repository.RoleRepository;
import com.familynest.accountsportal.repository.UserRepository;
import com.familynest.accountsportal.security.jwt.JwtUtils;
import com.familynest.accountsportal.security.services.UserDetailsImpl;
import com.familynest.accountsportal.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;
    
    @Autowired
    AccountService accountService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getFullName(),
                roles));
    }

    @PostMapping("/signup/parent")
    public ResponseEntity<?> registerParent(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFullName());

        Set<Role> roles = new HashSet<>();
        Role parentRole = roleRepository.findByName(ERole.ROLE_PARENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(parentRole);
        user.setRoles(roles);
        
        // Set the system information
        user.setSystemCreated("Web Portal");
        user.setSystemUpdated("Web Portal");
        
        User savedUser = userRepository.save(user);
        
        // Create parent account
        accountService.createParentAccount(savedUser);

        return ResponseEntity.ok(new MessageResponse("Parent registered successfully!"));
    }

    @PostMapping("/signup/child")
    public ResponseEntity<?> registerChild(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFullName());

        Set<Role> roles = new HashSet<>();
        Role childRole = roleRepository.findByName(ERole.ROLE_CHILD)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(childRole);
        user.setRoles(roles);
        
        // Set the system information
        user.setSystemCreated("Web Portal");
        user.setSystemUpdated("Web Portal");
        
        User savedUser = userRepository.save(user);
        
        // The parentAccountId should be provided in the SignupRequest
        if (signUpRequest.getParentAccountId() == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Parent account ID is required!"));
        }
        
        // Create child account
        accountService.createChildAccount(savedUser, signUpRequest.getParentAccountId());

        return ResponseEntity.ok(new MessageResponse("Child registered successfully!"));
    }
}
