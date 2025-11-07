package com.bookfair.dto;
import lombok.Data;

@Data
public class ReservationResponse {
    public boolean success;
    public String reservationId;
    public String status;
}
