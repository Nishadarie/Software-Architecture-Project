package com.bookfair.service;

import com.bookfair.dto.ReservationRequest;
import com.bookfair.dto.ReservationResponse;
import com.bookfair.entity.Reservation;

public interface ReservationService {
    ReservationResponse createReservation(ReservationRequest req);
    Reservation confirmReservation(String reservationId);
}
