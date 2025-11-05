package com.hackmart.hackmart_backend.repository;

import com.hackmart.hackmart_backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
