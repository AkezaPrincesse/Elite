package com.example.elite.services;

import com.example.elite.models.Property;
import java.util.List;

public interface PropertyService {
    List<Property> findAll();
    Property findById(Long id);
    void save(Property property);
    void deleteById(Long id);
    List<Property> findByOwnerUsername(String username);

    List<Property> findByTenant(String username);


}
