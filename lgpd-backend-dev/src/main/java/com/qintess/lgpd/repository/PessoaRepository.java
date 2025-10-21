package com.qintess.lgpd.repository;

import java.util.List;

import com.qintess.lgpd.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

	// busca objetos completos por parte do nome
	List<Pessoa> findByNomeContainingIgnoreCase(String nome);

	// retorna apenas os e‑mails das pessoas cujo nome contenha o parâmetro
	@Query("""
      SELECT p.email
      FROM Pessoa p
      WHERE lower(p.nome) LIKE lower(concat('%', :nome, '%'))
    """)
	List<String> findEmailsByNomeContainingIgnoreCase(@Param("nome") String nome);
}
