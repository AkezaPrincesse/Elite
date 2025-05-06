package com.example.elite.repository;

import com.example.elite.models.Lease;
import com.example.elite.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LeaseRepository extends JpaRepository<Lease, Long> {
    List<Lease> findByTenant(User tenant);
}
