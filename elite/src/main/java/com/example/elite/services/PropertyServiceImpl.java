package com.example.elite.services;

import com.example.elite.models.Property;
import com.example.elite.models.User;
import com.example.elite.repository.PropertyRepository;
import com.example.elite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Property> findAll() {
        return propertyRepository.findAll();
    }

    @Override
    public Property findById(Long id) {
        return propertyRepository.findById(id).orElse(null);
    }

    @Override
    public Property save(Property property) {
        propertyRepository.save(property);
        return property;
    }

    @Override
    public void deleteById(Long id) {
        propertyRepository.deleteById(id);
    }

    @Override
    public List<Property> findByOwnerUsername(String username) {
        return List.of();
    }

    @Override
    public List<Property> findByTenant(String username) {
        Optional<User> tenant = userRepository.findByUsername(username);
        return propertyRepository.findByTenant(tenant);
    }
}
