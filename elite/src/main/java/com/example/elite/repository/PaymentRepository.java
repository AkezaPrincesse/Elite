package com.example.elite.repository;

import com.example.elite.models.Payment;
import com.example.elite.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByTenant(User tenant);
}
