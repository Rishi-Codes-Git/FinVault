package com.finvault.backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final long accessExpirationMs;
    private final long refreshExpirationMs;

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access.expiration-minutes}") long accessMinutes,
            @Value("${jwt.refresh.expiration-days}") long refreshDays
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.accessExpirationMs = accessMinutes * 60 * 1000;
        this.refreshExpirationMs = refreshDays * 24 * 60 * 60 * 1000;
    }

    public String generateAccessToken(Long userId, String username, String role) {
        long now = System.currentTimeMillis();

        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("username", username)
                .claim("role", role)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + accessExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(Long userId) {
        long now = System.currentTimeMillis();

        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + refreshExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }
}
