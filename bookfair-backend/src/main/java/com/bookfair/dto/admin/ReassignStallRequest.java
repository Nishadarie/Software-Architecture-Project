package com.bookfair.dto.admin;

import lombok.Data;

@Data
public class ReassignStallRequest {
    private String newUserId;     // user to assign
    private String newBusinessId; // business of that user
}