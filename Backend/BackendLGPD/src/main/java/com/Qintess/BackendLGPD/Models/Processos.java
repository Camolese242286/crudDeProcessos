package com.Qintess.BackendLGPD.Models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

@Entity
public class Processos {
	





	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String Name;
	private String Responsavel;
	 private String Status; 
	private String  Descricao;
	private String  CreatedBy; 
	 
	
	 
	 private LocalDateTime dataCriacao;
	  private LocalDateTime dataUltimaAtualizacao;
	
	
	
	
	public LocalDateTime getDataUltimaAtualizacao() {
		return dataUltimaAtualizacao;
	}


	public void setDataUltimaAtualizacao(LocalDateTime dataUltimaAtualizacao) {
		this.dataUltimaAtualizacao = dataUltimaAtualizacao;
	}


	public LocalDateTime getDataCriacao() {
		return dataCriacao;
	}


	public void setDataCriacao(LocalDateTime dataCriacao) {
		this.dataCriacao = dataCriacao;
	}




	public String getCreatedBy() {
		return CreatedBy;
	}


	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}


	


	@CreationTimestamp
	@Column(name = "created_at", updatable = false,nullable = false)
	@JsonFormat(pattern = "dd/MM/yy")
	
	
	private LocalDate createdDate=LocalDate.now();
	
	
	
	//@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern ="dd/MM/yy")
    private LocalDate updatedDate;
	
    @PrePersist
    public void onCreate() {
    	createdDate=LocalDate.now();
    	setUpdatedDate(LocalDate.now());
         }

    
	
    
    @PreUpdate
    public void onUpdate() {
    	this.setUpdatedDate(LocalDate.now());
    
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
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}


	public LocalDate getUpdatedDate() {
		return updatedDate;
	}


	public void setUpdatedDate(LocalDate updatedDate) {
		this.updatedDate = updatedDate;
	}


	public String getDescricao() {
		return Descricao;
	}


	public void setDescricao(String descricao) {
		Descricao = descricao;
	}
	
}
