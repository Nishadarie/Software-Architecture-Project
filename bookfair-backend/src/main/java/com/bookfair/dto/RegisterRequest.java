package com.bookfair.dto;
import lombok.Data;

@Data
public class RegisterRequest {
    public String name;
    public String email;
    public String password;
    public String businessName;
}
