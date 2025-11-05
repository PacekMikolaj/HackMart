package com.hackmart.hackmart_backend.util;

import com.hackmart.hackmart_backend.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class DefaultUserData {

    private final PasswordEncoder passwordEncoder;

    public DefaultUserData(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getDefaultUsers() {
        return List.of(
                create("admin", "fA4Vefc", true, "admin@admin.pl", "Admin", "Adminowy"),
                create("test", "test", false, "test@test.pl", "Test", "Testowy"),
                create("user", "user", false, "user@email.com", "User", "Test")
        );
    }

    private User create(String username, String rawPassword, boolean isAdmin, String email, String firstName, String lastName) {
        User p = new User();
        p.setUsername(username);
        p.setPassword(passwordEncoder.encode(rawPassword));
        p.setIsAdmin(isAdmin);
        p.setEmail(email);
        p.setFirstName(firstName);
        p.setLastName(lastName);
        return p;
    }
}
