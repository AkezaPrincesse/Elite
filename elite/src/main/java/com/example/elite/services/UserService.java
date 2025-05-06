package com.example.elite.services;

import com.example.elite.models.User;
import java.util.List;

public interface UserService {
    User findByUsername(String username);
    void save(User user);
    List<User> findAll();
    User findById(Long id);
    void deleteById(Long id);

    User register(User user);
}
