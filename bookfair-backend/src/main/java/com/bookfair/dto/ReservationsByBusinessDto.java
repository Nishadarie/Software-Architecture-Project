package com.bookfair.dto;

import lombok.Data;

@Data
public class ReservationsByBusinessDto {
    public String businessId;
    public String businessName;
    public long totalReservations;
    public long confirmedReservations;
    public long pendingReservations;
    public long totalSpent;
}