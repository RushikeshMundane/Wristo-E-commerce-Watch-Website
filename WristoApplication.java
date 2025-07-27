package com.wristo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WristoApplication { // ✅ This must match the file name
    public static void main(String[] args) {
        SpringApplication.run(WristoApplication.class, args);
        System.out.println("Connection successful");
    }
}
