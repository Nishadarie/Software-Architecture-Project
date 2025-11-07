package com.bookfair.controller;

import com.bookfair.dto.LoginRequest;
import com.bookfair.dto.RegisterRequest;
import com.bookfair.dto.AuthResponse;
import com.bookfair.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("message", response.message);
        resp.put("accessToken", response.accessToken);
        resp.put("refreshToken", response.refreshToken);
        resp.put("tokenType", response.tokenType);
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("message", response.message);
        resp.put("accessToken", response.accessToken);
        resp.put("refreshToken", response.refreshToken);
        resp.put("tokenType", response.tokenType);
        return ResponseEntity.ok(resp);
    }
}