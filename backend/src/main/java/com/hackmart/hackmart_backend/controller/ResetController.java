package com.hackmart.hackmart_backend.controller;


import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackmart.hackmart_backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;

@RestController
@RequestMapping("/api/reset")
public class ResetController {

    private final DataSource dataSource;

    public ResetController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostMapping("/all")
    public ResponseEntity<String> resetAll() {

        Resource script = new ClassPathResource("data.sql");

        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.setContinueOnError(true);
        populator.setSeparator(";");
        populator.addScript(script);

        DatabasePopulatorUtils.execute(populator, dataSource);


        return ResponseEntity.ok("Database reset using data.sql completed.");
    }
}
