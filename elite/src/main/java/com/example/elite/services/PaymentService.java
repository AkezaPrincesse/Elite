package com.example.elite.services;

import com.example.elite.models.Payment;
import java.util.List;

public interface PaymentService {
    List<Payment> findAll();
    Payment findById(Long id);
    void save(Payment payment);
    void deleteById(Long id);
    List<Payment> findByLeaseId(Long leaseId);

    List<Payment> findByTenant(String username);
}
