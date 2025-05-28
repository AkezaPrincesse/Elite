package com.example.elite.dto;

import jakarta.validation.constraints.NotBlank;


public class PasswordResetRequest {
    @NotBlank
    private String token;

    @NotBlank
    private String newPassword;

    public PasswordResetRequest() {
    }

    public PasswordResetRequest(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}