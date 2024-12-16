package com.example.Areas.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Areas.Model.Areas;
import com.example.Areas.Repository.AreasRepository;

@Service
public class AreasService {

	
	
	
	@Autowired
	private AreasRepository repository;
	
	public List<Areas> listartodos(){
		
		return repository.findAll();
	}
	
	
	public Areas salvar(Areas areas) {
		
		
		return  repository.save(areas);
	}
	
	
	
	public Areas atualizar(Long id , Areas areaAtulizada) {
		
		if (repository.existsById(id)) {
			areaAtulizada.setId(id);
		
			
			return repository.save( areaAtulizada);
		}
		return null;
	}
	
	
	 public Optional<Areas> getCompaniasById(Long id) {
	        return repository.findById(id);
	    }
	
	
	
	public void excluir(Long id) {
		
		 repository.deleteById(id);
	}
}
