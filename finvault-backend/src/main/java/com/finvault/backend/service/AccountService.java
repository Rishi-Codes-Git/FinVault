package com.finvault.backend.service;

import com.finvault.backend.entity.Account;
import com.finvault.backend.entity.TransactionEntity;
import com.finvault.backend.repository.AccountRepository;
import com.finvault.backend.repository.TransactionRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class AccountService {

    private final AccountRepository accountRepo;
    private final TransactionRepository txRepo;

    public AccountService(AccountRepository accountRepo, TransactionRepository txRepo) {
        this.accountRepo = accountRepo;
        this.txRepo = txRepo;
    }

    public Account getByUserId(Long userId) {
        return accountRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    @Transactional
    public void deposit(Long userId, BigDecimal amount, String note) {
        Account acc = accountRepo.findByUserId(userId).orElseThrow();

        Account locked = accountRepo.findByIdForUpdate(acc.getId()).orElseThrow();
        locked.setBalance(locked.getBalance().add(amount));

        accountRepo.save(locked);
        txRepo.save(new TransactionEntity(locked, "DEPOSIT", amount, null, note));
    }

    @Transactional
    public void withdraw(Long userId, BigDecimal amount, String note) {
        Account acc = accountRepo.findByUserId(userId).orElseThrow();

        Account locked = accountRepo.findByIdForUpdate(acc.getId()).orElseThrow();

        if (locked.getBalance().compareTo(amount) < 0)
            throw new RuntimeException("Insufficient balance");

        locked.setBalance(locked.getBalance().subtract(amount));

        accountRepo.save(locked);
        txRepo.save(new TransactionEntity(locked, "WITHDRAW", amount, null, note));
    }

    @Transactional
    public void transfer(Long userId, String targetAccNumber, BigDecimal amount, String note) {

        Account from = accountRepo.findByUserId(userId).orElseThrow();
        Account lockedFrom = accountRepo.findByIdForUpdate(from.getId()).orElseThrow();

        Account to = accountRepo.findByAccountNumber(targetAccNumber)
                .orElseThrow(() -> new RuntimeException("Target account not found"));

        Account lockedTo = accountRepo.findByAccountNumberForUpdate(targetAccNumber)
                .orElseThrow();

        if (lockedFrom.getBalance().compareTo(amount) < 0)
            throw new RuntimeException("Insufficient balance");

        lockedFrom.setBalance(lockedFrom.getBalance().subtract(amount));
        lockedTo.setBalance(lockedTo.getBalance().add(amount));

        accountRepo.save(lockedFrom);
        accountRepo.save(lockedTo);

        txRepo.save(new TransactionEntity(lockedFrom, "TRANSFER_OUT", amount, lockedTo.getAccountNumber(), note));
        txRepo.save(new TransactionEntity(lockedTo, "TRANSFER_IN", amount, lockedFrom.getAccountNumber(), note));
    }
}
