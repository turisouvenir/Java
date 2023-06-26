package rw.souvenir.ne.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.souvenir.ne.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByCodeOrName(String code, String name);
}
