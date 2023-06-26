package rw.souvenir.ne.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rw.souvenir.ne.models.Quantity;
import rw.souvenir.ne.payload.ApiResponse;
import rw.souvenir.ne.repositories.QuantityRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class QuantityController {
    @Autowired
    private QuantityRepository quantityRepository;

    @GetMapping("/quantities")
    public ResponseEntity<ApiResponse> getAllQuantities() {
        List<Quantity> quantities = quantityRepository.findAll();
        if (quantities.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(ApiResponse.fail("No quantities found."));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(quantities));
    }

    @GetMapping("/quantities/{id}")
    public ResponseEntity<ApiResponse> getQuantityById(@PathVariable("id") long id) {
        Optional<Quantity> quantityData = quantityRepository.findById(id);
        if (quantityData.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(quantityData.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.fail("Quantity not found with id: " + id));
        }
    }

    @PostMapping("/quantities")
    public ResponseEntity<ApiResponse> createNewOperation(@RequestBody Quantity quantity) {
        try {
            System.out.println(quantity);
            Quantity newQuantity = quantityRepository.save(quantity);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(newQuantity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Failed to create quantity."));
        }
    }
}
