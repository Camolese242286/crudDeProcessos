package com.example.Perguntas.Ropository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Perguntas.Model.Perguntas;

public interface PerguntasRepository extends JpaRepository<Perguntas, Long>{

}
