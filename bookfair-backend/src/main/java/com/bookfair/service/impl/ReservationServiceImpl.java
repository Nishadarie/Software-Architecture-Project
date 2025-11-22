package com.bookfair.service.impl;

import com.bookfair.dto.ReservationRequest;
import com.bookfair.dto.ReservationResponse;
import com.bookfair.entity.Reservation;
import com.bookfair.entity.Stall;
import com.bookfair.repository.ReservationRepository;
import com.bookfair.repository.StallRepository;
import com.bookfair.service.ReservationService;
import com.bookfair.util.QRCodeGenerator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final StallRepository stallRepository;
    private final QRCodeGenerator qrCodeGenerator;

    public ReservationServiceImpl(ReservationRepository reservationRepository, 
                                  StallRepository stallRepository,
                                  QRCodeGenerator qrCodeGenerator) {
        this.reservationRepository = reservationRepository;
        this.stallRepository = stallRepository;
        this.qrCodeGenerator = qrCodeGenerator;
    }

    @Override
    @Transactional
    public ReservationResponse createReservation(ReservationRequest req) {
        Objects.requireNonNull(req, "ReservationRequest cannot be null");

        Reservation reservation = new Reservation();
        reservation.setBusinessId(Objects.requireNonNull(req.businessId, "Business ID is required"));
        reservation.setUserId(Objects.requireNonNull(req.userId, "User ID is required"));

        final String stallId;
        final String stallName;
        
        if (req.stallIds != null && !req.stallIds.isEmpty()) {
            stallId = req.stallIds.get(0);
            reservation.setStallId(stallId);
            
            // Update stall status to RESERVED
            Stall stall = stallRepository.findById(stallId)
                    .orElseThrow(() -> new RuntimeException("Stall not found: " + stallId));
            stall.setStatus("RESERVED");
            stallRepository.save(stall);
            stallName = stall.getName() != null ? stall.getName() : stallId;
        } else {
            stallId = null;
            stallName = null;
        }

        Reservation saved = reservationRepository.save(reservation);

        // Generate QR code immediately upon reservation creation
        String qrCodeBase64 = qrCodeGenerator.generateBase64ForReservation(saved);

        ReservationResponse response = new ReservationResponse();
        response.success = true;
        response.reservationId = saved.getId();
        response.status = saved.getStatus();
        response.qrCodeBase64 = qrCodeBase64;
        response.stallId = stallId;
        response.stallName = stallName;

        return response;
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
