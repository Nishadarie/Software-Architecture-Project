package com.bookfair.service;

import com.bookfair.dto.StallDto;
import java.util.List;

public interface StallService {
    List<StallDto> listAll();
    StallDto create(StallDto dto);
    int initializeDefaultStalls();
}
