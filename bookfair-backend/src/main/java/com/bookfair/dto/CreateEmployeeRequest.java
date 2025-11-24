package com.bookfair.dto;

import lombok.Data;

@Data
public class CreateEmployeeRequest {
    public String name;
    public String email;
    public String phone;
    public String password;
}