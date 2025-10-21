package com.qintess.lgpd.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
public class Notificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String processName;

    @Column(nullable = false)
    private Long processoId; // Novo campo para o ID do processo

    @Column(name = "usuarioId")
    private Long usuarioId; // Quem respondeu

    @Column(name = "destinatarioId")
    private Long destinatarioId; // Quem recebe a notificação (responsável)

    @Transient
    private String timeAgo; // Calculado dinamicamente

    @Column(nullable = false)
    private boolean lida = false; // Status de leitura

    @Column(nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    // Construtores
    public Notificacao() {}

    public Notificacao(String userName, String processName, Long processoId) {
        this.userName = userName;
        this.processName = processName;
        this.processoId = processoId;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public Long getProcessId() {
        return processoId;
    }

    public void setProcessId(Long processoId) {
        this.processoId = processoId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getDestinatarioId() {
        return destinatarioId;
    }

    public void setDestinatarioId(Long destinatarioId) {
        this.destinatarioId = destinatarioId;
    }

    public String getTimeAgo() {
        if (dataCriacao == null) {
            return "agora";
        }

        long minutos = ChronoUnit.MINUTES.between(dataCriacao, LocalDateTime.now());

        if (minutos < 1) {
            return "agora";
        } else if (minutos < 60) {
            return minutos + " minuto" + (minutos > 1 ? "s" : "");
        } else {
            long horas = ChronoUnit.HOURS.between(dataCriacao, LocalDateTime.now());
            if (horas < 24) {
                return horas + " hora" + (horas > 1 ? "s" : "");
            } else {
                long dias = ChronoUnit.DAYS.between(dataCriacao, LocalDateTime.now());
                return dias + " dia" + (dias > 1 ? "s" : "");
            }
        }
    }

    public boolean isLida() {
        return lida;
    }

    public void setLida(boolean lida) {
        this.lida = lida;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    // Método para obter a classe CSS baseada no status
    public String getClassName() {
        return lida ? "" : "new";
    }

    public void setTimeAgo(String agora) {
    }
}