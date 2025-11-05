package com.hackmart.hackmart_backend.controller;

import com.hackmart.hackmart_backend.dto.LoginRequest;
import com.hackmart.hackmart_backend.dto.LoginResponse;
import com.hackmart.hackmart_backend.dto.RegisterRequest;
import com.hackmart.hackmart_backend.dto.UserResponse;
import com.hackmart.hackmart_backend.repository.UserRepository;
import com.hackmart.hackmart_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    // Endpoint: POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        UserResponse registered = userService.register(request);
        return ResponseEntity.ok(registered);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        Optional<LoginResponse> loginOpt = userService.login(request);

        if (loginOpt.isPresent()) {
            return ResponseEntity.ok().body(loginOpt.get());
        }

        return ResponseEntity.status(401).build();
    }

}


