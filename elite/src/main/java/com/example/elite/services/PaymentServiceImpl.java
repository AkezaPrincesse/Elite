package com.example.elite.services;

import com.example.elite.models.Payment;
import com.example.elite.models.User;
import com.example.elite.repository.PaymentRepository;
import com.example.elite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment findById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Payment payment) {
        paymentRepository.save(payment);
    }

    @Override
    public void deleteById(Long id) {
        paymentRepository.deleteById(id);
    }

    @Override
    public List<Payment> findByLeaseId(Long leaseId) {
        return List.of();
    }

    @Override
    public List<Payment> findByTenant(String username) {
        Optional<User> tenant = userRepository.findByUsername(username);
        return paymentRepository.findByTenant(tenant);
    }
}
