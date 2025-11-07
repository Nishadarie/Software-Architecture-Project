package com.bookfair.dto;
import lombok.Data;

@Data
public class AuthResponse {
    public String accessToken;
    public String refreshToken;
    public String tokenType = "Bearer";
    public String message;
}
