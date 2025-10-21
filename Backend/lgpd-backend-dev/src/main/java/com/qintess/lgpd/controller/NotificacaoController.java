package com.qintess.lgpd.controller;

import com.qintess.lgpd.model.CriarNotificacaoRequest;
import com.qintess.lgpd.model.Notificacao;
import com.qintess.lgpd.model.NotificacaoDTO;
import com.qintess.lgpd.repository.NotificacaoRepository;
import com.qintess.lgpd.repository.PessoaRepository;
import com.qintess.lgpd.service.NotificacaoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificacoes")
public class NotificacaoController {

    private final NotificacaoService notificacaoService;
    
    @Autowired
    private NotificacaoRepository notificacaoRepository;
    
    //private RespostasService respostasService;

    public NotificacaoController(NotificacaoService notificacaoService) {
        this.notificacaoService = notificacaoService;
    }

    @GetMapping
    public ResponseEntity<List<NotificacaoDTO>> buscarNotificacoes() {
        try {
            List<NotificacaoDTO> notificacoes = notificacaoService.buscarTodasNotificacoes();
            return ResponseEntity.ok(notificacoes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/nao-lidas/{destinatarioId}")
    public List<Notificacao> buscarNaoLidas(@PathVariable Long destinatarioId) {
        return notificacaoRepository.findByDestinatarioIdAndLidaFalse(destinatarioId);
    }

    @PostMapping
    public ResponseEntity<NotificacaoDTO> criarNotificacao(@RequestBody CriarNotificacaoRequest request) {
        try {
            NotificacaoDTO notificacao = NotificacaoDTO.fromNotificacao(
                    notificacaoService.criarNotificacao(
                            request.getUserName(),
                            request.getProcessName(),
                            request.getProcessId()
                    )
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(notificacao);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /*@PostMapping("/marcar-lida/{id}")
    public ResponseEntity<Void> marcarComoLida(@PathVariable Long id) {
        try {
            notificacaoService.marcarComoLida(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }  */
    
    @PutMapping("/{id}/ler")
    public ResponseEntity<?> marcarComoLida(@PathVariable Long id) {
        Notificacao notificacao = notificacaoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notificação não encontrada"));

        notificacao.setLida(true);
        notificacaoRepository.save(notificacao);

        return ResponseEntity.ok().build();
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarNotificacao(@PathVariable Long id) {
        try {
            notificacaoService.deletarNotificacao(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}