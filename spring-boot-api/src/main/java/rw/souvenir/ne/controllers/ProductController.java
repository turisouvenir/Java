package rw.souvenir.ne.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rw.souvenir.ne.models.Product;
import rw.souvenir.ne.payload.ApiResponse;
import rw.souvenir.ne.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public ResponseEntity<ApiResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(ApiResponse.fail("No products found."));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(products));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable("id") long id) {
        Optional<Product> productData = productRepository.findById(id);
        if (productData.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(productData.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.fail("Product not found with id: " + id));
        }
    }

    @PostMapping("/products")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> registerNewProduct(@RequestBody Product product) {
        // Check if a product with the same code or name already exists
        if (productRepository.existsByCodeOrName(product.getCode(), product.getName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.fail("Product with the same code or name already exists."));
        }

        try {
            Product newProduct = productRepository.save(product);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(newProduct));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Failed to create product."));
        }
    }

    @PutMapping("/products/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable("id") long id, @RequestBody Product product) {
        Optional<Product> productData = productRepository.findById(id);
        if (productData.isPresent()) {
            Product updatedProduct = productData.get();
            updatedProduct.setCode(product.getCode());
            updatedProduct.setName(product.getName());
            updatedProduct.setProductType(product.getProductType());
            updatedProduct.setPrice(product.getPrice());
            updatedProduct.setInDate(product.getInDate());
            updatedProduct.setImage(product.getImage());

            Product savedProduct = productRepository.save(updatedProduct);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(savedProduct));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.fail("Product not found with id: " + id));
        }
    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("id") long id) {
        Optional<Product> productData = productRepository.findById(id);
        if (productData.isPresent()) {
            productRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success("Product deleted successfully."));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.fail("Product not found with id: " + id));
        }
    }
}
