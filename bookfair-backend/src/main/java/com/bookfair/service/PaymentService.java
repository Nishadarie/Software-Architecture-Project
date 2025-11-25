package com.bookfair.service;

import com.bookfair.dto.payment.PaymentRequest;
import com.bookfair.dto.payment.PaymentResponse;

public interface PaymentService {
    PaymentResponse processPayment(PaymentRequest request);
}