package com.hackmart.hackmart_backend.dto;
import com.hackmart.hackmart_backend.entity.User;

public class LoginResponse {
    private String token;
    private String username;
    private String firstName;
    private String lastName;
    private Boolean isAdmin;
    private String email;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.isAdmin = user.getIsAdmin();

    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public String getEmail() {
        return email;
    }
}
