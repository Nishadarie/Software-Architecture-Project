package com.bookfair.dto;

import lombok.Data;

@Data
public class StallsBySizeDto {
    public String size;      // Small/Medium/Large
    public long total;
    public long reserved;
    public long available;
    public long revenue;
}