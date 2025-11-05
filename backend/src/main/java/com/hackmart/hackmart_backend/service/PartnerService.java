package com.hackmart.hackmart_backend.service;

import com.hackmart.hackmart_backend.entity.Partner;
import com.hackmart.hackmart_backend.repository.PartnerRepository;
import com.hackmart.hackmart_backend.util.DefaultPartnersData;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartnerService {

    private final PartnerRepository partnerRepository;

    public PartnerService(PartnerRepository partnerRepository) {
        this.partnerRepository = partnerRepository;
    }

    public List<Partner> getAllPartners() {
        return partnerRepository.findAll();
    }
}
