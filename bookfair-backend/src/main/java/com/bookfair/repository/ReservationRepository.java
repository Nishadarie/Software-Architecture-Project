package com.bookfair.repository;

import com.bookfair.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, String> {
    List<Reservation> findByBusinessIdAndStatus(String businessId, String status);
    Optional<Reservation> findByStallIdAndStatus(String stallId, String status);
    List<Reservation> findByStallId(String stallId);
    long countByStatus(String status);
    List<Reservation> findByBusinessId(String businessId);
    boolean existsByStallId(String stallId);
    boolean existsByStallIdAndStatus(String stallId, String status);
    long countByStallIdAndStatus(String stallId, String status);

}
