package rw.souvenir.ne.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.souvenir.ne.models.Student;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    Student getStudentByEmail(String email);

    Optional<Student> findById(UUID studentId);
}

