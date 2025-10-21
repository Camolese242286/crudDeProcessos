package com.qintess.lgpd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.qintess.lgpd.model.Pessoa;
import com.qintess.lgpd.model.Processos;
import com.qintess.lgpd.model.ProcessosPessoasDTO;

public interface ProcessosRepository extends JpaRepository<Processos, Long> {

	@Query("SELECT new com.qintess.lgpd.model.Pessoa(pes.id, pes.email, pes.emailre, pes.nome) " +
            "FROM Processos proc JOIN Pessoa pes ON proc.emailreCriadoPor = pes.emailre " +
            "WHERE proc.id = :processoId")
    List<Pessoa>getCriadorProcesso(@Param("processoId") Long processoId);
	
	void deleteByAreas_Id(Long areaId);
}



