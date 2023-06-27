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

    @Column(name = "product_id")
    private Long productId;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation")
    private EOperation operation;
    private int quantity;
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", insertable = false, updatable = false, referencedColumnName = "id")
    private Product product;

    public Quantity() {

    }

    public Quantity(Long productId, EOperation operation, int quantity, LocalDate date) {
        this.productId = productId;
        this.operation = operation;
        this.quantity = quantity;
        this.date = date;
    }

    @Override
    public String toString() {
        return "Quantity{" +
                "id=" + id +
                ", productId='" + productId + '\'' +
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

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
