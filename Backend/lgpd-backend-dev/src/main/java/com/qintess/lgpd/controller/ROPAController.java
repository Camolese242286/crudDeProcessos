package com.qintess.lgpd.controller;

import com.qintess.lgpd.model.ROPA;
import com.qintess.lgpd.repository.ROPARepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ropa")
public class ROPAController {

    private final ROPARepository ropaRepository;

    public ROPAController(ROPARepository ropaRepository) {
        this.ropaRepository = ropaRepository;
    }

    @GetMapping
    public List<ROPA> getAllArtigos() {
        // Retorna todos os artigos ordenados pelo ID em ordem crescente
        return ropaRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ROPA> getArtigoById(@PathVariable Long id) {
        return ropaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}