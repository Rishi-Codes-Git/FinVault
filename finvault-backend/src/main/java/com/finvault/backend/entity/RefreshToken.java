package com.finvault.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String tokenHash;

    private LocalDateTime expiry;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public String getTokenHash() { return tokenHash; }

    public void setTokenHash(String tokenHash) { this.tokenHash = tokenHash; }

    public LocalDateTime getExpiry() { return expiry; }

    public void setExpiry(LocalDateTime expiry) { this.expiry = expiry; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
