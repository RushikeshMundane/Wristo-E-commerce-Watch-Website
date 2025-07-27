package com.wristo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:8080")
public class CartController {

    @Autowired
    private CartRepository cartRepo;

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartItem item) {
        return cartRepo.save(item);
    }

    @GetMapping
    public List<CartItem> viewCart(@RequestParam Long userId) {
        return cartRepo.findByUserId(userId);
    }
}