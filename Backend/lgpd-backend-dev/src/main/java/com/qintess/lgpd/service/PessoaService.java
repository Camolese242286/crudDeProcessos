package com.qintess.lgpd.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.qintess.lgpd.model.Pessoa;
import com.qintess.lgpd.repository.PessoaRepository;

@Service
public class PessoaService {

    private final PessoaRepository repo;

    public PessoaService(PessoaRepository repo) {
        this.repo = repo;
    }

    // CRUD básico
    public List<Pessoa> listarTodas() {
        return repo.findAll();
    }

    public Pessoa criar(Pessoa pessoa) {
        return repo.save(pessoa);
    }

    // retorna só e‑mails filtrados
    public List<String> buscarEmailsPorNome(String nome) {
        return repo.findEmailsByNomeContainingIgnoreCase(nome);
    }
}
