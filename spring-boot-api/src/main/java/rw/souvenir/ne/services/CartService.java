package rw.souvenir.ne.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.souvenir.ne.models.Cart;
import rw.souvenir.ne.models.CartItem;
import rw.souvenir.ne.models.Product;
import rw.souvenir.ne.models.Purchased;
import rw.souvenir.ne.repositories.ProductRepository;
import rw.souvenir.ne.repositories.PurchasedRepository;

import java.util.*;
@Service
public class CartService {
    private final Map<Long, CartItem> cartItems = new HashMap<>();
    private final PurchasedRepository purchaseRepository;
    private IUserService userService;
    @Autowired
    public CartService(PurchasedRepository purchaseRepository, IUserService userService, ProductRepository productRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userService = userService;
        this.productRepository = productRepository;
    }
    //product repository
    private final ProductRepository productRepository;
    public CartService(PurchasedRepository purchaseRepository, ProductRepository productRepository) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
    }

    public void addItemToCart(Long productId, int quantity) {
        // Check if the item is already in the cart
        if (cartItems.containsKey(productId)) {
            CartItem existingItem = cartItems.get(productId);
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            existingItem.setTotalPrice(existingItem.getTotalPrice() + (existingItem.getQuantity() * getProductPrice(productId)));
        } else {
            CartItem newItem = new CartItem(productId, quantity, quantity * getProductPrice(productId));
            cartItems.put(productId, newItem);
        }
    }

    public void removeItemFromCart(Long productId) {
        if (cartItems.containsKey(productId)) {
            cartItems.remove(productId);
        }
    }

    public Cart getCart() {
        List<CartItem> cartItemList = new ArrayList<>(cartItems.values());
        Cart cart = new Cart();
        cart.setItems(cartItemList);
        return cart;
    }
    private double getProductPrice(Long productId) {
        // Fetch the product from the database using the product repository
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            return product.getPrice();
        }
        return 0.0; // Return a default price if the product is not found
    }
    public void checkout() {
        List<Purchased> purchases = new ArrayList<>();
        for (CartItem cartItem : cartItems.values()) {
            Product product = productRepository.findById(cartItem.getProductId()).orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + cartItem.getProductId()));
            Purchased purchased = new Purchased();
            purchased.setQuantity(cartItem.getQuantity());
            purchased.setTotal(cartItem.getTotalPrice());
            purchased.setProductId(cartItem.getProductId());
            purchased.setUserId(userService.getLoggedInUser().getId());
            purchased.setDate(new Date());
            purchases.add(purchased);
        }
        purchaseRepository.saveAll(purchases);
        cartItems.clear();
    }
}