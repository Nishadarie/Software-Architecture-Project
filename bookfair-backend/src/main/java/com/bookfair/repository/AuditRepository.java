package com.bookfair.repository;

import com.bookfair.entity.Audit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface AuditRepository extends JpaRepository<Audit, String> {
    List<Audit> findByAdminId(String adminId);
    List<Audit> findByAction(String action);
    List<Audit> findByTimestampBetween(Instant from, Instant to);
}