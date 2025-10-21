package com.qintess.lgpd.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ProcessosPessoasDTO {
    private Long id;
    private Long processoId;
    private Long pessoaId;
    private String pessoaNome;
    //private String pessoaEmail;
    private LocalDate enviadoEm;
    private LocalDate respondidoEm;
    private LocalDate validoAte;
    private String areas;    
    private String status;

    public ProcessosPessoasDTO(Long id, Long processoId, Long pessoaId, String pessoaNome,
                               LocalDate enviadoEm, LocalDate respondidoEm, LocalDate validoAte, String areas, String status) {
        this.id = id;
        this.processoId = processoId;
        this.pessoaId = pessoaId;
        this.pessoaNome = pessoaNome;
        this.enviadoEm = enviadoEm;
        this.respondidoEm = respondidoEm;
        this.validoAte = validoAte;
        this.areas = areas;
        this.status = status;
    }
    
    public ProcessosPessoasDTO(ProcessosPessoas pp, Pessoa pessoa) {
        this.id = pp.getId();
        this.processoId = pp.getProcessoId();
        this.pessoaId = pp.getPessoaId();
        this.pessoaNome = pessoa.getNome();
        //this.pessoaEmail = pessoa.getEmail();
        this.enviadoEm = pp.getEnviadoEm();
        this.respondidoEm = pp.getRespondidoEm();
        this.validoAte = pp.getValidoAte();
        this.areas = pp.getAreas();
        this.status = calcularStatus(pp);
    }
    
    private String calcularStatus(ProcessosPessoas pp) {
        if (pp.getRespondidoEm() != null) {
            return "respondido";
        } else if (pp.getValidoAte() != null && pp.getValidoAte().isBefore(LocalDate.now())) {
            return "vencido";
        } else {
            return "dentro_do_prazo";
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProcessoId() {
        return processoId;
    }

    public void setProcessoId(Long processoId) {
        this.processoId = processoId;
    }

    public String getPessoaNome() {
        return pessoaNome;
    }

    public void setPessoaNome(String pessoaNome) {
        this.pessoaNome = pessoaNome;
    }

    public Long getPessoaId() {
        return pessoaId;
    }

    public void setPessoaId(Long pessoaId) {
        this.pessoaId = pessoaId;
    }

    /*public String getPessoaEmail() {
        return pessoaEmail;
    }

    public void setPessoaEmail(String pessoaEmail) {
        this.pessoaEmail = pessoaEmail;
    }*/

    public LocalDate getEnviadoEm() {
        return enviadoEm;
    }

    public void setEnviadoEm(LocalDate enviadoEm) {
        this.enviadoEm = enviadoEm;
    }

    public LocalDate getRespondidoEm() {
        return respondidoEm;
    }

    public void setRespondidoEm(LocalDate respondidoEm) {
        this.respondidoEm = respondidoEm;
    }

    public LocalDate getValidoAte() {
        return validoAte;
    }

    public void setValidoAte(LocalDate validoAte) {
        this.validoAte = validoAte;
    }

    public String getAreas() {
        return areas;
    }

    public void setAreas(String areas) {
        this.areas = areas;
    }
}
