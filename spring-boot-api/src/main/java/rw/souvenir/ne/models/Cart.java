package rw.souvenir.ne.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Data
@NoArgsConstructor
public class Cart {
    private List<CartItem> items;
}