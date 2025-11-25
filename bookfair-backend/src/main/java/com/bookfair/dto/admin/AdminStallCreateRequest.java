package com.bookfair.dto.admin;

import lombok.Data;

@Data
public class AdminStallCreateRequest {
    private String name;      // Stall name e.g. A15
    private String size;      // Small / Medium / Large
    private Integer price;
    private Integer mapX;     // Optional map coordinate
    private Integer mapY;
}