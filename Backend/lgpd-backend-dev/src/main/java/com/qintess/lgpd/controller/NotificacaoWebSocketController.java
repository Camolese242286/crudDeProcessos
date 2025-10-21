package com.qintess.lgpd.controller;

import com.qintess.lgpd.model.Notificacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Duration;
import java.time.LocalDateTime;

@Controller
public class NotificacaoWebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    public NotificacaoWebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    /**
     * Notifica todos os clientes conectados sobre uma nova notificação
     * @param notificacao A notificação a ser enviada
     */
    public void notificarNovaNotificacao(Notificacao notificacao) {
        calcularTimeAgo(notificacao);


        template.convertAndSend("/topic/notificacoes", notificacao);
    }

    private void calcularTimeAgo(Notificacao notificacao) {

        Duration duracao = Duration.between(notificacao.getDataCriacao(), LocalDateTime.now());

        if (duracao.toMinutes() < 1) {
            notificacao.setTimeAgo("agora");
        } else if (duracao.toHours() < 1) {
            notificacao.setTimeAgo(duracao.toMinutes() + "min");
        } else if (duracao.toDays() < 1) {
            notificacao.setTimeAgo(duracao.toHours() + "h");
        } else {
            notificacao.setTimeAgo(duracao.toDays() + "d");
        }
    }
}