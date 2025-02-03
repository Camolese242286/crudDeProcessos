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

import com.Qintess.BackendLGPD.Models.*;
import com.Qintess.BackendLGPD.Services.*;






@RestController
@RequestMapping(value="areas")
public class AreasController {

	
	@Autowired
	private AreasService service;
	@GetMapping
	public List<Areas> listartodos(){
		return service.listartodos();
	} 
    
	
	
	@PostMapping
	public Areas salvar(@RequestBody Areas areas) {
		return service.salvar(areas);
	}
	
	
	

	
	
	
	  @DeleteMapping("/{id}")
	    public ResponseEntity<Void> excluir(@PathVariable Long id){
		  
		  service.excluir(id);
		  

		   	 return ResponseEntity.noContent().build();
	  }
	  
	  @PutMapping("/{id}")
	  public Areas atualizar(@PathVariable Long id ,@RequestBody Areas areasAtualizadas) {
		  
		  Areas update = service.atualizar(id, areasAtualizadas); 
		  
		  areasAtualizadas.setId(areasAtualizadas.getId());
		  areasAtualizadas.setName(areasAtualizadas.getName());
		 
		 
		 return (areasAtualizadas);
		 
		 
	  
	  
	  
	  }
	  
	  
	  @GetMapping("/{id}")
	  public Optional<Areas> getCompaniasById(@PathVariable Long id) {
		  Optional<Areas> companhias = service.getCompaniasById(id);
	      return service.getCompaniasById(id);
	  }
}
