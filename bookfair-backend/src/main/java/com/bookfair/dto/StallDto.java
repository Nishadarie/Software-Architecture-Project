package com.bookfair.dto;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class StallDto {
    @Id
    private String id;
    public String name;
    public String size;
    public String status;
    public Integer mapX;
    public Integer mapY;
    public Integer price;
    public String reservedBy; // Business name of the user who reserved
    public String contact; // Email of the user who reserved

}
