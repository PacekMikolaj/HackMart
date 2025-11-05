package com.hackmart.hackmart_backend.controller;

import com.hackmart.hackmart_backend.dto.UpdateUserRequest;
import com.hackmart.hackmart_backend.dto.UserResponse;
import com.hackmart.hackmart_backend.entity.User;
import com.hackmart.hackmart_backend.repository.UserRepository;
import com.hackmart.hackmart_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(
            @RequestHeader(value = "Authorization", required = false) String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(401).build();
        }

        System.out.println(token);

        // 🔓 Rozkodowanie base64
        String decoded = new String(Base64.getDecoder().decode(token));
        String[] parts = decoded.split(":");

        if (parts.length < 3) {
            return ResponseEntity.status(400).build(); // zły format
        }

        Long userId = Long.parseLong(parts[0]);

        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(userService.mapToResponse(userOpt.get()));
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request,
            @RequestHeader(value = "Authorization") String token) {

        if (token == null || token.isBlank()) {
            return ResponseEntity.status(401).body(null);
        }

        /// nie sprawdzamy jakie id jest w tokenie - IDOR


        return ResponseEntity.ok(userService.updateUser(id, request));
    }



}
