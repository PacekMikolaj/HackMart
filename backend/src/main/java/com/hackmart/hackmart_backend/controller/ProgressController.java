package com.hackmart.hackmart_backend.controller;

import com.hackmart.hackmart_backend.service.ProgressService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProgressController {

    private final ProgressService progressService;
    private final DataSource dataSource;

    public ProgressController(ProgressService progressService, DataSource dataSource) {
        this.progressService = progressService;
        this.dataSource = dataSource;
    }


    @GetMapping("/progress")
    public Map<String, Boolean> getProgress(
            @RequestHeader(value = "Authorization", required = false) String token
    ) {
        return progressService.checkProgress(token);
    }

    @GetMapping("/cors-misconfig")
    public Map<String, String> corsTest(HttpServletRequest request) {
        progressService.checkCorsMisconfigCompleted(request);
        return Map.of("message", "Well done!");
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetAll() {
        Resource script = new ClassPathResource("data.sql");

        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.setContinueOnError(true);
        populator.setSeparator(";");
        populator.addScript(script);

        DatabasePopulatorUtils.execute(populator, dataSource);

        progressService.resetProgress();


        return ResponseEntity.ok("Database reset using data.sql completed.");
    }


}
