-- HackMart seed: reset + default data
-- Adjusted to actual table names in your DB:
--   users, products, partners, orders, order_item

-- 1>) Delete hacked_table if exists
DROP TABLE IF EXISTS hacked_table;

-- 1) Disable FKs to allow clean deletes
SET FOREIGN_KEY_CHECKS = 0;

-- 2) Clear tables (order matters: children first, then parents)
DELETE FROM order_item;
DELETE FROM orders;
DELETE FROM partners;
DELETE FROM products;
DELETE FROM users;

-- 3) Reset auto-increment counters
ALTER TABLE users       AUTO_INCREMENT = 1;
ALTER TABLE products    AUTO_INCREMENT = 1;
ALTER TABLE partners    AUTO_INCREMENT = 1;
ALTER TABLE orders      AUTO_INCREMENT = 1;
ALTER TABLE order_item  AUTO_INCREMENT = 1;

-- Re-enable foreign keys
SET FOREIGN_KEY_CHECKS = 1;

-- 4) Default USERS
-- NOTE: The BCrypt hash below was taken from your previous data.sql for the 'admin' user.
-- For speed, the same hash is used for 'test' and 'user' so all three share the same password as 'admin' for now.
-- Recommended: replace hashes for 'test' and 'user' with proper BCrypt values later.
INSERT IGNORE INTO users (username, email, password, is_admin, first_name, last_name) VALUES
('admin', 'admin@admin.pl', '$2a$10$u8PelZBpT5S9umC8dfqccuz97iLrmJrjB4cgTK5arNXXGeW2MvMGW', 1, 'Admin', 'Adminowy'),
('test',  'test@test.pl',  '$2a$10$B0zG7NeB/JfJLWhzVXTwA.teqaXm7Bbdt5BzxN1DaA7zzCXClDWx2', 0, 'Test',  'Testowy'),
('user',  'user@email.com','$2a$10$CyDnbiq/ZyM4FqaXf/CU2.cgmzoSPNtUNEIHmXWucSi8UuxDMUvXa', 0, 'User',  'Test');

-- 5) Default PRODUCTS
INSERT IGNORE INTO products (name, stock, price, image_url) VALUES
('27" Full HD Monitor', 15, 219.99, 'monitor.png'),
('Mechanical RGB Keyboard', 30, 89.99, 'keyboard.png'),
('Gaming Mouse 7200 DPI', 50, 39.99, 'mouse.png'),
('Headset with Microphone', 20, 49.90, 'headphones.png'),
('Techbook Pro Laptop', 5, 899.00, 'laptop.png'),
('64GB USB 3.0 Flash Drive', 100, 12.99, 'pendrive.png'),
('Full HD Webcam', 18, 45.00, 'webcam.png'),
('Condenser Microphone', 12, 79.00, 'microphone.png'),
('USB Wi-Fi Adapter', 35, 19.90, 'adapterWiFi.png'),
('UPS 1000VA Power Supply', 7, 139.00, 'powerSupply.png');

-- 6) Default PARTNERS
INSERT IGNORE INTO partners (name, logo_url, website_url) VALUES
('AGH University of Krakow', 'https://www.agh.edu.pl/home/ckim/multimedia/znak_graficzny/znak_bez_nazwy/agh_znk_wbr_rgb_150ppi.jpg', 'https://www.agh.edu.pl'),
('OWASP', 'https://owasp.org/assets/images/logo.png', 'https://owasp.org/'),
('CERT Polska', 'https://cert.pl/uploads/2024/12/oczekiwania-thumb.jpeg', 'https://cert.pl/');
