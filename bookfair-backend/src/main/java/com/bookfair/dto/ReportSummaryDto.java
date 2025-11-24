package com.bookfair.dto;

import lombok.Data;

@Data
public class ReportSummaryDto {
    public long totalStalls;
    public long availableStalls;
    public long reservedStalls;

    public long confirmedReservations;
    public long pendingReservations;

    public long businessCount;
    public long employeeCount;

    public long totalRevenue;
}