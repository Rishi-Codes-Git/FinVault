package com.finvault.backend.service;

import com.finvault.backend.entity.Account;
import com.finvault.backend.entity.User;
import com.finvault.backend.dto.RegisterRequest;
import com.finvault.backend.repository.AccountRepository;
import com.finvault.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final AccountRepository accountRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepo, AccountRepository accountRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.accountRepo = accountRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest req) {

        Optional<User> byName = userRepo.findByUsername(req.getUsername());
        Optional<User> byEmail = userRepo.findByEmail(req.getEmail());

        if (byName.isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (byEmail.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));

        User savedUser = userRepo.save(user);

        Account acc = new Account();
        acc.setUser(savedUser);
        acc.setAccountNumber(generateAccountNumber());
        acc.setBalance(java.math.BigDecimal.ZERO);

        accountRepo.save(acc);

        return savedUser;
    }

    private String generateAccountNumber() {
        String s = UUID.randomUUID().toString().replaceAll("[^0-9]", "");
        if (s.length() < 12) {
            s = String.format("%012d", Long.parseLong(s));
        }
        return s.substring(0, 12);
    }
}
