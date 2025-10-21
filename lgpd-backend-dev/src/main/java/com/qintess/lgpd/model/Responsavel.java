package com.qintess.lgpd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "responsavel")
@Data
public class Responsavel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    public Responsavel() {}

    public Responsavel(String nome) {
        this.nome = nome;
    }
    //se der problema ao listar no GET tem q adcionar o getters e setters para validar

}