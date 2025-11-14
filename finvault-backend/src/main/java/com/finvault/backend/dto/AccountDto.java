package com.finvault.backend.dto;

import java.math.BigDecimal;

public class AccountDto {

    private String accountNumber;
    private BigDecimal balance;
    private Boolean isActive;
    private String username;
    private String email;

    public AccountDto(String accountNumber, BigDecimal balance, Boolean isActive, String username, String email) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.isActive = isActive;
        this.username = username;
        this.email = email;
    }

    
    public String getAccountNumber() { return accountNumber; }

    public BigDecimal getBalance() { return balance; }

    public Boolean getIsActive() { return isActive; }

    public String getUsername() { return username; }

    public String getEmail() { return email; }
}
