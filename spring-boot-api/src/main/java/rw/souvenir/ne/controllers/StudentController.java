package rw.souvenir.ne.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import rw.souvenir.ne.models.Student;
import rw.souvenir.ne.services.StudentService;
import rw.souvenir.ne.payload.ApiResponse;

import java.util.List;
import java.util.UUID;


@Slf4j
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public ApiResponse addStudent(@RequestBody Student student) {
        Student studentWithSameEmail = studentService.findStudentByEmail(student.getEmail());
        if (studentWithSameEmail == null) {
            studentService.addStudent(student);
            log.info("CREATING STUDENT");
            return ApiResponse.success("Student created successfully");
        }
        return ApiResponse.fail("Student with the same email already exists");
    }

    @GetMapping
    public ApiResponse listStudents() {
        List<Student> students = studentService.listStudents();
        log.info("Getting the list of students");
        return ApiResponse.success(students);
    }

    @GetMapping("/{studentId}")
    public ApiResponse getStudentById(@PathVariable UUID studentId) {
        Student student = studentService.getStudentById(studentId);
        if (student != null) {
            return ApiResponse.success(student);
        }
        return ApiResponse.fail("Student not found");
    }

    @GetMapping("/email/{email}")
    public ApiResponse findStudentByEmail(@PathVariable String email) {
        Student student = studentService.findStudentByEmail(email);
        if (student != null) {
            return ApiResponse.success(student);
        } else {
            return ApiResponse.fail("Student not found");
        }
    }

    @GetMapping("/page")
    public ApiResponse listStudentsByPage() {
        Page<Student> students = studentService.listStudentsByPage();
        return ApiResponse.success(students);
    }

    @DeleteMapping("/{studentId}")
    public ApiResponse deleteStudent(@PathVariable UUID studentId) {
        Student student = studentService.getStudentById(studentId);
        if (student != null) {
            studentService.deleteStudent(student);
            return ApiResponse.success(student);
        }
        return ApiResponse.fail("Student not found");
    }

    @PutMapping("/{studentId}")
    public ApiResponse updateStudent(@PathVariable UUID studentId, @RequestBody Student updatedStudent) {
        Student student = studentService.getStudentById(studentId);
        if (student != null) {
            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setAge(updatedStudent.getAge());
            student.setEmail(updatedStudent.getEmail());
            // Update other properties as needed

            studentService.updateStudent(student);
            return ApiResponse.success(student);
        }
        return ApiResponse.fail("Student with the given Id not found");
    }
}
