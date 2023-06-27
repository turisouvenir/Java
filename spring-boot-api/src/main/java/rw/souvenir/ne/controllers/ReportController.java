package rw.souvenir.ne.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rw.souvenir.ne.dtos.PurchaseReportDto;
import rw.souvenir.ne.services.ReportService;

import java.util.List;
@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {
    private final ReportService reportService;
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }
    @GetMapping("/purchases")
    public ResponseEntity<List<PurchaseReportDto>> generatePurchaseReport() {
        List<PurchaseReportDto> report = reportService.generatePurchaseReport();
        return ResponseEntity.ok().body(report);
    }
}