package com.qintess.lgpd.service;

import com.qintess.lgpd.model.Notificacao;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificacaoWebSocketService {

    private static final String TOPIC_NOTIFICACOES = "/topic/notificacoes";

    private final SimpMessagingTemplate messagingTemplate;

    public NotificacaoWebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void enviarNotificacao(Notificacao notificacao) {
        try {
            messagingTemplate.convertAndSend(TOPIC_NOTIFICACOES, notificacao);
        } catch (Exception e) {
            // Logar erro sem interromper o fluxo principal
            System.err.println("Erro ao enviar notificação via WebSocket: " + e.getMessage());
        }
    }
}