package com.hackmart.hackmart_backend.util;

import com.hackmart.hackmart_backend.entity.Partner;

import java.util.List;

public class DefaultPartnersData {

    public static List<Partner> getDefaultPartners() {
        return List.of(
                create("AGH University of Krakow", "https://www.agh.edu.pl/home/ckim/multimedia/znak_graficzny/znak_bez_nazwy/agh_znk_wbr_rgb_150ppi.jpg", "https://www.agh.edu.pl"),
                create("OWASP", "https://owasp.org/assets/images/logo.png", "https://owasp.org/"),
                create("CERT Polska", "https://cert.pl/uploads/2024/12/oczekiwania-thumb.jpeg", "https://cert.pl/")
        );
    }

private static Partner create(String name, String logoUrl,  String websiteUrl) {
    Partner p = new Partner();
    p.setName(name);
    p.setLogoUrl(logoUrl);
    p.setWebsiteUrl(websiteUrl);
    return p;
}
}
