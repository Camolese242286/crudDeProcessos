package com.qintess.lgpd.service;

import java.time.LocalDate;
import java.util.List;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.qintess.lgpd.model.ProcessosPessoas;
import com.qintess.lgpd.repository.ProcessosPessoaRepository;

@Component
public class VencimentoProcessosSchedulerService {

    @Autowired
    private ProcessosPessoaRepository repo;

    @PostConstruct
    public void aoIniciar() {
        marcarVencidos();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void marcarVencidos() {
        LocalDate hoje = LocalDate.now();
        List<ProcessosPessoas> expirados = repo.findByRespondidoEmIsNullAndValidoAteBefore(hoje);
        if (!expirados.isEmpty()) {
            expirados.forEach(pp -> pp.setStatus("Vencido"));
            repo.saveAll(expirados);
        }
    }
}
