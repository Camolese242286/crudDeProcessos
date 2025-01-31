package com.example.Perguntas.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Perguntas.Model.Perguntas;
import com.example.Perguntas.Service.PerguntasService;

@RestController
@RequestMapping(value="perguntas")
public class PerguntasController {
	
	
	@Autowired
	PerguntasService service;

	@GetMapping
	public List<Perguntas> listarTodos(){
		return service.listarTodos();
	}
	
	@PostMapping
	public Perguntas salvar(@RequestBody Perguntas Perguntas) {
		return service.salvar(Perguntas);
	}
	
	
	@PutMapping("/{id}")
	public Perguntas atualizar(@PathVariable Long id ,@RequestBody Perguntas PerguntasAtualizadas) {
		Perguntas update= service.atualizar(id, PerguntasAtualizadas);
		
		PerguntasAtualizadas.setId(PerguntasAtualizadas.getId());
		PerguntasAtualizadas.setTitulo(PerguntasAtualizadas.getTitulo());
	
	return (PerguntasAtualizadas);
	
	
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Perguntas> excluir(@PathVariable Long id) {
		
		 service.excluir(id);
	
	return ResponseEntity.noContent().build();
	
	}
	
	@GetMapping("/{id}")
	public Optional<Perguntas> GetById(@PathVariable Long id){
		
		Optional<Perguntas> Perguntas = service.GetById(id);
		
		return service.GetById(id);
	}
}
