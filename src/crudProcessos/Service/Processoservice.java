package com.example.Processos1.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Processos1.Model.Processos;
import com.example.Processos1.Repository.ProcessosRepository;



@Service
public class Processoservice {

	
	
	 @Autowired
		private ProcessosRepository repository;
		
		public List<Processos> listartodos(){
			
			return repository.findAll();
		}
		
		
		public Processos salvar(Processos processos) {
			
			
			return  repository.save(processos);
		}
		
		
		
		public Processos atualizar(Long id , Processos processoAtulizado) {
			
			if (repository.existsById(id)) {
				 processoAtulizado.setId(id);
			
				
				return repository.save( processoAtulizado);
			}
			return null;
		}
		
		
		 public Optional<Processos> getCompaniasById(Long id) {
		        return repository.findById(id);
		    }
		
		
		
		public void excluir(Long id) {
			
			 repository.deleteById(id);
		}
}
