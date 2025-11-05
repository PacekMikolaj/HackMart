package com.hackmart.hackmart_backend.repository;

import com.hackmart.hackmart_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    long countByCreatedAtAfter(LocalDateTime time);

    @Query("SELECT MAX(u.id) FROM User u")
    Optional<Long> findMaxId();

}
