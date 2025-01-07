import java.util.List;

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

import com.example.usuarios.Model.usuarios;
import com.example.usuarios.Service.usuarioService;

@RestController
@RequestMapping(value="user")
public class usuariosController {

	
	@Autowired
	usuarioService service;
	@GetMapping
	public List<usuarios> Listar() {
		return service.listar();
		
	}
  @PostMapping
  public usuarios salvar(@RequestBody usuarios usuario) {
	  
	  return service.salvar(usuario);
  }
  @DeleteMapping("/{id}")//(value="deletar")
  public ResponseEntity<Void> excluir(@RequestParam (name = "id", required = false) Long id){
	  
	  service.deletar(id);
	  

	   	 return ResponseEntity.noContent().build();
}

  @PutMapping
  public usuarios atualizar(@PathVariable Long id ,@RequestBody usuarios usuarioAtualizado) {
	  usuarios update=service.atualizar(id, usuarioAtualizado);
	  
	  
	  usuarioAtualizado.setUsarname(usuarioAtualizado.getUsarname());
	  usuarioAtualizado.setId(usuarioAtualizado.getId());
	  usuarioAtualizado.setName(usuarioAtualizado.getName());
  
  return(usuarioAtualizado); 
  }
}
