package com.bookfair.service.impl;

import com.bookfair.dto.*;
import com.bookfair.entity.Audit;
import com.bookfair.entity.Reservation;
import com.bookfair.entity.Stall;
import com.bookfair.entity.User;
import com.bookfair.repository.AuditRepository;
import com.bookfair.repository.ReservationRepository;
import com.bookfair.repository.StallRepository;
import com.bookfair.repository.UserRepository;
import com.bookfair.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final StallRepository stallRepository;
    private final ReservationRepository reservationRepository;
    private final AuditRepository auditRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // ---------------------------
    // USER MANAGEMENT
    // ---------------------------

    @Override
    public List<AdminUserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toAdminUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AdminUserDto> getEmployees() {
        return userRepository.findAll().stream()
                .filter(u -> "EMPLOYEE".equalsIgnoreCase(u.getRole()))
                .map(this::toAdminUserDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AdminUserDto promoteToEmployee(String userId, String adminId) {
        User user = mustFindUser(userId);

        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Cannot promote ADMIN to EMPLOYEE");
        }
        user.setRole("EMPLOYEE");
        userRepository.save(user);

        audit(adminId, "PROMOTE_TO_EMPLOYEE", "USER", userId,
                "Promoted user to EMPLOYEE: " + user.getEmail());

        return toAdminUserDto(user);
    }

    @Override
    @Transactional
    public AdminUserDto promoteToAdmin(String userId, String adminId) {
        User user = mustFindUser(userId);
        user.setRole("ADMIN");
        userRepository.save(user);

        audit(adminId, "PROMOTE_TO_ADMIN", "USER", userId,
                "Promoted user to ADMIN: " + user.getEmail());

        return toAdminUserDto(user);
    }

    @Override
    @Transactional
    public AdminUserDto demoteUser(String userId, String adminId) {
        User user = mustFindUser(userId);

        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            // Demote ADMIN -> EMPLOYEE
            user.setRole("EMPLOYEE");
        } else if ("EMPLOYEE".equalsIgnoreCase(user.getRole())) {
            // Demote EMPLOYEE -> USER
            user.setRole("USER");
        } else {
            throw new RuntimeException("USER role cannot be demoted further");
        }

        userRepository.save(user);

        audit(adminId, "DEMOTE_USER", "USER", userId,
                "Demoted user role. New role: " + user.getRole() + " (" + user.getEmail() + ")");

        return toAdminUserDto(user);
    }

    @Override
    @Transactional
    public AdminUserDto activateUser(String userId, String adminId) {
        User user = mustFindUser(userId);
        user.setStatus("ACTIVE");
        userRepository.save(user);

        audit(adminId, "ACTIVATE_USER", "USER", userId,
                "Activated user: " + user.getEmail());

        return toAdminUserDto(user);
    }

    @Override
    @Transactional
    public AdminUserDto deactivateUser(String userId, String adminId) {
        User user = mustFindUser(userId);

        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Cannot deactivate another ADMIN");
        }

        user.setStatus("INACTIVE");
        userRepository.save(user);

        audit(adminId, "DEACTIVATE_USER", "USER", userId,
                "Deactivated user: " + user.getEmail());

        return toAdminUserDto(user);
    }

    @Override
    @Transactional
    public AdminUserDto createEmployee(CreateEmployeeRequest request, String adminId) {
        if (request == null) throw new RuntimeException("Request is null");
        if (request.email == null || request.email.isBlank()) throw new RuntimeException("Email required");
        if (request.password == null || request.password.isBlank()) throw new RuntimeException("Password required");

        if (userRepository.findByEmail(request.email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User employee = new User();
        employee.setName(request.name);
        employee.setEmail(request.email);
        employee.setPhone(request.phone);
        employee.setPassword(passwordEncoder.encode(request.password));
        employee.setRole("EMPLOYEE");
        employee.setStatus("ACTIVE");

        userRepository.save(employee);

        audit(adminId, "CREATE_EMPLOYEE", "USER", employee.getId(),
                "Created EMPLOYEE account: " + employee.getEmail());

        return toAdminUserDto(employee);
    }

    // ---------------------------
    // REPORTING
    // ---------------------------

    @Override
    public ReportSummaryDto getSummaryReport() {
        ReportSummaryDto dto = new ReportSummaryDto();

        dto.totalStalls = stallRepository.count();
        dto.availableStalls = stallRepository.countByStatus("AVAILABLE");
        dto.reservedStalls = stallRepository.countByStatus("RESERVED");

        dto.confirmedReservations = reservationRepository.countByStatus("CONFIRMED");
        dto.pendingReservations = reservationRepository.countByStatus("PENDING");

        dto.employeeCount = userRepository.countByRole("EMPLOYEE");
        dto.businessCount = userRepository.countByBusinessIdIsNotNull();

        // Revenue = sum price of stalls for CONFIRMED reservations
        long revenue = 0;
        List<Reservation> confirmed = reservationRepository.findAll().stream()
                .filter(r -> "CONFIRMED".equalsIgnoreCase(r.getStatus()))
                .toList();

        for (Reservation r : confirmed) {
            Stall stall = stallRepository.findById(r.getStallId()).orElse(null);
            if (stall != null && stall.getPrice() != null) revenue += stall.getPrice();
        }
        dto.totalRevenue = revenue;

        return dto;
    }

    @Override
    public List<StallsBySizeDto> getStallsBySizeReport() {
        List<String> sizes = List.of("Small", "Medium", "Large");
        List<StallsBySizeDto> out = new ArrayList<>();

        for (String size : sizes) {
            StallsBySizeDto dto = new StallsBySizeDto();
            dto.size = size;
            dto.total = stallRepository.countBySize(size);
            dto.reserved = stallRepository.countBySizeAndStatus(size, "RESERVED");
            dto.available = stallRepository.countBySizeAndStatus(size, "AVAILABLE");

            // revenue for size from confirmed reservations
            long revenue = 0;
            List<Reservation> confirmed = reservationRepository.findAll().stream()
                    .filter(r -> "CONFIRMED".equalsIgnoreCase(r.getStatus()))
                    .toList();

            for (Reservation r : confirmed) {
                Stall stall = stallRepository.findById(r.getStallId()).orElse(null);
                if (stall != null && size.equalsIgnoreCase(stall.getSize()) && stall.getPrice() != null) {
                    revenue += stall.getPrice();
                }
            }
            dto.revenue = revenue;

            out.add(dto);
        }

        return out;
    }

    @Override
    public List<ReservationsByBusinessDto> getReservationsByBusinessReport() {
        // Group reservations by businessId
        Map<String, List<Reservation>> grouped =
                reservationRepository.findAll().stream()
                        .filter(r -> r.getBusinessId() != null)
                        .collect(Collectors.groupingBy(Reservation::getBusinessId));

        List<ReservationsByBusinessDto> out = new ArrayList<>();

        for (Map.Entry<String, List<Reservation>> e : grouped.entrySet()) {
            String businessId = e.getKey();
            List<Reservation> list = e.getValue();

            ReservationsByBusinessDto dto = new ReservationsByBusinessDto();
            dto.businessId = businessId;

            // businessName from any user with that businessId
            String businessName = userRepository.findAll().stream()
                    .filter(u -> businessId.equals(u.getBusinessId()))
                    .map(u -> u.getBusinessName() != null ? u.getBusinessName() : u.getName())
                    .findFirst()
                    .orElse("UNKNOWN");
            dto.businessName = businessName;

            dto.totalReservations = list.size();
            dto.confirmedReservations = list.stream().filter(r -> "CONFIRMED".equalsIgnoreCase(r.getStatus())).count();
            dto.pendingReservations = list.stream().filter(r -> "PENDING".equalsIgnoreCase(r.getStatus())).count();

            long spent = 0;
            for (Reservation r : list) {
                if (!"CONFIRMED".equalsIgnoreCase(r.getStatus())) continue;
                Stall stall = stallRepository.findById(r.getStallId()).orElse(null);
                if (stall != null && stall.getPrice() != null) spent += stall.getPrice();
            }
            dto.totalSpent = spent;

            out.add(dto);
        }

        // Sort by totalSpent descending
        out.sort((a, b) -> Long.compare(b.totalSpent, a.totalSpent));

        return out;
    }

    // ---------------------------
    // AUDIT
    // ---------------------------

    @Override
    public List<Audit> getAuditLogs() {
        return auditRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Audit::getTimestamp).reversed())
                .collect(Collectors.toList());
    }

    private void audit(String adminId, String action, String targetType, String targetId, String description) {
        Audit log = new Audit();
        log.setAdminId(adminId);
        log.setAction(action);
        log.setTargetType(targetType);
        log.setTargetId(targetId);
        log.setDescription(description);
        auditRepository.save(log);
    }

    private User mustFindUser(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
    }

    private AdminUserDto toAdminUserDto(User u) {
        AdminUserDto d = new AdminUserDto();
        d.setId(u.getId());
        d.setName(u.getName());
        d.setEmail(u.getEmail());
        d.setRole(u.getRole());
        d.setStatus(u.getStatus());
        d.setBusinessId(u.getBusinessId());
        d.setBusinessName(u.getBusinessName());
        d.setPhone(u.getPhone());
        return d;
    }
}