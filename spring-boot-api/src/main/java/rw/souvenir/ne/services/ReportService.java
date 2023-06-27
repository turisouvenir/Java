package rw.souvenir.ne.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.souvenir.ne.dtos.PurchaseReportDto;
import rw.souvenir.ne.models.Purchased;
import rw.souvenir.ne.repositories.PurchasedRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class ReportService {
    @Autowired
    private PurchasedRepository purchaseRepository;
    public List<PurchaseReportDto> generatePurchaseReport() {
        List<PurchaseReportDto> report = new ArrayList<>();
        List<Purchased> purchases = purchaseRepository.findAll();
        for (Purchased purchased : purchases) {
            PurchaseReportDto dto = new PurchaseReportDto();
            dto.setId(purchased.getId());
            dto.setCustomerName(purchased.getUser().getFirstName());
            dto.setDate(purchased.getDate());
            dto.setProductId(purchased.getProduct().getId());
            dto.setProductName(purchased.getProduct().getName());
            dto.setQuantity(purchased.getQuantity());
            dto.setTotalPrice(purchased.getProduct().getPrice() * purchased.getQuantity());
            report.add(dto);
        }
        return report;
    }
}