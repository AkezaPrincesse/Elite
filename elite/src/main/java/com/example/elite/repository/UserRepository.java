package com.example.elite.repository;


import com.example.elite.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findUserByEmail(String email);
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Optional<Object> findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail1);
}
