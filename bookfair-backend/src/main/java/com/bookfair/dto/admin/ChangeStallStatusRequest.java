package com.bookfair.dto.admin;

import lombok.Data;

@Data
public class ChangeStallStatusRequest {
    private String status; // AVAILABLE / BLOCKED / UNAVAILABLE
}