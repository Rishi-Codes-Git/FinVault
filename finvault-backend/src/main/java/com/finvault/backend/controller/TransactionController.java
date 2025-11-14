package com.finvault.backend.controller;

import com.finvault.backend.config.JwtAuthPrincipal;
import com.finvault.backend.entity.TransactionEntity;
import com.finvault.backend.repository.AccountRepository;
import com.finvault.backend.repository.TransactionRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    private final TransactionRepository txRepo;
    private final AccountRepository accountRepo;

    public TransactionController(TransactionRepository txRepo, AccountRepository accountRepo) {
        this.txRepo = txRepo;
        this.accountRepo = accountRepo;
    }

    @GetMapping
    public ResponseEntity<List<TransactionEntity>> getMyTransactions(@AuthenticationPrincipal JwtAuthPrincipal principal) {

        var acc = accountRepo.findByUserId(principal.id())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        List<TransactionEntity> list = txRepo
                .findByAccountIdOrderByCreatedAtDesc(acc.getId());

        return ResponseEntity.ok(list);
    }
}
