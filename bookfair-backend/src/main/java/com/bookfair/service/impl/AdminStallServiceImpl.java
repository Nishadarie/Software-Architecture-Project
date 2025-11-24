package com.bookfair.service.impl;

import com.bookfair.dto.admin.AdminStallCreateRequest;
import com.bookfair.dto.admin.AdminStallUpdateRequest;
import com.bookfair.dto.admin.AdminStallResponse;
import com.bookfair.entity.Audit;
import com.bookfair.entity.Reservation;
import com.bookfair.entity.Stall;
import com.bookfair.repository.AuditRepository;
import com.bookfair.repository.ReservationRepository;
import com.bookfair.repository.StallRepository;
import com.bookfair.service.AdminStallService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class AdminStallServiceImpl implements AdminStallService {

    private final StallRepository stallRepository;
    private final ReservationRepository reservationRepository;
    private final AuditRepository auditRepository;

    public AdminStallServiceImpl(
            StallRepository stallRepository,
            ReservationRepository reservationRepository,
            AuditRepository auditRepository
    ) {
        this.stallRepository = stallRepository;
        this.reservationRepository = reservationRepository;
        this.auditRepository = auditRepository;
    }

    // ----------------------------
    // Utility Methods
    // ----------------------------

    private AdminStallResponse map(Stall stall) {
        AdminStallResponse r = new AdminStallResponse();
        r.setId(stall.getId());
        r.setName(stall.getName());
        r.setSize(stall.getSize());
        r.setPrice(stall.getPrice());
        r.setMapX(stall.getMapX());
        r.setMapY(stall.getMapY());
        r.setStatus(stall.getStatus());
        return r;
    }

    private void audit(String action, String user, String details) {
        Audit a = new Audit();
        a.setAction(action);
        a.setPerformedBy(user);
        a.setDetails(details);
        a.setTimestamp(Instant.now());
        auditRepository.save(a);
    }

    /**
     * A stall is considered "reserved" if ANY reservation
     * has status PENDING or CONFIRMED.
     */
    private boolean isStallReserved(String stallId) {
        return reservationRepository.findByStallId(stallId)
                .stream()
                .anyMatch(r ->
                        "PENDING".equalsIgnoreCase(r.getStatus()) ||
                                "CONFIRMED".equalsIgnoreCase(r.getStatus())
                );
    }

    // ----------------------------
    // Admin Stall Management
    // ----------------------------

    @Override
    public List<AdminStallResponse> getAllStalls() {
        return stallRepository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public AdminStallResponse getStall(String stallId) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));
        return map(stall);
    }

    @Override
    @Transactional
    public AdminStallResponse createStall(AdminStallCreateRequest req, String performedBy) {

        // Check duplicate name
        Optional<Stall> exists = stallRepository.findByName(req.getName());
        if (exists.isPresent()) {
            throw new RuntimeException("A stall with this name already exists.");
        }

        Stall s = new Stall();
        s.setName(req.getName());
        s.setSize(req.getSize());
        s.setPrice(req.getPrice());
        s.setMapX(req.getMapX());
        s.setMapY(req.getMapY());
        s.setStatus("AVAILABLE");

        Stall saved = stallRepository.save(s);

        audit("STALL_CREATE", performedBy,
                "Created stall " + saved.getId() + " (" + saved.getName() + ")");

        return map(saved);
    }

    @Override
    @Transactional
    public AdminStallResponse updateStall(String stallId, AdminStallUpdateRequest req, String performedBy) {
        Stall s = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if (isStallReserved(stallId)) {
            throw new RuntimeException("Cannot update: Stall is reserved.");
        }

        s.setName(req.getName());
        s.setSize(req.getSize());
        s.setPrice(req.getPrice());
        s.setMapX(req.getMapX());
        s.setMapY(req.getMapY());

        Stall saved = stallRepository.save(s);

        audit("STALL_UPDATE", performedBy,
                "Updated stall " + stallId);

        return map(saved);
    }

    @Override
    @Transactional
    public boolean deleteStall(String stallId, String performedBy) {

        Stall s = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if (isStallReserved(stallId)) {
            throw new RuntimeException("Cannot delete: Stall is reserved.");
        }

        stallRepository.deleteById(stallId);

        audit("STALL_DELETE", performedBy,
                "Deleted stall " + stallId);

        return true;
    }

    @Override
    @Transactional
    public AdminStallResponse changeStatus(String stallId, String status, String performedBy) {

        Stall s = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        if ("RESERVED".equalsIgnoreCase(status)) {
            throw new RuntimeException("Admins cannot manually assign RESERVED status.");
        }

        if (isStallReserved(stallId) && !"AVAILABLE".equalsIgnoreCase(status)) {
            throw new RuntimeException("Cannot change status: Stall is reserved.");
        }

        s.setStatus(status.toUpperCase());
        Stall saved = stallRepository.save(s);

        audit("STALL_STATUS_CHANGE", performedBy,
                "Changed status of " + stallId + " -> " + status);

        return map(saved);
    }


    @Override
    @Transactional
    public AdminStallResponse forceVacate(String stallId, String performedBy) {
        Stall s = stallRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        // Cancel any active reservation
        reservationRepository.findByStallId(stallId)
                .stream()
                .filter(r ->
                        "PENDING".equalsIgnoreCase(r.getStatus()) ||
                                "CONFIRMED".equalsIgnoreCase(r.getStatus()))
                .forEach(r -> {
                    r.setStatus("CANCELLED");
                    reservationRepository.save(r);
                });

        // Now mark stall available
        s.setStatus("AVAILABLE");
        Stall saved = stallRepository.save(s);

        audit("STALL_FORCE_VACATE", performedBy,
                "Force vacated stall " + stallId);

        return map(saved);
    }

    @Override
    @Transactional
    public int bulkCreateDefaultStalls(String performedBy) {
        int count = 0;

        for (int i = 1; i <= 20; i++) {
            Stall s = new Stall();
            s.setName("STALL-" + i);
            s.setSize("LARGE");
            s.setPrice(5000);
            s.setMapX(i);
            s.setMapY(i + 1);
            s.setStatus("AVAILABLE");

            stallRepository.save(s);
            count++;
        }

        audit("STALL_BULK_CREATE", performedBy,
                "Bulk created " + count + " stalls");

        return count;
    }
}