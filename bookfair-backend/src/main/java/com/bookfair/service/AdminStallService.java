package com.bookfair.service;

import com.bookfair.dto.admin.*;
import java.util.List;

public interface AdminStallService {

    List<AdminStallResponse> getAllStalls();

    AdminStallResponse getStall(String stallId);

    AdminStallResponse createStall(AdminStallCreateRequest request, String performedBy);

    AdminStallResponse updateStall(String stallId, AdminStallUpdateRequest request, String performedBy);

    boolean deleteStall(String stallId, String performedBy);

    AdminStallResponse changeStatus(String stallId, String status, String performedBy);

    AdminStallResponse forceVacate(String stallId, String performedBy);

    int bulkCreateDefaultStalls(String performedBy);
}