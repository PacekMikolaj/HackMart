package com.hackmart.hackmart_backend.dto;

/**
 * Dane użytkownika zwracane na frontend (bez hasła).
 */
public class UserResponse {
    public Long id;
    public String username;
    public String email;
    public String firstName;
    public String lastName;
}
