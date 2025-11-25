package com.bookfair.dto.payment;

import lombok.Data;

@Data
public class PaymentRequest {
    private String reservationId;
    private int amount;
    private String method; // CARD, CASH, SIMULATED
}