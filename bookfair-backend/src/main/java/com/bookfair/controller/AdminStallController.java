package com.bookfair.controller;

import com.bookfair.dto.admin.*;
import com.bookfair.service.AdminStallService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/stalls")
public class AdminStallController {

    private final AdminStallService adminStallService;

    public AdminStallController(AdminStallService adminStallService) {
        this.adminStallService = adminStallService;
    }

    private Map<String, Object> wrapSuccess(Object data) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", data);
        return resp;
    }

    // ------------------------------------------------------------
    // 1. GET ALL STALLS
    // ------------------------------------------------------------
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(wrapSuccess(adminStallService.getAllStalls()));
    }

    // ------------------------------------------------------------
    // 2. GET STALL BY ID
    // ------------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable String id) {
        return ResponseEntity.ok(wrapSuccess(adminStallService.getStall(id)));
    }

    // ------------------------------------------------------------
    // 3. CREATE NEW STALL
    // ------------------------------------------------------------
    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody AdminStallCreateRequest request,
            Principal principal
    ) {
        return ResponseEntity.ok(
                wrapSuccess(adminStallService.createStall(request, principal.getName()))
        );
    }

    // ------------------------------------------------------------
    // 4. UPDATE STALL
    // ------------------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable String id,
            @RequestBody AdminStallUpdateRequest request,
            Principal principal
    ) {
        return ResponseEntity.ok(
                wrapSuccess(adminStallService.updateStall(id, request, principal.getName()))
        );
    }

    // ------------------------------------------------------------
    // 5. CHANGE STATUS (BLOCK/AVAILABLE/MAINTENANCE)
    // ------------------------------------------------------------
    @PutMapping("/{id}/status")
    public ResponseEntity<?> changeStatus(
            @PathVariable String id,
            @RequestParam String status,
            Principal principal
    ) {
        return ResponseEntity.ok(
                wrapSuccess(adminStallService.changeStatus(id, status, principal.getName()))
        );
    }

    // ------------------------------------------------------------
    // 6. FORCE VACATE (REMOVE RESERVATION + MAKE AVAILABLE)
    // ------------------------------------------------------------
    @PutMapping("/{id}/vacate")
    public ResponseEntity<?> forceVacate(
            @PathVariable String id,
            Principal principal
    ) {
        return ResponseEntity.ok(
                wrapSuccess(adminStallService.forceVacate(id, principal.getName()))
        );
    }

    // ------------------------------------------------------------
    // 7. DELETE STALL (Only if non-reserved)
    // ------------------------------------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable String id,
            Principal principal
    ) {
        boolean deleted = adminStallService.deleteStall(id, principal.getName());
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", deleted);
        resp.put("message", deleted ? "Stall deleted" : "Cannot delete stall");
        return ResponseEntity.ok(resp);
    }

    // ------------------------------------------------------------
    // 8. BULK DEFAULT STALL CREATION
    // ------------------------------------------------------------
    @PostMapping("/initialize")
    public ResponseEntity<?> initialize(Principal principal) {
        int count = adminStallService.bulkCreateDefaultStalls(principal.getName());
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("count", count);
        resp.put("message", "Default stalls created: " + count);
        return ResponseEntity.ok(resp);
    }
}