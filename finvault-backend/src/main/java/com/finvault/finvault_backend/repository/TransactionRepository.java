package com.finvault.finvault_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.finvault.finvault_backend.model.Transaction;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountIdOrderByTimestampDesc(Long accountId);
}
