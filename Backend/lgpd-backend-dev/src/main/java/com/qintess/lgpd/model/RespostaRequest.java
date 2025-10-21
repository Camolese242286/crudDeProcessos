package com.qintess.lgpd.model;

import java.util.List;

import lombok.Data;

@Data
public class RespostaRequest {
	private Long usuarioId;
	private Long processoId;
	private List<RespostaDTO> respostas;
}
