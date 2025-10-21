package com.qintess.lgpd.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.qintess.lgpd.model.Pessoa;
import com.qintess.lgpd.service.PessoaService;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController {

    private final PessoaService service;

    public PessoaController(PessoaService service) {
        this.service = service;
    }

    /** GET  /api/pessoas → lista todos os registros */
    @GetMapping
    public List<Pessoa> listarTodas() {
        return service.listarTodas();
    }

    /** POST /api/pessoas/create → cria um novo registro (recebe JSON com nome+email) */
    @PostMapping("/create")
    public ResponseEntity<Pessoa> criar(@RequestBody Pessoa pessoa) {
        Pessoa salva = service.criar(pessoa);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    /** GET /api/pessoas/emails?nome=xxx → retorna só os e‑mails filtrados */
    @GetMapping("/emails")
    public List<String> buscarEmails(@RequestParam(name = "nome", defaultValue = "") String nome) {
        return service.buscarEmailsPorNome(nome);
    }
}
