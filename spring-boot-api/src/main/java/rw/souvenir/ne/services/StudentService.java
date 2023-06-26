package rw.souvenir.ne.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import rw.souvenir.ne.models.Student;
import rw.souvenir.ne.repositories.StudentRepository;

import java.util.List;
import java.util.UUID;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public void addStudent(Student student) {
        studentRepository.save(student);
    }

    public List<Student> listStudents() {
        return studentRepository.findAll();
    }

    public void deleteStudent(Student student) {
        studentRepository.delete(student);
    }

    public Student getStudentById(UUID studentId) {
        return studentRepository.findById(studentId).orElse(null);
    }

    public Student findStudentByEmail(String email) {
        return studentRepository.getStudentByEmail(email);
    }

    public void updateStudent(Student student) {
        studentRepository.save(student);
    }

    public Page<Student> listStudentsByPage() {
        Sort sort = Sort.by(Sort.Direction.ASC, "firstName")
                .and(Sort.by(Sort.Direction.DESC, "lastName"));
        PageRequest pageRequest = PageRequest.of(0, 10, sort);
        return studentRepository.findAll(pageRequest);
    }
}

