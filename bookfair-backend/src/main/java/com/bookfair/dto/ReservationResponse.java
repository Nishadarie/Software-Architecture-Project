package com.bookfair.dto;
import lombok.Data;

@Data
public class ReservationResponse {
    public boolean success;
    public String reservationId;
    public String status;
    public String qrCodeBase64; // Base64 encoded QR code image
    public String stallId;
    public String stallName;
    public String message; // Error or success message
    public String error; // Error message
}
