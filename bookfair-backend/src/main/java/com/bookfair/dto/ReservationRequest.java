package com.bookfair.dto;
import lombok.Data;
import java.util.List;

@Data
public class ReservationRequest {
    public String businessId;
    public String userId;
    public String stallId;
    public List<String> stallIds;
}
