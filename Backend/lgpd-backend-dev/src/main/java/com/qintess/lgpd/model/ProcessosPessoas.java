package com.qintess.lgpd.model;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name="processos_pessoas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcessosPessoas {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "processo_id")
	private Long processoId;

	@Column(name = "pessoa_id")
	private Long pessoaId;

    //@Column(name = "nome_pessoa")
    //private String nomePessoa;

	@Column(name = "enviado_em", nullable = false)
	private LocalDate enviadoEm;

	@Column(name = "respondido_em")
	private LocalDate respondidoEm;

	@Column(name = "valido_ate")
	private LocalDate validoAte;

	@Column(name = "areas")
	private String areas;

	@Column(name = "status")
	private String status;

	//@Column(name = "lida")
	//private Boolean lida; // or boolean

	/*public Boolean getLida() {
		return lida;
	}

	public void setLida(Boolean lida) {
		this.lida = lida;
	}*/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProcessoId() {
		return processoId;
	}

	public void setProcessoId(Long processoId) {
		this.processoId = processoId;
	}

	public Long getPessoaId() {
		return pessoaId;
	}

	public void setPessoaId(Long pessoaId) {
		this.pessoaId = pessoaId;
	}

	/*public String getNomePessoa() {
		return nomePessoa;
	}

	public void setNomePessoa(String nomePessoa) {
		this.nomePessoa = nomePessoa;
	}*/

	public LocalDate getEnviadoEm() {
		return enviadoEm;
	}

	public void setEnviadoEm(LocalDate enviadoEm) {
		this.enviadoEm = enviadoEm;
	}

	public LocalDate getRespondidoEm() {
		return respondidoEm;
	}

	public void setRespondidoEm(LocalDate respondidoEm) {
		this.respondidoEm = respondidoEm;
	}

	public LocalDate getValidoAte() {
		return validoAte;
	}

	public void setValidoAte(LocalDate validoAte) {
		this.validoAte = validoAte;
	}

	public String getAreas() {
		return areas;
	}

	public void setAreas(String areas) {
		this.areas = areas;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


// Getters e setters (se necessário, mas o Lombok já gera)
}

