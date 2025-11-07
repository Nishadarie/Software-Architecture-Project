package com.bookfair.entity;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.*;

@Data
@Entity
@Table(name = "stalls")
public class Stall {
    @Id
    private String id = UUID.randomUUID().toString();

    private String name;
    private String size;
    private String status = "AVAILABLE";
    private Integer mapX;
    private Integer mapY;
    private Integer price;
}
