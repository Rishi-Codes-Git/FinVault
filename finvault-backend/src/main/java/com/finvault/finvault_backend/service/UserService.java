package com.finvault.finvault_backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.finvault.finvault_backend.model.User;
import com.finvault.finvault_backend.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(String username, String password) {
        if (repo.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already taken");
        }
        User user = new User(username, encoder.encode(password));
        return repo.save(user);
    }

    public User authenticate(String username, String password) {
        Optional<User> userOpt = repo.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (encoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        throw new RuntimeException("Invalid credentials");
    }
}
