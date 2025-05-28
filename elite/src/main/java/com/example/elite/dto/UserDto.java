package com.example.elite.dto;

import com.example.elite.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private static String firstName;
    private static String lastName;
    private String email;
    private String username;
    private String password; // Consider security implications - might want to exclude this from DTO
    private String phoneNumber;
    private String address;
    private boolean active;
    private String role; // or List<String> roles if multiple roles

    public static UserDto fromUser(User user) {
        return null;
    }
}