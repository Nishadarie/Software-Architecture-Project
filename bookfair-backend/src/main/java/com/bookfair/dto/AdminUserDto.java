package com.bookfair.dto;

import lombok.Data;

@Data
public class AdminUserDto {
    private String id;
    private String name;
    private String email;
    private String role;
    private String status;
    private String businessId;
    private String businessName;
    private String phone;
}