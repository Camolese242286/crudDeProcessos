package com.qintess.lgpd.model;

import lombok.Data;

@Data
public class RespostaDTO {
    private Long processoId;      // id do Processos
    private Long pessoaId;
    private Long questaoId;       // id da Questao embutida
    private String textoResposta;
    private String status;
    
    public RespostaDTO() {}
    
    public RespostaDTO(Resposta resposta) {
    	this.processoId = resposta.getProcesso() != null ? resposta.getProcesso().getId() : null;
    	this.pessoaId = resposta.getProcessosPessoas() != null ? resposta.getProcessosPessoas().getId() : null;
    	this.questaoId = resposta.getQuestao() != null ? resposta.getQuestao().getId() : null;
    	this.textoResposta = resposta.getTextoResposta();
    	this.status = resposta.getStatus();
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

    public Long getQuestaoId() {
        return questaoId;
    }

    public void setQuestaoId(Long questaoId) {
        this.questaoId = questaoId;
    }

    public String getTextoResposta() {
        return textoResposta;
    }

    public void setTextoResposta(String textoResposta) {
        this.textoResposta = textoResposta;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    

    // você pode adicionar tipo, titulo, itens, opcoes e arquivo se quiser popular aqui
}

