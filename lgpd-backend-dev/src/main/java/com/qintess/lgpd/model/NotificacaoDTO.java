package com.qintess.lgpd.model;

import java.time.LocalDateTime;

public class NotificacaoDTO {
    private Long id;
    private String userName;
    private String processName;
    private Long processoId;
    private String timeAgo;
    private String className;

    public Long getProcessoId() {
        return processoId;
    }

    public void setProcessoId(Long processoId) {
        this.processoId = processoId;
    }

    public Boolean getLida() {
        return lida;
    }

    public void setLida(Boolean lida) {
        this.lida = lida;
    }

    private Boolean lida;
    private LocalDateTime dataCriacao;

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

    public String getTimeAgo() {
        return timeAgo;
    }

    public void setTimeAgo(String timeAgo) {
        this.timeAgo = timeAgo;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public static NotificacaoDTO fromNotificacao(Notificacao notificacao) {
        NotificacaoDTO dto = new NotificacaoDTO();
        dto.setId(notificacao.getId());
        dto.setUserName(notificacao.getUserName());
        dto.setProcessName(notificacao.getProcessName());
        dto.setProcessoId(notificacao.getProcessId());
        dto.setDataCriacao(notificacao.getDataCriacao());
        // Set other fields as needed
        return dto;
    }
}