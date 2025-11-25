package com.bookfair.repository;

import com.bookfair.entity.Stall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StallRepository extends JpaRepository<Stall, String> {
    long countByStatus(String status);
    long countBySize(String size);
    long countBySizeAndStatus(String size, String status);
    boolean existsByName(String name);
    Optional<Stall> findByName(String name);

    boolean existsById(String id);

}