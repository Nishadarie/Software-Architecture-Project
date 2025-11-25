package com.bookfair.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Entity
@Table(name = "audit_logs")
public class Audit {

    @Id
    private String id;

    private String adminId;       // actor
    private String action;        // e.g. PROMOTE_TO_EMPLOYEE
    private String targetType;    // USER / RESERVATION / STALL / SYSTEM
    private String targetId;      // id of affected entity
    private String description;   // readable summary
    private Instant timestamp;
    private String performedBy;
    private String details;


    @PrePersist
    public void onCreate() {
        this.id = UUID.randomUUID().toString();
        this.timestamp = Instant.now();
    }
}