package com.finvault.finvault_backend.dto;

public class AuthRequest {
    private String username;
    private String password;

    public AuthRequest() {} // Default constructor (required for JSON parsing)

    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // ✅ Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
