package rw.souvenir.ne.models;
import rw.souvenir.ne.enums.EOperation;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "quantities")
public class Quantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_code")
    private String productCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation")
    private EOperation operation;
    private int quantity;
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_code", insertable = false, updatable = false, referencedColumnName = "code")
    private Product product;

    public Quantity() {

    }

    public Quantity(String productCode, EOperation operation, int quantity, LocalDate date) {
        this.productCode = productCode;
        this.operation = operation;
        this.quantity = quantity;
        this.date = date;
    }

    @Override
    public String toString() {
        return "Quantity{" +
                "id=" + id +
                ", productCode='" + productCode + '\'' +
                ", operation=" + operation +
                ", quantity=" + quantity +
                ", date=" + date +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public EOperation getOperation() {
        return operation;
    }

    public void setOperation(EOperation operation) {
        this.operation = operation;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
