package com.qintess.lgpd.controller;

import com.qintess.lgpd.model.Diretoria;
import com.qintess.lgpd.repository.DiretoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diretorias")
public class DiretoriaController {

    @Autowired
    private DiretoriaRepository diretoriaRepository;

    @GetMapping
    public List<Diretoria> listarTodas() {
        return diretoriaRepository.findAll();
    }

    @PostMapping
    public Diretoria criarDiretoria(@RequestBody Diretoria diretoria) {
        return diretoriaRepository.save(diretoria);
    }
}
