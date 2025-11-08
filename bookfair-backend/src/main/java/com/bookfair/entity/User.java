package com.bookfair.entity;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.*;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    private String id = UUID.randomUUID().toString();

    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private String role; // USER, EMPLOYEE, ADMIN
    private String businessId;
    private String businessName; 
    private String phone;
}
