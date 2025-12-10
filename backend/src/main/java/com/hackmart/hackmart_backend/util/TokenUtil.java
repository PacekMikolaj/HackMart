package com.hackmart.hackmart_backend.util;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class TokenUtil {

    public static String generateToken(Long userId, String username, boolean isAdmin) {
        String raw = userId + ":" + username + ":" + isAdmin;
        return Base64.getEncoder().encodeToString(raw.getBytes(StandardCharsets.UTF_8));
    }

    public static DecodedToken decodeToken(String token) {
        try {
            byte[] decodedBytes = Base64.getDecoder().decode(token);
            String decoded = new String(decodedBytes, StandardCharsets.UTF_8);
            String[] parts = decoded.split(":");

            if (parts.length != 3) {
                throw new IllegalArgumentException("Invalid token format");
            }

            Long userId = Long.parseLong(parts[0]);
            String username = parts[1];
            boolean isAdmin = Boolean.parseBoolean(parts[2]);

            return new DecodedToken(userId, username, isAdmin);

        } catch (Exception e) {
            throw new RuntimeException("Failed to decode token: " + e.getMessage());
        }
    }

    public static class DecodedToken {
        public Long userId;
        public String username;
        public boolean isAdmin;

        public DecodedToken(Long userId, String username, boolean isAdmin) {
            this.userId = userId;
            this.username = username;
            this.isAdmin = isAdmin;
        }
    }

    public static boolean isAdmin(String token) {
        try {
            return decodeToken(token).isAdmin;
        } catch (Exception e) {
            return false;
        }
    }

    public static Long getUserId(String token) {
        try {
            return decodeToken(token).userId;
        } catch (Exception e) {
            return null;
        }
    }

}
