package rw.souvenir.ne.models;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "purchased")
public class Purchased {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_code")
    private String productCode;

    private int quantity;
    private double total;
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_code", insertable = false, updatable = false, referencedColumnName = "code")
    private Product product;

    // Constructors, getters, and setters

    public Purchased() {
    }

    public Purchased(String productCode, int quantity, double total, LocalDate date) {
        this.productCode = productCode;
        this.quantity = quantity;
        this.total = total;
        this.date = date;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
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
