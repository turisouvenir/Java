package rw.souvenir.ne.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rw.souvenir.ne.enums.EOperation;
import rw.souvenir.ne.models.Purchased;
import rw.souvenir.ne.models.Quantity;
import rw.souvenir.ne.payload.ApiResponse;
import rw.souvenir.ne.repositories.PurchasedRepository;
import rw.souvenir.ne.repositories.QuantityRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class PurchasedController {
    @Autowired
    private PurchasedRepository purchasedRepository;

    @Autowired
    private QuantityRepository quantityRepository;

    @GetMapping("/purchases")
    public ResponseEntity<ApiResponse> getAllPurchases() {
        List<Purchased> purchases = purchasedRepository.findAll();
        if (purchases.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(ApiResponse.fail("No purchases found."));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(purchases));
    }

    @GetMapping("/purchases/{id}")
    public ResponseEntity<ApiResponse> getPurchaseById(@PathVariable("id") long id) {
        Optional<Purchased> purchaseData = purchasedRepository.findById(id);
        if (purchaseData.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(purchaseData.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.fail("Purchase not found with id: " + id));
        }
    }


    @PostMapping("/purchases")
    public ResponseEntity<ApiResponse> createNewPurchase(@RequestBody Purchased purchase) {
        try {
            // Save the purchased item
            Purchased newPurchase = purchasedRepository.save(purchase);

            try {
                // Create a new Quantity for the purchased product
                Quantity newQuantity = new Quantity();
                newQuantity.setProductCode(purchase.getProductCode());
                newQuantity.setQuantity(purchase.getQuantity());
                newQuantity.setOperation(EOperation.OUT);
                newQuantity.setDate(purchase.getDate());

                // Save the new Quantity
                Quantity createdQuantity = quantityRepository.save(newQuantity);

                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(ApiResponse.success(newPurchase));
            } catch (Exception e) {
                // Handle exceptions specific to Quantity creation
                System.out.println(e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(ApiResponse.fail("Failed to create quantity."));
            }
        } catch (Exception e) {
            // Handle exceptions specific to Purchased entity creation
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Failed to create purchase."));
        }
    }
}