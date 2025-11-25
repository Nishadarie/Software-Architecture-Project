package com.bookfair.repository;

import com.bookfair.entity.Reservation;
import com.bookfair.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    long countByStatus(String status);
    List<Reservation> findByBusinessId(String businessId);

    long countByRole(String role);

    long countByBusinessIdIsNotNull();
}
