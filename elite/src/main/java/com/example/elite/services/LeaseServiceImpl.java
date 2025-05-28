package com.example.elite.services;

import com.example.elite.models.Lease;
import com.example.elite.models.User;
import com.example.elite.repository.LeaseRepository;
import com.example.elite.repository.UserRepository;
import com.example.elite.services.LeaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaseServiceImpl implements LeaseService {

    @Autowired
    private LeaseRepository leaseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Lease> findAll() {
        return leaseRepository.findAll();
    }

    @Override
    public Lease findById(Long id) {
        return leaseRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Lease lease) {
        leaseRepository.save(lease);
    }

    @Override
    public void deleteById(Long id) {
        leaseRepository.deleteById(id);
    }

    @Override
    public List<Lease> findByTenant(String username) {
        Optional<User> tenant = userRepository.findByUsername(username);
        return leaseRepository.findByTenant(tenant);
    }
}
