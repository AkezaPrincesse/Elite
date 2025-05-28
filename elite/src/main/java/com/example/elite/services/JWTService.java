package com.example.elite.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

import java.time.Instant;

public class JWTService {
    public OAuth2AccessToken generateOAuth2Token(UserDetails userDetails) {
        String tokenValue = generateToken(userDetails);
        return new OAuth2AccessToken(
                OAuth2AccessToken.TokenType.BEARER,
                tokenValue,
                Instant.now(),
                Instant.now().plusSeconds(3600) // 1 hour expiration
        );
    }

    private String generateToken(UserDetails userDetails) {
        return null;
    }
}
