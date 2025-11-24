package com.bookfair.service;

import com.bookfair.dto.*;
import com.bookfair.entity.Audit;

import java.util.List;

public interface AdminService {

    List<AdminUserDto> getAllUsers();
    List<AdminUserDto> getEmployees();

    AdminUserDto promoteToEmployee(String userId, String adminId);
    AdminUserDto promoteToAdmin(String userId, String adminId);
    AdminUserDto demoteUser(String userId, String adminId);

    AdminUserDto activateUser(String userId, String adminId);
    AdminUserDto deactivateUser(String userId, String adminId);

    AdminUserDto createEmployee(CreateEmployeeRequest request, String adminId);

    // Reports
    ReportSummaryDto getSummaryReport();
    List<StallsBySizeDto> getStallsBySizeReport();
    List<ReservationsByBusinessDto> getReservationsByBusinessReport();

    // Audit
    List<Audit> getAuditLogs();

}