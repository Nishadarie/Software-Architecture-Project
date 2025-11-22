package com.bookfair.controller;

import com.bookfair.dto.ReservationRequest;
import com.bookfair.dto.ReservationResponse;
import com.bookfair.entity.Reservation;
import com.bookfair.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationResponse> create(@RequestBody ReservationRequest req){
        try {
            // Extract userId from authenticated user (JWT token)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getPrincipal() != null) {
                String userId = authentication.getPrincipal().toString();
                req.userId = userId;
            }
            
            ReservationResponse resp = reservationService.createReservation(req);
            resp.success = true;
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            ReservationResponse errorResp = new ReservationResponse();
            errorResp.success = false;
            errorResp.status = "FAILED";
            errorResp.reservationId = null;
            // Include error message for debugging
            errorResp.message = ex.getMessage();
            return ResponseEntity.badRequest()
                    .body(errorResp);
        }
    }

    @PostMapping("/{id}/confirm")
    public ResponseEntity<ReservationResponse> confirm(@PathVariable("id") String id){
        try {
            Reservation updated = reservationService.confirmReservation(id);

            ReservationResponse resp = new ReservationResponse();
            resp.success = true;
            resp.reservationId = updated.getId();
            resp.status = updated.getStatus();

            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            ReservationResponse errorResp = new ReservationResponse();
            errorResp.success = false;
            errorResp.reservationId = id;
            errorResp.status = "FAILED";
            return ResponseEntity.badRequest().body(errorResp);
        }
    }
}
