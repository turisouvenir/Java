package rw.souvenir.ne.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.souvenir.ne.models.Quantity;

public interface QuantityRepository extends JpaRepository<Quantity, Long> {
}
