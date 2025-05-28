package com.example.elite.services;

import com.example.elite.dto.RegisterRequest;
import com.example.elite.models.User;
import java.util.List;

public interface UserService {
    User findByUsername(String username);
    User save(User user);
    List<User> findAll();
    User findById(Long id);
    void deleteById(Long id);

    User register(RegisterRequest request);

    void changePassword(String username, String currentPassword, String newPassword);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
