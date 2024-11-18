package com.example.Processos.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.Processos.Entity.Processos;
import com.example.Processos.controler.*;
import com.example.Processos.repository.*;

public class controler {

	@Autowired
	private ProcessosRepository processosRepositoy;
	
	
	@RequestMapping(value="mostrarnome/{nome}",method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public String greetingText(@PathVariable String nome) {
		
		
		Processos processos = new Processos();
		processos.setName(nome);
		
		processosRepositoy.save(processos);
		
		return "nome " + nome ;
	}


	@GetMapping(value= "listtatodos")
	@ResponseBody
	public ResponseEntity< java.util.List<Processos> > lista(){
		
	java.util.List<Processos> processos=	processosRepositoy.findAll();
	
	return new ResponseEntity<java.util.List<Processos>>(processos, HttpStatus.OK);
	}


	@PostMapping(value= "salvar")
	@ResponseBody
	public ResponseEntity<Processos> salvar (@RequestBody Processos processos){
		
		Processos user=processosRepositoy.save(processos); 
	
	return  new ResponseEntity<Processos>(user, HttpStatus.OK);
	}
	
	@DeleteMapping(value= "delete")
	@ResponseBody
	public ResponseEntity<String> deletar (@RequestParam long iduser){
		
		processosRepositoy.deleteById(iduser);
	
	return  new ResponseEntity<String>("requisito deletado com suceso ", HttpStatus.OK);
	}
	
	
	
	@GetMapping(value= "atualizar")
	@ResponseBody
	public ResponseEntity<Processos> atualizar (@RequestParam Processos processos){
		
		Processos  user = processosRepositoy.save(processos);
	
	return  new ResponseEntity<Processos>(user, HttpStatus.OK);
	}	

	
	@PutMapping(value= "buscaruserid")
	@ResponseBody
	public ResponseEntity<Processos> buscaruserid (@RequestParam(name="idProcessos") long idProcessos){
		
		Processos processos =  processosRepositoy.findById(idProcessos).get();
	
	return  new ResponseEntity<Processos>(processos, HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	public ProcessosRepository getUsuarioRepositoy() {
		return processosRepositoy;
	}


	public void setUsuarioRepositoy(ProcessosRepository usuarioRepositoy) {
		this.processosRepositoy = usuarioRepositoy;
	}



}
