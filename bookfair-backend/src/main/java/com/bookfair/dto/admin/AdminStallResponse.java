package com.bookfair.dto.admin;

import lombok.Data;

@Data
public class AdminStallResponse {
    private String id;
    private String name;
    private String size;
    private String status;
    private Integer price;
    private Integer mapX;
    private Integer mapY;
    private String reservedBy;     // Business/Person
    private String reservedUserId; // User who reserved
}