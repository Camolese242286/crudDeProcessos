package com.qintess.lgpd.model;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="processos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Processos {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String nome;

	
	@Column(nullable = false)
	private String descricao;
	
	@Column(nullable = false)
	private String prioridade;
	
	@ManyToOne
    @JoinColumn(name = "id_area", nullable = false)
    private Area areas; 		
	
	@Column(nullable = false)
    private String status;       
    
    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
	@JsonFormat(pattern ="dd/MM/yy")
	private LocalDate createdDate=LocalDate.now();
    
    @Column(name = "criado_por")
	private String criadoPor;
    
    @Column(name = "emailre_criado_por")
    private String emailreCriadoPor;
    
    //@OneToMany(mappedBy = "processo", cascade = CascadeType.ALL, orphanRemoval = true)
    @ElementCollection
    private List<Questao> questoes;   
    
	public Long getId() {
		return id;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}

	public String getCriadoPor() {
		return criadoPor;
	}

	public void setCriadoPor(String criadoPor) {
		this.criadoPor = criadoPor;
	}

	public List<Questao> getQuestoes() {
		return questoes;
	}

	public void setQuestoes(List<Questao> questoes) {
		this.questoes = questoes;
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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getPrioridade() {
		return prioridade;
	}

	public void setPrioridade(String prioridade) {
		this.prioridade = prioridade;
	}

	public Area getAreas() {
		return areas;
	}

	public void setAreas(Area areas) {
		this.areas = areas;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@PrePersist
    protected void onCreate() {
    	createdDate=LocalDate.now();
		//setUpdatedDate(LocalDateTime.now());
    
    }
}
