package com.qintess.lgpd.model;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class CriarProcessosPessoasRequest {
	private List<Long> responsaveisIds;
	private Long processoId;
	private String nomeArea;
	private LocalDate validoAte;	
	
}
