package com.bookfair.controller;

import com.bookfair.dto.StallDto;
import com.bookfair.service.StallService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stalls")
@Slf4j
public class StallController {

    private final StallService stallService;

    public StallController(StallService stallService){
        this.stallService = stallService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> list(){
        Map<String, Object> response = new HashMap<>();
        try {
            List<StallDto> stalls = stallService.listAll();
            response.put("success", true);
            response.put("data", stalls);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            log.error("Error fetching stalls", ex);
            response.put("success", false);
            response.put("error", ex.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody StallDto dto){
        Map<String, Object> response = new HashMap<>();
        try {
            StallDto created = stallService.create(dto);
            response.put("success", true);
            response.put("message", "Stall created successfully");
            response.put("data", created);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            log.error("Error creating stall", ex);
            response.put("success", false);
            response.put("error", ex.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/initialize")
    public ResponseEntity<Map<String, Object>> initializeStalls(){
        Map<String, Object> response = new HashMap<>();
        try {
            int created = stallService.initializeDefaultStalls();
            response.put("success", true);
            response.put("message", "Initialized " + created + " stalls successfully");
            response.put("count", created);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            log.error("Error initializing stalls", ex);
            response.put("success", false);
            response.put("error", ex.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
