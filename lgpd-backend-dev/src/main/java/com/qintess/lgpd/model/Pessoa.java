package com.qintess.lgpd.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pessoas")
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", length = 150, nullable = false)
    private String email;

    @Column(name = "emailre", length = 150, nullable = false)
    private String emailre;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    public Pessoa() {}

    public Pessoa(String email, String emailre, String nome) {
        this.email = email;
        this.emailre = emailre;
        this.nome = nome;
    }

    public Pessoa(Long id, String email, String emailre, String nome) {
    	this.id = id;
        this.email = email;
        this.emailre = emailre;
        this.nome = nome;
    }

    // getters & setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmailre() {
        return emailre;
    }

    public void setEmailre(String emailre) {
        this.email = emailre;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
