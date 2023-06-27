package rw.souvenir.ne.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.souvenir.ne.models.Cart;
import rw.souvenir.ne.payload.ApiResponse;
import rw.souvenir.ne.services.CartService;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
    @PostMapping("/add/{productId}/{quantity}")
    public ResponseEntity<ApiResponse> addItemToCart(@PathVariable Long productId, @PathVariable int quantity) {
        ApiResponse response = cartService.addItemToCart(productId, quantity);
        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
    @GetMapping
    public Cart getCart() {
        return cartService.getCart();
    }

    @PostMapping("/remove/{productId}")
    public void removeItemFromCart(@PathVariable Long productId) {
        cartService.removeItemFromCart(productId);
    }
    @PostMapping("/checkout")
    public void checkout() {
        cartService.checkout();
    }
}