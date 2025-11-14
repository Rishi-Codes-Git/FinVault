package com.finvault.backend.service;

import com.finvault.backend.config.JwtUtil;
import com.finvault.backend.dto.AuthRequest;
import com.finvault.backend.dto.AuthResponse;
import com.finvault.backend.entity.RefreshToken;
import com.finvault.backend.entity.User;
import com.finvault.backend.repository.RefreshTokenRepository;
import com.finvault.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passEncoder;
    private final JwtUtil jwtUtil;
    private final RefreshTokenRepository refreshRepo;

    public AuthService(UserRepository userRepo, PasswordEncoder passEncoder, JwtUtil jwtUtil,
                       RefreshTokenRepository refreshRepo) {
        this.userRepo = userRepo;
        this.passEncoder = passEncoder;
        this.jwtUtil = jwtUtil;
        this.refreshRepo = refreshRepo;
    }

    public AuthResponse login(AuthRequest req) {

        Optional<User> u = userRepo.findByUsernameOrEmail(req.getUsernameOrEmail(), req.getUsernameOrEmail());
        if (u.isEmpty()) throw new RuntimeException("Invalid credentials");

        User user = u.get();

        if (!passEncoder.matches(req.getPassword(), user.getPasswordHash()))
            throw new RuntimeException("Invalid credentials");

        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getUsername(), user.getRole());
        String refreshToken = jwtUtil.generateRefreshToken(user.getId());

        RefreshToken rt = new RefreshToken();
        rt.setUser(user);
        rt.setTokenHash(hash(refreshToken));
        rt.setExpiry(LocalDateTime.now().plusDays(14));

        refreshRepo.save(rt);

        return new AuthResponse(accessToken, refreshToken, "Bearer", 30 * 60);
    }

    public AuthResponse refresh(String token) {

        String hashedToken = hash(token);

        RefreshToken rt = refreshRepo.findByTokenHash(hashedToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (rt.getExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh token expired");
        }

        User user = rt.getUser();

        String newAccessToken = jwtUtil.generateAccessToken(user.getId(), user.getUsername(), user.getRole());

        return new AuthResponse(newAccessToken, token, "Bearer", 30 * 60);
    }

    private String hash(String token) {
        return org.springframework.util.DigestUtils.md5DigestAsHex(token.getBytes());
    }
}
