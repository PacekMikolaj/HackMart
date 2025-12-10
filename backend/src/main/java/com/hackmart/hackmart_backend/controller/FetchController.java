package com.hackmart.hackmart_backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

@RestController
@RequestMapping("/api")
public class FetchController {

    @GetMapping("/fetch")
    public void fetchUrl(@RequestParam String url, HttpServletResponse response) {
        try {
            URL targetUrl = new URL(url);
            URLConnection connection = targetUrl.openConnection();

            try {
                connection.setConnectTimeout(5000);
                connection.setReadTimeout(5000);
            } catch (Exception ignored) {
            }

            String contentType = connection.getContentType();
            if (contentType != null) {
                response.setContentType(contentType);
            }

            try (InputStream inputStream = connection.getInputStream()) {
                IOUtils.copy(inputStream, response.getOutputStream());
                response.flushBuffer();
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            try {
                response.getWriter().write("Błąd: " + e.getMessage());
            } catch (Exception ignored) {}
        }

    }
}
