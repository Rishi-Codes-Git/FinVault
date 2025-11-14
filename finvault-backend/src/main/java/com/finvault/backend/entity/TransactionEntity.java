package com.finvault.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    private String txType; 

    @Column(precision = 18, scale = 2)
    private BigDecimal amount;

    private String counterpartyAccountNumber;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String note;

    public TransactionEntity() {}

    public TransactionEntity(Account account, String txType, BigDecimal amount, String counterparty, String note) {
        this.account = account;
        this.txType = txType;
        this.amount = amount;
        this.counterpartyAccountNumber = counterparty;
        this.note = note;
    }

    public Long getId() { return id; }

    public Account getAccount() { return account; }

    public void setAccount(Account account) { this.account = account; }

    public String getTxType() { return txType; }

    public void setTxType(String txType) { this.txType = txType; }

    public BigDecimal getAmount() { return amount; }

    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCounterpartyAccountNumber() { return counterpartyAccountNumber; }

    public void setCounterpartyAccountNumber(String counterpartyAccountNumber) { this.counterpartyAccountNumber = counterpartyAccountNumber; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public String getNote() { return note; }

    public void setNote(String note) { this.note = note; }
}
