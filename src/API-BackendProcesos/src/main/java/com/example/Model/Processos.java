package com.example.Processos1.Model;

import java.security.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class Processos {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String Name;
	private String Prioridade;
    private String Status; 
	
	
	@CreationTimestamp
    @Column(name = "created_at", updatable = false)
	@JsonFormat(pattern ="dd/MM/yy")
	private LocalDate createdDate=LocalDate.now();
    

	@JsonFormat(pattern ="dd/MM/yy")
	private LocalDateTime ultimaAtualizacao;
	
     @PrePersist
    public void onCreate() {
    	createdDate=LocalDate.now();
    	setUpdatedAt(LocalDate.now());
    }
	
    
    @PreUpdate
    public void onUpdate() {
    	setUpdatedAt(LocalDate.now());
    
    }



	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getResponsavel() {
		return Responsavel;
	}
	public void setResponsavel(String responsavel) {
		Responsavel = responsavel;
	}
	public LocalDate getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}
		public LocalDate getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}
   	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}

   	public LocalDateTime getUltimaAtualizacao() {
		return ultimaAtualizacao;
	}

	public void setUltimaAtualizacao(LocalDateTime ultimaAtualizacao) {
		this.ultimaAtualizacao = ultimaAtualizacao;
	}

}
