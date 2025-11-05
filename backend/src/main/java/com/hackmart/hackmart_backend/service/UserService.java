package com.hackmart.hackmart_backend.service;

import com.hackmart.hackmart_backend.dto.*;
import com.hackmart.hackmart_backend.entity.User;
import com.hackmart.hackmart_backend.repository.UserRepository;
import com.hackmart.hackmart_backend.util.DefaultUserData;
import com.hackmart.hackmart_backend.util.TokenUtil;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProgressService progressService;
    private final EntityManager entityManager;
     private final DefaultUserData defaultUserData;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, ProgressService progressService, EntityManager entityManager, DefaultUserData defaultUserData) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.progressService = progressService;
        this.entityManager = entityManager;
        this.defaultUserData = defaultUserData;
    }

    // ----------------------------
    // REJESTRACJA
    public UserResponse register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.username);
        user.setPassword(passwordEncoder.encode(request.password)); // szyfrowanie hasła ✅
        user.setEmail(request.email);
        user.setIsAdmin(request.isAdmin);
        user.setFirstName(request.firstName);
        user.setLastName(request.lastName);

        User savedUser = userRepository.save(user);
        progressService.checkMissingRateLimitingCompleted();
        progressService.checkXssCompleted();
        return mapToResponse(savedUser);
    }

    // ----------------------------
    // LOGOWANIE
    public Optional<LoginResponse> login(LoginRequest request) {
        System.out.println(passwordEncoder.encode("fA4Vefcc"));
        return userRepository.findByUsername(request.username)
                .filter(user -> {
System.out.println(passwordEncoder.matches(request.password, user.getPassword()));
                            return passwordEncoder.matches(request.password, user.getPassword());
                        }
                )
                .map(user -> {
                    String token = TokenUtil.generateToken(
                            user.getId(),
                            user.getUsername(),
                            Boolean.TRUE.equals(user.getIsAdmin())
                    );
                    LoginResponse loginResponse = new LoginResponse(token, user);
                    System.out.println(loginResponse);
                    return new LoginResponse(token, user);
                });
    }

    // ----------------------------
    // PROFIL
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // ----------------------------
    // AKTUALIZACJA DANYCH
    public UserResponse updateUser(Long userId, UpdateUserRequest request) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();

        if (request.newPassword != null && !request.newPassword.isBlank()) {
            // Wymagaj poprawnego starego hasła
            if (request.oldPassword == null || !passwordEncoder.matches(request.oldPassword, user.getPassword())) {
                throw new RuntimeException("Stare hasło jest nieprawidłowe");
            }

            user.setPassword(passwordEncoder.encode(request.newPassword));
        }

        if (request.username != null && !request.username.isBlank()) {
            user.setUsername(request.username);
        }

        if(request.firstName != null && !request.firstName.isBlank()) {
            user.setFirstName(request.firstName);
        }

        if(request.lastName != null && !request.lastName.isBlank()) {
            user.setLastName(request.lastName);
        }

        if (request.email != null && !request.email.isBlank()) {
            user.setEmail(request.email);
        }

        if (request.isAdmin != null) {
            user.setIsAdmin(request.isAdmin); // 💣 podatność zostaje
        }

        User updated = userRepository.save(user);
        progressService.checkIdorCompleted();
        progressService.checkSsrfCompleted();
        return mapToResponse(updated);
    }

    // ----------------------------
    // MAPOWANIE
    public UserResponse mapToResponse(User user) {
        UserResponse res = new UserResponse();
        res.id = user.getId();
        res.username = user.getUsername();
        res.email = user.getEmail();
        res.firstName = user.getFirstName();
        res.lastName = user.getLastName();
        return res;
    }

}
