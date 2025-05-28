package com.example.elite.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

@Data
@Builder
public class AuthResponse {
    private String accessToken;
    private String refreshToken; // Keep refresh token as String if using JWT
    private UserDto user;
}