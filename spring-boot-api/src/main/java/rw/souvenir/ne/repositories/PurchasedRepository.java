package rw.souvenir.ne.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.souvenir.ne.models.Purchased;

public interface PurchasedRepository extends JpaRepository<Purchased, Long> {
}
