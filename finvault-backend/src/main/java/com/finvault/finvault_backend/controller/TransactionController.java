package com.finvault.finvault_backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.finvault.finvault_backend.model.Transaction;
import com.finvault.finvault_backend.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @GetMapping("/{accountId}")
    public List<Transaction> getByAccount(@PathVariable Long accountId) {
        return service.getByAccount(accountId);
    }
}
