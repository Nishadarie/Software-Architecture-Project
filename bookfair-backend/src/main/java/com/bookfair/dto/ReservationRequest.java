package com.bookfair.dto;
import lombok.Data;
import java.util.List;

@Data
public class ReservationRequest {
    public String businessId;
    public String userId;
    public List<String> stallIds;
}
