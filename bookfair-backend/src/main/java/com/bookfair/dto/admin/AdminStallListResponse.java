package com.bookfair.dto.admin;

import lombok.Data;
import java.util.List;

@Data
public class AdminStallListResponse {
    private boolean success;
    private List<AdminStallResponse> stalls;
}