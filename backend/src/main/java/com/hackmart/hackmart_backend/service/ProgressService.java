package com.hackmart.hackmart_backend.service;

import com.hackmart.hackmart_backend.entity.User;
import com.hackmart.hackmart_backend.repository.ProductRepository;
import com.hackmart.hackmart_backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Pattern;

@Service
public class ProgressService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;
private final ProductRepository productRepository;

    private final Set<String> completedVulnerabilities = new HashSet<>();

    public ProgressService(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public Map<String, Boolean> checkProgress(String token) {
        Map<String, Boolean> progress = new HashMap<>();


        progress.put("mass-assignment", checkMassAssignmentCompleted());
        progress.put("token-forgery", checkBACTFCompleted(token));
        progress.put("weak-password-requirements", checkedWeakPasswordRequirementsCompleted());
        progress.put("cors-misconfig", checkCorsMisconfigCompleted(null));
        progress.put("missing-rate-limiting", checkMissingRateLimitingCompleted());
        progress.put("xss", checkXssCompleted());
        progress.put("idor", checkIdorCompleted());
        progress.put("improper-input-validation", checkImproperInputValidationCompleted());
        progress.put("upload-path-traversal", checkUploadPathTraversalCompleted());
        progress.put("ssrf", checkSsrfCompleted());

        System.out.println("Postęp: " + progress);

        return progress;
    }


    private boolean checkMassAssignmentCompleted() {
        String key = "mass-assignment";
        if (completedVulnerabilities.contains(key)) return true;

        boolean isExploited = userRepository.findByUsername("HackedAdmin")
                .map(user -> Boolean.TRUE.equals(user.getIsAdmin()))
                .orElse(false);

        if (isExploited) {
            completedVulnerabilities.add(key);
            return true;
        }

        return false;
    }

    private boolean checkBACTFCompleted(String token) {
        String key = "token-forgery";
        if (completedVulnerabilities.contains(key)) return true;

        if(token == null) return false;

        // 🔓 Rozkodowanie base64
        String decoded = new String(Base64.getDecoder().decode(token));
        String[] parts = decoded.split(":");

        if (parts.length < 3) {
            return false;
        }

        System.out.println(decoded);

        Long userId = Long.parseLong(parts[0]);
        boolean isAdminInToken = "true".equalsIgnoreCase(parts[2]);

        Optional<User> userOpt = userRepository.findById(userId);
        boolean isAdminInDb = userOpt.map(User::getIsAdmin).orElse(false);

        if (isAdminInToken && !isAdminInDb) {
            completedVulnerabilities.add(key);
            return true;
        }

        return false;
    }


    private boolean checkedWeakPasswordRequirementsCompleted() {
        String key = "weak-db-auth";
        if (completedVulnerabilities.contains(key)) return true;

        String sql = """
        SELECT COUNT(*) 
        FROM information_schema.tables 
        WHERE table_schema = 'hackmart'
        AND table_name = 'hacked_table'
    """;

        try {
            Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
            if (count != null && count > 0) {
                completedVulnerabilities.add(key);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean checkCorsMisconfigCompleted(HttpServletRequest request) {
        String key = "cors-misconfig";
        if (completedVulnerabilities.contains(key)) return true;

        if(request == null) return false;

        String origin = request.getHeader("Origin");
        System.out.println("Origin: " + origin);
        if (origin == null || !origin.contains("http://localhost:3000")) {
            completedVulnerabilities.add(key);
            System.out.println("✅ Wykryto wykorzystanie podatności CORS: zapytanie z originu " + origin);
            return true;
        }

        return false;
    }

    public boolean checkMissingRateLimitingCompleted() {
        String key = "missing-rate-limiting";
        if (completedVulnerabilities.contains(key)) return true;

        LocalDateTime fiveSecondsAgo = LocalDateTime.now().minusSeconds(5);
        long recentUsers = userRepository.countByCreatedAtAfter(fiveSecondsAgo);
    System.out.println(recentUsers + " kont utworzono w ciągu ostatnich 5 sekund.");
        if (recentUsers >= 20) {
            completedVulnerabilities.add(key);
            System.out.println("✅ Wykryto wykorzystanie podatności: brak limitu rejestracji – utworzono " + recentUsers + " kont w 5 sekund.");
            return true;
        }

        return false;
    }

    public boolean checkXssCompleted() {
        String key = "xss";
        if (completedVulnerabilities.contains(key)) return true;

        Pattern pattern = Pattern.compile(
                "<img[^>]*onerror\\s*=\\s*[\"']?\\s*alert\\s*\\(",
                Pattern.CASE_INSENSITIVE
        );

        boolean match = userRepository.findAll().stream().anyMatch(user -> {
            String first = Optional.ofNullable(user.getFirstName()).orElse("");
            return pattern.matcher(first).find();
        });

        if (match) {
            completedVulnerabilities.add(key);
            System.out.println("✅ Fancy regex wykrył XSS w firstName z <img onerror=alert(...)>");
            return true;
        }

        return false;
    }


    public boolean checkIdorCompleted() {
        String key = "idor";
        if (completedVulnerabilities.contains(key)) return true;

        // Pobieramy użytkownika o ID 2 (test)
        Optional<User> userOpt = userRepository.findById(2L);
        if (userOpt.isEmpty()) return false;

        User user = userOpt.get();

        boolean match = "zhakowany".equalsIgnoreCase(user.getFirstName())
                && "test".equalsIgnoreCase(user.getLastName());

        if (match) {
            completedVulnerabilities.add(key);
            System.out.println("✅ IDOR wykorzystany – imię i nazwisko użytkownika test zostały zmienione.");
            return true;
        }

        return false;
    }

    public boolean checkImproperInputValidationCompleted() {
        String key = "improper-input-validation";
        if (completedVulnerabilities.contains(key)) return true;

        if (productRepository.existsWithNegativeStock()) {
            completedVulnerabilities.add(key);
            System.out.println("✅ Wykryto produkt ze stanem magazynowym poniżej zera – klient zamówił więcej niż dostępne.");
            return true;
        }

        return false;
    }

    public boolean checkUploadPathTraversalCompleted() {
        String key = "upload-path-traversal";
        if (completedVulnerabilities.contains(key)) return true;

        Path path = Paths.get("src/main/resources/static/hacked.html"); // ⬅️ dopasuj ścieżkę jeśli inna!
        if (Files.exists(path)) {
            completedVulnerabilities.add(key);
            System.out.println("✅ Wykryto plik hacked.html w katalogu static – podatność path traversal została wykorzystana.");
            return true;
        }

        return false;
    }

    public boolean checkSsrfCompleted() {
        String key = "ssrf";
        if (completedVulnerabilities.contains(key)) return true;

        Optional<User> user = userRepository.findByUsername("hackmart-ultimate-hacker");

        if (user.isPresent()) {
            completedVulnerabilities.add(key);
            System.out.println("✅ Wykryto użytkownika 'hackmart-ultimate-hacker' – podatność SSRF została wykorzystana.");
            return true;
        }

        return false;
    }



    public void resetProgress() {
        completedVulnerabilities.clear();
    }
}
