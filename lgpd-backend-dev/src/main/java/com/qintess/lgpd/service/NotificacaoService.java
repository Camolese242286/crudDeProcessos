package com.qintess.lgpd.service;

import com.qintess.lgpd.model.NotificacaoDTO;
import com.qintess.lgpd.model.Pessoa;
import com.qintess.lgpd.model.Processos;
import com.qintess.lgpd.model.Notificacao;
import com.qintess.lgpd.repository.NotificacaoRepository;
import com.qintess.lgpd.repository.PessoaRepository;
import com.qintess.lgpd.repository.ProcessosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository notificacaoRepository;
    
    @Autowired 
    private EmailService emailService;
    
    @Autowired
    private ProcessosRepository processosRepository;
    
    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public Notificacao criarNotificacao(String userName, String processName, Long processId) {
        if (userName == null || processName == null || processId == null) {
            throw new IllegalArgumentException("Parâmetros inválidos para criar notificação.");
        }

        Notificacao notificacao = new Notificacao(userName, processName, processId);
        notificacao = notificacaoRepository.save(notificacao);

        // Envia via WebSocket
        enviarNotificacaoWebSocket(notificacao);

        return notificacao;
    }

    public List<NotificacaoDTO> buscarTodasNotificacoes() {
        return notificacaoRepository.findAllByOrderByDataCriacaoDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void marcarComoLida(Long id) {
        notificacaoRepository.findById(id).ifPresent(notificacao -> {
            notificacao.setLida(true);
            notificacaoRepository.save(notificacao);
        });
    }

    public void deletarNotificacao(Long id) {
        if (id != null && notificacaoRepository.existsById(id)) {
            notificacaoRepository.deleteById(id);
        }
    }

    private void enviarNotificacaoWebSocket(Notificacao notificacao) {
        messagingTemplate.convertAndSend("/topic/notificacoes", convertToDTO(notificacao));
    }

    private NotificacaoDTO convertToDTO(Notificacao notificacao) {
        NotificacaoDTO dto = new NotificacaoDTO();
        dto.setId(notificacao.getId());
        dto.setUserName(notificacao.getUserName());
        dto.setProcessName(notificacao.getProcessName());
        dto.setProcessoId(notificacao.getProcessId());
        dto.setTimeAgo(notificacao.getTimeAgo());
        dto.setClassName(notificacao.getClassName());
        dto.setDataCriacao(notificacao.getDataCriacao());
        return dto;
    }
    
    //Receber a chamada dos usuários na notificação
    /*public void notificarResponsavel(Long processoId, Long usuarioId) {
    	Processos processo = processosRepository.findById(processoId).orElseThrow();
    	Pessoa responsavel = pessoaRepository.findById(Long.parseLong(processo.getCriadoPor())).orElseThrow();
    	
    	emailService.sendHtmlEmail(
    		new String[] {responsavel.getEmail()},
    		"Usuario respondeu o questionário",
    		"O usuario respondeu o questionário do processo: " + processo.getNome()
    	);
    }*/
}
