
package com.familynest.accountsportal.payload.response;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private final String token;
    private final String type = "Bearer";
    private final Long id;
    private final String username;
    private final String email;
    private final String fullName;
    private final List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, String fullName, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }
    
    // Explicit getter methods
    public String getToken() {
        return token;
    }
    
    public String getType() {
        return type;
    }
    
    public Long getId() {
        return id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public List<String> getRoles() {
        return roles;
    }
}
