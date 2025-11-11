package com.finvault.finvault_backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.finvault.finvault_backend.model.Account;
import com.finvault.finvault_backend.dto.TransferRequest;
import com.finvault.finvault_backend.service.AccountService;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @GetMapping
    public List<Account> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Account create(@RequestBody Account acc) {
        return service.createAccount(acc);
    }

    @PostMapping("/transfer")
    public void transfer(@RequestBody TransferRequest req) {
        service.transfer(req.getFromId(), req.getToId(), req.getAmount());
    }
}
