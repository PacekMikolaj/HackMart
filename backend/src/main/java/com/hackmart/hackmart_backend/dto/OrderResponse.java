package com.hackmart.hackmart_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {

    private Long id;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;

    public OrderResponse(Long id, LocalDateTime createdAt, List<OrderItemResponse> items) {
        this.id = id;
        this.createdAt = createdAt;
        this.items = items;
    }

    public static class OrderItemResponse {
        private Long productId;
        private int quantity;
        private Double unitPrice;

        public OrderItemResponse(Long productId, int quantity, Double unitPrice) {
            this.productId = productId;
            this.quantity = quantity;
            this.unitPrice = unitPrice;
        }

        public Long getProductId() { return productId; }
        public int getQuantity() { return quantity; }
        public Double getUnitPrice() { return unitPrice; }
    }

    public Long getId() { return id; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<OrderItemResponse> getItems() { return items; }
}
