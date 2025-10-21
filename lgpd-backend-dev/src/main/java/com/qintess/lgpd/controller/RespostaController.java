package com.qintess.lgpd.controller;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.qintess.lgpd.model.*;
import com.qintess.lgpd.repository.ProcessosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.qintess.lgpd.repository.ProcessosPessoaRepository;
import com.qintess.lgpd.repository.RespostaRepository;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/respostas")
@CrossOrigin(origins = "http://localhost:3000")
public class RespostaController {

    @Autowired
    private RespostaRepository respostaRepo;

    @Autowired
    private ProcessosRepository processosRepo;
    
    @Autowired
    private ProcessosPessoaRepository processosPessoasRepo;
    
    //@Autowired
    //private QuestaoRepository questaoRepository;
    
    
    /*@GetMapping
    public List<Resposta> get() {
        return respostaRepo.findAll();
    }*/
    
    @GetMapping("/processo/{processoId}")
    public List<Resposta> listarPorProcesso(@PathVariable Long processoId) {
        return respostaRepo.findByProcessoId(processoId);
    }
    
    @GetMapping
    public List<RespostaDTO> listarPorUsuarioEProcesso(
        @RequestParam("pessoaId") Long pessoaId,
        @RequestParam("processoId") Long processoId
    ) {
        ProcessosPessoas pp = processosPessoasRepo.findByProcessoIdAndPessoaId(processoId, pessoaId);
        if (pp == null) return Collections.emptyList();
        return respostaRepo.findByProcessosPessoas(pp)
        		.stream()
        		.map(RespostaDTO::new)
        		.collect(Collectors.toList());
    }
    
    /*@GetMapping("/por-processo-e-pessoa")
    public List<Resposta> listarPorProcessoEPessoa(
        @RequestParam("processoId") Long processoId,
        @RequestParam("pessoaId") Long pessoaId
    ) {
        ProcessosPessoas pp = processosPessoasRepo.findByProcessoIdAndPessoaId(processoId, pessoaId);
        if (pp == null) return Collections.emptyList();
        return respostaRepo.findByProcessosPessoas(pp)
            .stream()
            .map(RespostaDTO::new)
            .collect(Collectors.toList());
    }*/

    @PostMapping
    public ResponseEntity<Resposta> criarResposta(@RequestBody RespostaDTO dto) {
        // 1) Carrega o processo; se não existir, erro 404
        Processos proc = processosRepo.findById(dto.getProcessoId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Processo não encontrado"));
        
        /*Questao questao = questaoRepository.findById(dto.getQuestaoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Questão não encontrada"));*/

        // 2) Monta o objeto Questao só com o ID
        Questao questao = new Questao();
        questao.setId(dto.getQuestaoId());

        ProcessosPessoas pp = processosPessoasRepo.findByProcessoIdAndPessoaId(dto.getProcessoId(), dto.getPessoaId());
        // 3) Cria a Resposta, associando o processo, a questão e demais campos
        Resposta r = new Resposta();
        r.setProcesso(proc);
        r.setQuestao(questao);
        r.setTextoResposta(dto.getTextoResposta());
        r.setRespondidoEm(LocalDate.now());
        r.setStatus(dto.getStatus());
        r.setProcessosPessoas(pp);

        // 4) Salva; o ID será o mesmo do processo
        Resposta salva = respostaRepo.save(r);

        return ResponseEntity.ok(salva);
    }
    
    /*@PostMapping("/respostas")
    public ResponseEntity<?> receberRespostas(@RequestBody RespostaRequest request) {
        // Salve as respostas no banco (crie a lógica conforme seu modelo)
        respostasService.salvarRespostas(request);

        // Envie notificação ou e-mail para o responsável
        notificacaoService.notificarResponsavel(
            request.getProcessoId(),
            request.getUsuarioId()
        );

        return ResponseEntity.ok().build();
    }*/
   
}
