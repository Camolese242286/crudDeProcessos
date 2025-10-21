package com.qintess.lgpd.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.qintess.lgpd.model.ProcessosPessoasDTO;
import com.qintess.lgpd.model.Resposta;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qintess.lgpd.model.ProcessosPessoas;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProcessosPessoaRepository extends JpaRepository<ProcessosPessoas, Long>{

    List<ProcessosPessoas> findByProcessoId(Long processoId);
    Optional<ProcessosPessoas> findById(Long id);

    @Query("SELECT new com.qintess.lgpd.model.ProcessosPessoasDTO(pp.id, pp.processoId, pp.pessoaId, p.nome, pp.enviadoEm, pp.respondidoEm, pp.validoAte, pp.areas, pp.status) " +
            "FROM ProcessosPessoas pp JOIN Pessoa p ON pp.pessoaId = p.id " +
            "WHERE pp.processoId = :processoId")
    
    List<ProcessosPessoasDTO>buscarPorProcessoComNome(@Param("processoId") Long processoId);
    
    boolean existsByProcessoIdAndPessoaId(Long processoId, Long pessoaId);
    List<ProcessosPessoas> findByRespondidoEmIsNullAndValidoAteBefore(LocalDate hoje);
    
    ProcessosPessoas findByProcessoIdAndPessoaId(Long processoId, Long pessoaId);

}
