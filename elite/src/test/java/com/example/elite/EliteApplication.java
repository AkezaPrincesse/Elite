package com.example.elite;

import com.example.elite.models.Role;
import com.example.elite.models.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.elite.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EliteApplication {

	public static void main(String[] args) {
		SpringApplication.run(EliteApplication.class, args);
	}

	@Bean
	CommandLineRunner createDefaultUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {

		};
	}


}
