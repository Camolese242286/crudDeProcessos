package com.qintess.lgpd.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "diretorias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diretoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}