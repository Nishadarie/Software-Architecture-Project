package com.bookfair.service.impl;

import com.bookfair.dto.payment.PaymentRequest;
import com.bookfair.dto.payment.PaymentResponse;
import com.bookfair.service.PaymentService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Override
    public PaymentResponse processPayment(PaymentRequest req) {
        PaymentResponse res = new PaymentResponse();

        // Simulate random gateway behavior
        boolean approved = Math.random() > 0.2; // 80% success rate

        res.setTransactionId(UUID.randomUUID().toString());

        if (approved) {
            res.setSuccess(true);
            res.setMessage("Dummy payment approved");
        } else {
            res.setSuccess(false);
            res.setMessage("Dummy payment declined");
        }

        return res;
    }
}