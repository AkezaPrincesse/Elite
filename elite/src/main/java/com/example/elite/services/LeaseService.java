package com.example.elite.services;

import com.example.elite.models.Lease;
import java.util.List;

public interface LeaseService {
    List<Lease> findAll();
    Lease findById(Long id);
    void save(Lease lease);
    void deleteById(Long id);
    List<Lease> findByTenant(String username);
}
