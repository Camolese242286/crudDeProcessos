package com.qintess.lgpd.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "areas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_area", nullable = false)
    private String nomeArea;

    @ManyToOne
    @JoinColumn(name = "id_responsavel", referencedColumnName = "id")
    private Responsavel responsavel;

    @ManyToOne
    @JoinColumn(name = "id_diretoria", referencedColumnName = "id")
    private Diretoria diretoria;

//    @Column(name = "subareas")
//    private String subArea;

    @OneToMany
    private List<Processos> processos;
    //carregar uma tabela de diretoria

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeArea() {
        return nomeArea;
    }

    public void setNomeArea(String nomeArea) {
        this.nomeArea = nomeArea;
    }

    /*public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }*/

    public Responsavel getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Responsavel responsavel) {
        this.responsavel = responsavel;
    }

//    public String getSubArea() {
//        return subArea;
//    }
//
//    public void setSubArea(String subArea) {
//        this.subArea = subArea;
//    }

    public List<Processos> getProcessos() {
        return processos;
    }

    public Diretoria getDiretoria() {
        return diretoria;
    }

    public void setDiretoria(Diretoria diretoria) {
        this.diretoria = diretoria;
    }

    public void setProcessos(List<Processos> processos) {
        this.processos = processos;
    }

}
