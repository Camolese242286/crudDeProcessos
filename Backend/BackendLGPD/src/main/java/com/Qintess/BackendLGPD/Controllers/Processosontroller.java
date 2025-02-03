package com.Qintess.BackendLGPD.Controllers;

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

import com.Qintess.BackendLGPD.Models.Processos;
import com.Qintess.BackendLGPD.Services.Processoservice;


@RestController
@RequestMapping(value="processos")
public class Processosontroller {

	@Autowired
	private Processoservice service;
	
	
	
	@GetMapping
	public List<Processos> listartodos(){
		return service.listartodos();
	} 
    
	
	
	@PostMapping
	public Processos salvar(@RequestBody Processos processos) {
		return service.salvar(processos);
	}
	
	
	

	
	
	
	  @DeleteMapping("/{id}")
	    public ResponseEntity<Void> excluir(@PathVariable Long id){
		  
		  service.excluir(id);
		  

		   	 return ResponseEntity.noContent().build();
	  }
	  
	  @PutMapping("/{id}")
	  public Processos atualizar(@PathVariable Long id ,@RequestBody Processos processosAtualizados) {
		  
		  Processos update = service.atualizar(id, processosAtualizados); 
		  
		  processosAtualizados.setId(processosAtualizados.getId());
		  processosAtualizados.setName(processosAtualizados.getName());
		 
		 
		 return (processosAtualizados);
		 
		 
	  
	  
	  
	  }
	  
	  
	  @GetMapping("/{id}")
	  public Optional<Processos> getCompaniasById(@PathVariable Long id) {
		  Optional<Processos> companhias = service.getCompaniasById(id);
	      return service.getCompaniasById(id);
	  }
}
