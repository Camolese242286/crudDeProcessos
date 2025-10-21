package com.qintess.lgpd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qintess.lgpd.model.Processos;
import com.qintess.lgpd.model.Questao;
import com.qintess.lgpd.model.Resposta;
import com.qintess.lgpd.model.RespostaDTO;
import com.qintess.lgpd.model.RespostaRequest;
import com.qintess.lgpd.repository.ProcessosRepository;
import com.qintess.lgpd.repository.RespostaRepository;

@Service
public class RespostasService {
	
	@Autowired
	private RespostaRepository respostaRepository;
	
    @Autowired
    private ProcessosRepository processosRepository;
    
    /*@Autowired
    private QuestaoRepository questaoRepository;*/
	
	public void salvarRespostas(RespostaRequest request) {
		for (RespostaDTO respostaDTO : request.getRespostas()) {
			Resposta resposta = new Resposta();
			 // Buscar o processo pelo ID
	        Processos processo = processosRepository.findById(request.getProcessoId()).orElseThrow();
	        resposta.setProcesso(processo);

	        // Buscar a questão pelo ID (se necessário)
	        //Questao questao = questaoRepository.findById(respostaDTO.getQuestaoId()).orElseThrow();
	        //resposta.setQuestao(questao);

	        resposta.setTextoResposta(respostaDTO.getTextoResposta());
            resposta.setStatus(respostaDTO.getStatus()); 
            respostaRepository.save(resposta);
			
		}
	}
	
}
