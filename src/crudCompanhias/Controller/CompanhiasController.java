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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import com.example.Mensagem.model.Mensagem;
import com.example.companhias.Model.Companhias;
import com.example.companhias.Service.CompanhiasService;

@RestController
@RequestMapping(value="companhias")

public class CompaniasController {
  @Autowired
	private CompanhiasService service;
	@GetMapping	(value="listar")
	public List<Companhias> listartodos(){
		return service.listartodos();
	} 
    
	
	
	@PostMapping(value="salvar")
	public Companhias salvar(@RequestBody Companhias companhias) {
		return service.salvar(companhias);
	}
	
	
	

	
	
	
	  @DeleteMapping(value="deletar")
	    public ResponseEntity<Void> excluir(@RequestParam Long id){
		  
		  service.excluir(id);
		  

		   	 return ResponseEntity.noContent().build();
	  }
	  
	  @PutMapping("/{id}")
	  public Companhias atualizar(@PathVariable Long id ,@RequestBody Companhias companhiasAtualizadas) {
		  
		 Companhias updateCompanias = service.atualizar(id, companhiasAtualizadas); 
		  
		 companhiasAtualizadas.setId(companhiasAtualizadas.getId());
		 companhiasAtualizadas.setName(companhiasAtualizadas.getName());
		 
		 
		 return (companhiasAtualizadas);
		 
		 
	  
	  
	  
	  }
	  
	  
	  @GetMapping("/{id}")
	  public Optional<Companhias> getCompaniasById(@PathVariable Long id) {
		  Optional<Companhias> companhias = service.getCompaniasById(id);
	      return service.getCompaniasById(id);
	  }
  
}
