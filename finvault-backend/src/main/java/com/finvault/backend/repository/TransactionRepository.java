package com.finvault.backend.repository;

import com.finvault.backend.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {

    List<TransactionEntity> findByAccountIdOrderByCreatedAtDesc(Long accountId);
}
