package com.hackmart.hackmart_backend.controller;

import com.hackmart.hackmart_backend.entity.Product;
import com.hackmart.hackmart_backend.repository.ProductRepository;
import com.hackmart.hackmart_backend.service.ProductService;
import com.hackmart.hackmart_backend.util.TokenUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/recommended")
    public List<Product> getRecommendedProducts() {
        return productService.getRandomProducts(4); // 4 losowe
    }





    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProduct(
            @RequestHeader("Authorization") String token,
            @RequestParam String name,
            @RequestParam String price,
            @RequestParam String stock,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        if (!TokenUtil.isAdmin(token)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admin can add products.");
        }

        try {
            double parsedPrice = Double.parseDouble(price);
            int parsedStock = Integer.parseInt(stock);

            productService.addProduct(name, parsedPrice, parsedStock, imageFile);
            return ResponseEntity.ok("Product created.");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid number format in price or stock.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> productOpt = productService.findById(id);

        if (productOpt.isPresent()) {
            return ResponseEntity.ok(productOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token,
            @RequestParam String name,
            @RequestParam String price,
            @RequestParam String stock,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        if (!TokenUtil.isAdmin(token)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admin can update products.");
        }

        try {
            double parsedPrice = Double.parseDouble(price);
            int parsedStock = Integer.parseInt(stock);

            productService.updateProduct(id, name, parsedPrice, parsedStock, imageFile);
            return ResponseEntity.ok("Product updated.");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid number format in price or stock.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }

}