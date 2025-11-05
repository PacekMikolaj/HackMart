package com.hackmart.hackmart_backend.dto;

public class UpdateUserRequest {
    public String username;
    public String email;
    public String oldPassword;  // ← nowe pole
    public String newPassword;  // ← nowe pole
    public Boolean isAdmin;
    public String firstName;
    public String lastName;
}

