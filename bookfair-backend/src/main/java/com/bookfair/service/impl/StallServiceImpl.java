package com.bookfair.service.impl;

import com.bookfair.dto.StallDto;
import com.bookfair.entity.Reservation;
import com.bookfair.entity.Stall;
import com.bookfair.entity.User;
import com.bookfair.repository.ReservationRepository;
import com.bookfair.repository.StallRepository;
import com.bookfair.repository.UserRepository;
import com.bookfair.service.StallService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class StallServiceImpl implements StallService {

    private final StallRepository stallRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public StallServiceImpl(StallRepository stallRepository, 
                           ReservationRepository reservationRepository,
                           UserRepository userRepository) {
        this.stallRepository = stallRepository;
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
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
            s.setPrice(dto.getPrice());
            s.setStatus("AVAILABLE");

            Stall saved = stallRepository.save(s);
            log.info("Stall created successfully: {}", saved.getId());

            return toDto(saved);
        } catch (Exception ex) {
            log.error("Failed to create stall", ex);
            throw new RuntimeException("Failed to create stall: " + ex.getMessage());
        }
    }

    @Override
    @Transactional
    public int initializeDefaultStalls() {
        try {
            // Check if stalls already exist
            long existingCount = stallRepository.count();
            if (existingCount > 0) {
                log.info("Stalls already exist ({}), skipping initialization", existingCount);
                return (int) existingCount;
            }

            int created = 0;
            // Create A01-A80 stalls
            for (int i = 1; i <= 80; i++) {
                Stall stall = new Stall();
                stall.setName(String.format("A%02d", i));
                String size = i <= 30 ? "Small" : i <= 55 ? "Medium" : "Large";
                stall.setSize(size);
                stall.setPrice(i <= 30 ? 10000 : i <= 55 ? 15000 : 25000);
                stall.setStatus("AVAILABLE");
                stallRepository.save(stall);
                created++;
            }

            // Create B81-B138 stalls
            for (int i = 81; i <= 138; i++) {
                Stall stall = new Stall();
                stall.setName("B" + i);
                String size = i <= 100 ? "Small" : i <= 120 ? "Medium" : "Large";
                stall.setSize(size);
                stall.setPrice(i <= 100 ? 10000 : i <= 120 ? 15000 : 25000);
                stall.setStatus("AVAILABLE");
                stallRepository.save(stall);
                created++;
            }

            log.info("Initialized {} stalls successfully", created);
            return created;
        } catch (Exception ex) {
            log.error("Failed to initialize stalls", ex);
            throw new RuntimeException("Failed to initialize stalls: " + ex.getMessage());
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
        d.setPrice(s.getPrice());
        
        // Find reservation for this stall
        Optional<Reservation> reservationOpt = reservationRepository
                .findByStallIdAndStatus(s.getId(), "CONFIRMED")
                .or(() -> reservationRepository.findByStallId(s.getId())
                        .stream()
                        .filter(r -> r.getStatus().equals("PENDING") || r.getStatus().equals("CONFIRMED"))
                        .findFirst());
        
        if (reservationOpt.isPresent()) {
            Reservation reservation = reservationOpt.get();
            // Find user who made the reservation
            Optional<User> userOpt = userRepository.findById(reservation.getUserId());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                d.setReservedBy(user.getBusinessName() != null ? user.getBusinessName() : user.getName());
                d.setContact(user.getEmail());
            }
        } else {
            d.setReservedBy("-");
            d.setContact("-");
        }
        
        return d;
    }
}
