package com.qintess.lgpd.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.qintess.lgpd.model.ProcessosPessoas;
import com.qintess.lgpd.model.Resposta;

@Repository
public interface RespostaRepository extends JpaRepository<Resposta, Long> {
    List<Resposta> findByProcessoId(Long processoPessoaId);
    
    List<Resposta> findByProcessosPessoas(ProcessosPessoas processosPessoas);
    
    //List<Resposta> findByProcessoIdAndPessoaId(Long processoId, Long pessoaId);
    
    /*@Query("SELECT r FROM Resposta r WHERE r.processo.id = :processoId AND r.processosPessoas.pessoa.id = :pessoaId")
    List<Resposta> findByProcessoIdAndPessoaId(@Param("processoId") Long processoId, @Param("pessoaId") Long pessoaId);*/
}
