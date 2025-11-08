package com.bookfair.service.impl;

import com.bookfair.dto.AuthResponse;
import com.bookfair.dto.LoginRequest;
import com.bookfair.dto.RegisterRequest;
import com.bookfair.entity.User;
import com.bookfair.repository.UserRepository;
import com.bookfair.service.AuthService;
import com.bookfair.util.JwtUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest req) {
        // check if email already exists
        if (userRepository.findByEmail(req.email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // create user
        User user = new User();
        user.setName(req.name);
        user.setEmail(req.email);
        user.setPassword(passwordEncoder.encode(req.password));
        user.setRole("USER");
        user.setBusinessId(req.businessId);
        user.setBusinessName(req.businessName);
        user.setPhone(req.phone);

        userRepository.save(user);

        // generate tokens
        String accessToken = jwtUtils.generateToken(String.valueOf(user.getId()), user.getRole());
        String refreshToken = jwtUtils.generateRefreshToken(String.valueOf(user.getId()), user.getRole());

        AuthResponse response = new AuthResponse();
        response.accessToken = accessToken;
        response.refreshToken = refreshToken;
        response.message = "User registered successfully!";
        response.tokenType = "Bearer";
        return response;
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(req.password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String accessToken = jwtUtils.generateToken(String.valueOf(user.getId()), user.getRole());
        String refreshToken = jwtUtils.generateRefreshToken(String.valueOf(user.getId()), user.getRole());

        AuthResponse response = new AuthResponse();
        response.accessToken = accessToken;
        response.refreshToken = refreshToken;
        response.message = "Login successful!";
        response.tokenType = "Bearer";
        return response;
    }
}
