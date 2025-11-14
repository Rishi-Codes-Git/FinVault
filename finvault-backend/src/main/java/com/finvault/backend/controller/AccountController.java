package com.finvault.backend.controller;

import com.finvault.backend.config.JwtAuthPrincipal;
import com.finvault.backend.dto.AccountDto;
import com.finvault.backend.dto.AmountRequest;
import com.finvault.backend.dto.TransferRequest;
import com.finvault.backend.entity.Account;
import com.finvault.backend.service.AccountService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }


    @GetMapping
    public ResponseEntity<AccountDto> getAccount(@AuthenticationPrincipal JwtAuthPrincipal principal) {
        Account acc = accountService.getByUserId(principal.id());

        AccountDto dto = new AccountDto(
                acc.getAccountNumber(),
                acc.getBalance(),
                acc.getIsActive(),
                acc.getUser().getUsername(),
                acc.getUser().getEmail()
        );

        return ResponseEntity.ok(dto);
    }


    
    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(
            @AuthenticationPrincipal JwtAuthPrincipal principal,
            @Valid @RequestBody AmountRequest req
    ) {
        accountService.deposit(principal.id(), req.getAmount(), req.getNote());
        return ResponseEntity.ok("Deposit successful");
    }


    
    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(
            @AuthenticationPrincipal JwtAuthPrincipal principal,
            @Valid @RequestBody AmountRequest req
    ) {
        accountService.withdraw(principal.id(), req.getAmount(), req.getNote());
        return ResponseEntity.ok("Withdraw successful");
    }


    
    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(
            @AuthenticationPrincipal JwtAuthPrincipal principal,
            @Valid @RequestBody TransferRequest req
    ) {
        accountService.transfer(principal.id(), req.getToAccountNumber(), req.getAmount(), req.getNote());
        return ResponseEntity.ok("Transfer successful");
    }
}
