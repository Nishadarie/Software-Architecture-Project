package com.bookfair.service.impl;

import com.bookfair.dto.StallDto;
import com.bookfair.entity.Stall;
import com.bookfair.repository.StallRepository;
import com.bookfair.service.StallService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class StallServiceImpl implements StallService {

    private final StallRepository stallRepository;

    public StallServiceImpl(StallRepository stallRepository) {
        this.stallRepository = stallRepository;
    }

    @Override
    public List<StallDto> listAll() {
        try {
            return stallRepository.findAll()
                    .stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            log.error("Failed to list stalls", ex);
            throw new RuntimeException("Could not fetch stalls: " + ex.getMessage());
        }
    }

    @Override
    @Transactional
    public StallDto create(StallDto dto) {
        try {
            if (dto.getName() == null || dto.getName().isEmpty()) {
                throw new RuntimeException("Stall name cannot be empty");
            }

            Stall s = new Stall();
            s.setName(dto.getName());
            s.setSize(dto.getSize());
            s.setMapX(dto.getMapX());
            s.setMapY(dto.getMapY());

            Stall saved = stallRepository.save(s);
            log.info("Stall created successfully: {}", saved.getId());

            return toDto(saved);
        } catch (Exception ex) {
            log.error("Failed to create stall", ex);
            throw new RuntimeException("Failed to create stall: " + ex.getMessage());
        }
    }

    private StallDto toDto(Stall s) {
        StallDto d = new StallDto();
        d.setId(s.getId());
        d.setName(s.getName());
        d.setSize(s.getSize());
        d.setStatus(s.getStatus());
        d.setMapX(s.getMapX());
        d.setMapY(s.getMapY());
        return d;
    }
}
