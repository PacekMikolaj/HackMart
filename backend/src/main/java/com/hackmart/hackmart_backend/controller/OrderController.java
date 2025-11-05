package com.hackmart.hackmart_backend.controller;

import com.hackmart.hackmart_backend.dto.OrderRequest;
import com.hackmart.hackmart_backend.dto.OrderResponse;
import com.hackmart.hackmart_backend.service.OrderService;
import com.hackmart.hackmart_backend.util.TokenUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request,
                                        @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized.");
        }

        Long userId = TokenUtil.getUserId(token);
        orderService.placeOrder(request, userId);

        return ResponseEntity.ok(Map.of("message", "order_created"));
    }

    @GetMapping
    public ResponseEntity<?> getOrders(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized.");
        }

        Long userId = TokenUtil.getUserId(token);
        List<OrderResponse> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }

}

