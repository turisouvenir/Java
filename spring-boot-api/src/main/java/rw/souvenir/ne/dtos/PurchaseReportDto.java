package rw.souvenir.ne.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseReportDto {
    private Long id;
    private String customerName;
    private Date date;
    private Long productId;
    private String productName;
    private int quantity;
    private double totalPrice;
}