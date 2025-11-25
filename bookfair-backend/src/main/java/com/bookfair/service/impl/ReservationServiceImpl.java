package com.bookfair.service.impl;

import com.bookfair.dto.ReservationRequest;
import com.bookfair.dto.ReservationResponse;
import com.bookfair.dto.payment.PaymentRequest;
import com.bookfair.dto.payment.PaymentResponse;
import com.bookfair.entity.Audit;
import com.bookfair.entity.Reservation;
import com.bookfair.entity.Stall;
import com.bookfair.repository.AuditRepository;
import com.bookfair.repository.ReservationRepository;
import com.bookfair.repository.StallRepository;
import com.bookfair.service.PaymentService;
import com.bookfair.service.ReservationService;
import com.bookfair.util.QRCodeGenerator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Objects;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final StallRepository stallRepository;
    private final QRCodeGenerator qrCodeGenerator;
    private final PaymentService paymentService;
    private final AuditRepository auditRepository; // log payment

    public ReservationServiceImpl(ReservationRepository reservationRepository,
                                  StallRepository stallRepository,
                                  QRCodeGenerator qrCodeGenerator, PaymentService paymentService, AuditRepository auditRepository) {
        this.reservationRepository = reservationRepository;
        this.stallRepository = stallRepository;
        this.qrCodeGenerator = qrCodeGenerator;
        this.paymentService = paymentService;
        this.auditRepository = auditRepository;
    }

    @Override
    @Transactional
    public ReservationResponse createReservation(ReservationRequest request) {

        // 1. Validate stall selection
        if (request.getStallIds() == null || request.getStallIds().isEmpty()) {
            throw new RuntimeException("No stall selected");
        }

        String stallId = request.getStallIds().get(0);  // temporarily support single stall

        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if (!"AVAILABLE".equalsIgnoreCase(stall.getStatus())) {
            throw new RuntimeException("Selected stall is not available");
        }

        // 2. Create reservation with PENDING_PAYMENT
        Reservation reservation = new Reservation();
        reservation.setStatus("PENDING_PAYMENT");
        reservation.setBusinessId(request.getBusinessId());
        reservation.setStallId(stallId);
        reservation.setUserId(request.getUserId());

        reservation = reservationRepository.save(reservation);

        // 3. Prepare payment
        PaymentRequest payReq = new PaymentRequest();
        payReq.setAmount(stall.getPrice());
        payReq.setReservationId(reservation.getId());
        payReq.setMethod("SIMULATED");

        // 4. Process payment (dummy gateway)
        PaymentResponse payRes = paymentService.processPayment(payReq);

        if (!payRes.isSuccess()) {

            // Payment failed → cancel reservation
            reservation.setStatus("CANCELLED");
            reservationRepository.save(reservation);

            logPayment(reservation.getId(),
                    "PAYMENT_FAILED: " + payRes.getMessage());

            throw new RuntimeException("Payment failed: " + payRes.getMessage());
        }

        // 5. Payment successful → confirm reservation
        reservation.setStatus("CONFIRMED");
        reservationRepository.save(reservation);

        // Update stall to RESERVED
        stall.setStatus("RESERVED");
        stallRepository.save(stall);

        logPayment(reservation.getId(),
                "PAYMENT_SUCCESS: " + payRes.getTransactionId());

        // 6. Return QR Code response
        return generateQrForReservation(reservation);
    }

    private ReservationResponse generateQrForReservation(Reservation reservation) {
        String qr = qrCodeGenerator.generateBase64ForReservation(reservation);
        ReservationResponse resp = new ReservationResponse();
        resp.setReservationId(reservation.getId());
        resp.setQrCodeBase64(qr);
        return resp;
    }

    private void logPayment(String reservationId, String details) {
        Audit a = new Audit();
        a.setAction("RESERVATION_PAYMENT");
        a.setTargetType("RESERVATION");
        a.setTargetId(reservationId);
        a.setDetails(details);
        a.setPerformedBy("SYSTEM");
        a.setTimestamp(Instant.now());
        auditRepository.save(a);
    }

    @Override
    @Transactional
    public Reservation confirmReservation(String reservationId) {
        if (reservationId == null || reservationId.trim().isEmpty()) {
            throw new IllegalArgumentException("Reservation ID cannot be null or empty");
        }

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus("CONFIRMED");
        Reservation updated = reservationRepository.save(reservation);

        // Generate QR code
        qrCodeGenerator.generateForReservation(updated);

        return updated;
    }
}
