package com.qintess.lgpd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.qintess.lgpd.model.Responsavel;
import com.qintess.lgpd.repository.ResponsavelRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/responsavel")
public class ResponsavelController {

    @Autowired
    private ResponsavelRepository responsavelRepository;

    // Endpoint para obter todas as áreas
    /*@GetMapping
    public List<Responsavel> getResponsavel() {
        return responsavelRepository.findAll();
    }*/


    @PostMapping("/criar")
    public ResponseEntity<Responsavel> criarResponsavel(@RequestBody Responsavel responsavel) {
        Responsavel novoResponsavel = responsavelRepository.save(responsavel);
        return ResponseEntity.ok(novoResponsavel);
    }

    @GetMapping
    public ResponseEntity<List<Responsavel>> listarResponsaveis() {
        List<Responsavel> responsaveis = responsavelRepository.findAll();
        return ResponseEntity.ok(responsaveis);
    }


    // Endpoint para obter todas as áreas
    /*@GetMapping
    public List<Responsavel> getResponsavel() {
        return responsavelRepository.findAll();
    }*/


}
