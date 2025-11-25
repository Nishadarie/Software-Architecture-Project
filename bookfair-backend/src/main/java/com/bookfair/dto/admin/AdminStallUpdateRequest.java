package com.bookfair.dto.admin;

import lombok.Data;

@Data
public class AdminStallUpdateRequest {
    private String name;
    private String size;
    private Integer price;
    private String status;    // AVAILABLE / RESERVED / BLOCKED
    private Integer mapX;
    private Integer mapY;
}