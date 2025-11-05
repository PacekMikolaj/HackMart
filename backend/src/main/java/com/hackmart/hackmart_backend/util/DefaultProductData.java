package com.hackmart.hackmart_backend.util;

import com.hackmart.hackmart_backend.entity.Product;

import java.util.List;

public class DefaultProductData {

    public static List<Product> getDefaultProducts() {
        return List.of(
                create("27\" Full HD Monitor", 15, 219.99, "monitor.png"),
                create("Mechanical RGB Keyboard", 30, 89.99, "keyboard.png"),
                create("Gaming Mouse 7200 DPI", 50, 39.99, "mouse.png"),
                create("Headset with Microphone", 20, 49.90, "headphones.png"),
                create("Techbook Pro Laptop", 5, 899.00, "laptop.png"),
                create("64GB USB 3.0 Flash Drive", 100, 12.99, "pendrive.png"),
                create("Full HD Webcam", 18, 45.00, "webcam.png"),
                create("Condenser Microphone", 12, 79.00, "microphone.png"),
                create("USB Wi-Fi Adapter", 35, 19.90, "adapterWiFi.png"),
                create("UPS 1000VA Power Supply", 7, 139.00, "powerSupply.png")
        );
    }

    private static Product create(String name, int stock, double price, String imageUrl) {
        Product p = new Product();
        p.setName(name);
        p.setStock(stock);
        p.setPrice(price);
        p.setImageUrl(imageUrl);
        return p;
    }
}