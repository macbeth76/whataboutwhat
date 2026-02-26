package com.wiseowltech.auth.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtServiceTest {

    @Autowired
    private JwtService jwtService;

    @Test
    void generateToken_returnsNonEmptyString() {
        String token = jwtService.generateToken("testuser");
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void extractUsername_returnsCorrectUsername() {
        String token = jwtService.generateToken("testuser");
        String username = jwtService.extractUsername(token);
        assertEquals("testuser", username);
    }

    @Test
    void isTokenValid_withValidToken_returnsTrue() {
        String token = jwtService.generateToken("testuser");
        assertTrue(jwtService.isTokenValid(token, "testuser"));
    }

    @Test
    void isTokenValid_withWrongUsername_returnsFalse() {
        String token = jwtService.generateToken("testuser");
        assertFalse(jwtService.isTokenValid(token, "otheruser"));
    }

    @Test
    void isTokenValid_withMalformedToken_returnsFalse() {
        assertFalse(jwtService.isTokenValid("not.a.token", "testuser"));
    }
}
