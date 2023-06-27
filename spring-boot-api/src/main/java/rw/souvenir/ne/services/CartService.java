package rw.souvenir.ne.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import rw.souvenir.ne.enums.EOperation;
import rw.souvenir.ne.models.*;
import rw.souvenir.ne.payload.ApiResponse;
import rw.souvenir.ne.repositories.ProductRepository;
import rw.souvenir.ne.repositories.PurchasedRepository;
import rw.souvenir.ne.repositories.QuantityRepository;

import java.util.*;
@Service
public class CartService {
    private final Map<Long, CartItem> cartItems = new HashMap<>();
    private final PurchasedRepository purchaseRepository;
    private JdbcTemplate jdbcTemplate;
    private IUserService userService;

    private QuantityRepository quantityRepository;
    @Autowired
    public CartService(PurchasedRepository purchaseRepository, IUserService userService, ProductRepository productRepository, QuantityRepository quantityRepository, JdbcTemplate jdbcTemplate) {
        this.purchaseRepository = purchaseRepository;
        this.userService = userService;
        this.productRepository = productRepository;
        this.quantityRepository=quantityRepository;
        this.jdbcTemplate=jdbcTemplate;
    }
    //product repository
    private final ProductRepository productRepository;
    public CartService(PurchasedRepository purchaseRepository, ProductRepository productRepository) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
    }

    public ApiResponse addItemToCart(Long productId, int quantity) {
        // Check if the item is already in the cart
        if (cartItems.containsKey(productId)) {
            CartItem existingItem = cartItems.get(productId);
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            existingItem.setTotalPrice(existingItem.getTotalPrice() + (existingItem.getQuantity() * getProductPrice(productId)));
        } else {
            int availableQuantity = quantityAvailable(productId);
            if (availableQuantity < quantity) {
                return ApiResponse.fail("Requested quantity is not available");
            }

            CartItem newItem = new CartItem(productId, quantity, quantity * getProductPrice(productId));
            cartItems.put(productId, newItem);
        }

        return ApiResponse.success("Item added to cart successfully");
    }
    private int quantityAvailable(Long productId) {
        // Query to fetch the available quantity for the product from the quantities table
        String query = "SELECT SUM(CASE WHEN operation = 'IN' THEN quantity ELSE -quantity END) AS available_quantity " +
                "FROM quantities WHERE product_id = ?";

        // Execute the query and retrieve the available quantity
        Integer availableQuantity = jdbcTemplate.queryForObject(query, new Object[]{productId}, Integer.class);

        return availableQuantity != null ? availableQuantity : 0;
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
        List<Quantity> quantities = new ArrayList<>(); // New list for quantities

        for (CartItem cartItem : cartItems.values()) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + cartItem.getProductId()));

            Purchased purchased = new Purchased();
            purchased.setQuantity(cartItem.getQuantity());
            purchased.setTotal(cartItem.getTotalPrice());
            purchased.setProductId(cartItem.getProductId());
            purchased.setUserId(userService.getLoggedInUser().getId());
            purchased.setDate(new Date());
            purchases.add(purchased);

            // Create Quantity object and add it to the quantities list
            Quantity quantity = new Quantity();
            quantity.setProductId(cartItem.getProductId());
            quantity.setQuantity(cartItem.getQuantity());
            quantity.setOperation(EOperation.OUT); // Set operation to "OUT"
            quantity.setDate(new Date()); // Set date to current date
            quantities.add(quantity);
        }

        // Save purchases and quantities
        purchaseRepository.saveAll(purchases);
        quantityRepository.saveAll(quantities); // Assuming quantityRepository is the repository for the quantities table

        cartItems.clear();
    }
}