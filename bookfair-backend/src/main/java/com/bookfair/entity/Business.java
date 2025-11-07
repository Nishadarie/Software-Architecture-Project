package com.bookfair.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.*;

@Data
@Entity
@Table(name = "businesses")
public class Business {
    @Id
    private String id = UUID.randomUUID().toString();
    private String name;
    private String contactEmail;
    private String contactPhone;
}
