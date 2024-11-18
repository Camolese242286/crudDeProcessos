package com.example.Processos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Processos.Entity.Processos;


@Repository
public interface ProcessosRepository extends JpaRepository<Processos, Long>{
    
}
