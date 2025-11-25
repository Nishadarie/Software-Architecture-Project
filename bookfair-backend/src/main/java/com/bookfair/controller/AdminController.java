package com.bookfair.controller;

import com.bookfair.dto.*;
import com.bookfair.entity.Audit;
import com.bookfair.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @GetMapping("/health")
    public ResponseEntity<String> health(){
        return ResponseEntity.ok("admin ok");
    }

    // ---------------------------
    // USERS / EMPLOYEES
    // ---------------------------

    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getAllUsers(){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.getAllUsers());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/employees")
    public ResponseEntity<Map<String, Object>> getEmployees(){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.getEmployees());
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/users/{id}/promote")
    public ResponseEntity<Map<String, Object>> promoteToEmployee(
            @PathVariable String id, Principal principal){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.promoteToEmployee(id, principal.getName()));
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/users/{id}/promote-admin")
    public ResponseEntity<Map<String, Object>> promoteToAdmin(
            @PathVariable String id, Principal principal){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.promoteToAdmin(id, principal.getName()));
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/users/{id}/demote")
    public ResponseEntity<Map<String, Object>> demote(
            @PathVariable String id, Principal principal){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.demoteUser(id, principal.getName()));
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/users/{id}/activate")
    public ResponseEntity<Map<String, Object>> activate(
            @PathVariable String id, Principal principal){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.activateUser(id, principal.getName()));
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/users/{id}/deactivate")
    public ResponseEntity<Map<String, Object>> deactivate(
            @PathVariable String id, Principal principal){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.deactivateUser(id, principal.getName()));
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/employees")
    public ResponseEntity<Map<String, Object>> createEmployee(
            @RequestBody CreateEmployeeRequest request, Principal principal){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.createEmployee(request, principal.getName()));
        return ResponseEntity.ok(resp);
    }

    // ---------------------------
    // REPORTS
    // ---------------------------

    @GetMapping("/report/summary")
    public ResponseEntity<Map<String, Object>> summary(){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.getSummaryReport());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/report/stalls-by-size")
    public ResponseEntity<Map<String, Object>> stallsBySize(){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.getStallsBySizeReport());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/report/reservations-by-business")
    public ResponseEntity<Map<String, Object>> reservationsByBusiness(){
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("data", adminService.getReservationsByBusinessReport());
        return ResponseEntity.ok(resp);
    }

    // ---------------------------
    // AUDIT
    // ---------------------------

    @GetMapping("/audits")
    public ResponseEntity<Map<String, Object>> audits(){
        Map<String, Object> resp = new HashMap<>();
        List<Audit> logs = adminService.getAuditLogs();
        resp.put("success", true);
        resp.put("data", logs);
        return ResponseEntity.ok(resp);
    }
}