package com.hackmart.hackmart_backend.service;

import com.hackmart.hackmart_backend.dto.OrderRequest;
import com.hackmart.hackmart_backend.dto.OrderResponse;
import com.hackmart.hackmart_backend.entity.Order;
import com.hackmart.hackmart_backend.entity.OrderItem;
import com.hackmart.hackmart_backend.entity.Product;
import com.hackmart.hackmart_backend.repository.OrderRepository;
import com.hackmart.hackmart_backend.repository.ProductRepository;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final ProgressService progressService;
    private final EntityManager entityManager;

    public OrderService(ProductRepository productRepository, OrderRepository orderRepository, ProgressService progressService, EntityManager entityManager) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.progressService = progressService;
        this.entityManager = entityManager;
    }

    @Transactional
    public void placeOrder(OrderRequest request, Long userId) {
        Order order = new Order(userId);

        List<OrderItem> items = request.getItems().stream()
                .map(itemRequest -> {
                    Product product = productRepository.findById(itemRequest.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product does not exist"));

                    // 🔻 Brak walidacji stocku – podatność
                    int newStock = product.getStock() - itemRequest.getQuantity();
                    product.setStock(newStock);
                    productRepository.save(product);
                    System.out.println("product.getId()");

                    return new OrderItem(
                            product.getId(),
                            itemRequest.getQuantity(),
                            product.getPrice()
                    );
                }).collect(Collectors.toList());



        order.setItems(items);
        orderRepository.save(order);

        // 🔍 Sprawdzenie, czy stock któregoś produktu spadł poniżej 0
        progressService.checkImproperInputValidationCompleted();
    }


    public List<OrderResponse> getOrdersByUser(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);

        return orders.stream().map(order -> new OrderResponse(
                order.getId(),
                order.getCreatedAt(),
                order.getItems().stream()
                        .map(item -> new OrderResponse.OrderItemResponse(
                                item.getProductId(),
                                item.getQuantity(),
                                item.getUnitPrice()
                        )).toList()
        )).toList();
    }

    @Transactional
    public void resetOrders() {
        // Najpierw usuwamy OrderItem (jeśli istnieje relacja z kaskadą, czasem wystarczy usunąć Order)
        entityManager.createNativeQuery("DELETE FROM order_item").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM orders").executeUpdate();

        System.out.println("🧹 Zresetowano wszystkie zamówienia i pozycje zamówień.");
    }



}


