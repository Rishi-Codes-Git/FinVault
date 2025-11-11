package com.finvault.finvault_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import com.finvault.finvault_backend.model.*;
import com.finvault.finvault_backend.repository.*;
import com.finvault.finvault_backend.exception.ResourceNotFoundException;

@Service
public class AccountService {
    private final AccountRepository accountRepo;
    private final TransactionRepository txnRepo;

    public AccountService(AccountRepository accountRepo, TransactionRepository txnRepo) {
        this.accountRepo = accountRepo;
        this.txnRepo = txnRepo;
    }

    public List<Account> getAll() {
        return accountRepo.findAll();
    }

    public Account createAccount(Account acc) {
        if (acc.getAccountNumber() == null || acc.getAccountNumber().isEmpty()) {
            acc.setAccountNumber("AC" + System.currentTimeMillis());
        }
        acc.setBalance(acc.getBalance() == null ? 0.0 : acc.getBalance());
        return accountRepo.save(acc);
    }

    public Account getById(Long id) {
        return accountRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
    }

    @Transactional
    public void transfer(Long fromId, Long toId, Double amount) {
        Account from = getById(fromId);
        Account to = getById(toId);
        if (from.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }
        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);

        accountRepo.save(from);
        accountRepo.save(to);

        txnRepo.save(new Transaction(fromId, "DEBIT", amount, LocalDateTime.now(), "Transfer to account " + toId));
        txnRepo.save(new Transaction(toId, "CREDIT", amount, LocalDateTime.now(), "Transfer from account " + fromId));
    }
}
