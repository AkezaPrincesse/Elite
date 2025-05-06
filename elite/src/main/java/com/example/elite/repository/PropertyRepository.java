package com.example.elite.repository;

import com.example.elite.models.Property;
import com.example.elite.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByTenant(User tenant);
}
