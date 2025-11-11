package com.finvault.finvault_backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.finvault.finvault_backend.model.Transaction;
import com.finvault.finvault_backend.repository.TransactionRepository;

@Service
public class TransactionService {
    private final TransactionRepository repo;

    public TransactionService(TransactionRepository repo) {
        this.repo = repo;
    }

    public List<Transaction> getByAccount(Long accountId) {
        return repo.findByAccountIdOrderByTimestampDesc(accountId);
    }
}
