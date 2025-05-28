package com.example.elite.services;

import com.example.elite.dto.*;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(TokenRefreshRequest request);
    void changePassword(String username, String currentPassword, String newPassword);
    void initiatePasswordReset(String email);
    void resetPassword(String token, String newPassword);
}