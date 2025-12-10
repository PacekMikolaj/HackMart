package com.hackmart.hackmart_backend.service;

import com.hackmart.hackmart_backend.entity.Product;
import com.hackmart.hackmart_backend.repository.ProductRepository;
import com.hackmart.hackmart_backend.util.DefaultProductData;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProgressService progressService;

    public ProductService(ProductRepository productRepository, ProgressService progressService) {
        this.productRepository = productRepository;
        this.progressService = progressService;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public void addProduct(String name, Double price, Integer stock, MultipartFile imageFile) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setStock(stock);

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = saveImage(imageFile);
            product.setImageUrl(imageUrl);
        }

        progressService.checkUploadPathTraversalCompleted();
        productRepository.save(product);
    }


    public void updateProduct(Long id, String name, Double price, Integer stock, MultipartFile imageFile) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        product.setName(name);
        product.setPrice(price);
        product.setStock(stock);

        if (imageFile != null && !imageFile.isEmpty()) {
            if (product.getImageUrl() != null) {
                String oldFilename = product.getImageUrl().replace("/uploads/", "");
                Path oldPath = Paths.get("uploads", oldFilename);
                Files.deleteIfExists(oldPath);
            }

            String imageUrl = saveImage(imageFile);
            product.setImageUrl(imageUrl);


        }

        productRepository.save(product);
    }



    private String saveImage(MultipartFile imageFile) throws IOException {
        String filename = imageFile.getOriginalFilename();
        Path filePath = Paths.get("uploads", filename);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return filename;
    }

    public List<Product> getRandomProducts(int count) {
        return productRepository.findRandomProducts(count);
    }

}
