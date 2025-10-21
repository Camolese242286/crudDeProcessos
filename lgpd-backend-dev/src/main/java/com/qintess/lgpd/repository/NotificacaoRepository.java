package com.qintess.lgpd.repository;

import com.qintess.lgpd.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    List<Notificacao> findAllByOrderByDataCriacaoDesc();
    
    List<Notificacao> findByDestinatarioIdAndLidaFalse(Long destinatarioId);

}