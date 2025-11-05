package com.hackmart.hackmart_backend.controller;

import com.hackmart.hackmart_backend.entity.Partner;
import com.hackmart.hackmart_backend.service.PartnerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
public class PartnerController {

    private final PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @GetMapping
    public List<Partner> getPartners() {
        return partnerService.getAllPartners();
    }
}
