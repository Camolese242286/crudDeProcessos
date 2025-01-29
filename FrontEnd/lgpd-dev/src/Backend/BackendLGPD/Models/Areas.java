package com.example.Areas.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Areas {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String Name;
	private String Responsavel;
	private Long SubArea;
	private String Status;
	private String Descricao;
	private String acoes;
	
	
	
	
	
	
	
	
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

    	public Long getSubArea() {
		return SubArea;
	}
	public void setSubArea(Long subArea) {
		SubArea = subArea;
	}

		public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}
    

	public String getDescricao() {
		return Descricao;
	}


	public void setDescricao(String descricao) {
		Descricao = descricao;
	}

   public String getAcoes() {
		return acoes;
	}
	public void setAcoes(String acoes) {
		this.acoes = acoes;
	}

}
