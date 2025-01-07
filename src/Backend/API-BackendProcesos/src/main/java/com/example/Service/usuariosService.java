import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.usuarios.Model.usuarios;
import com.example.usuarios.Repository.usuariosRepository;

import jakarta.annotation.Resource;

@Service
public class usuarioService {

	
	@Autowired
	usuariosRepository  repository;

	
	public usuarios createResource(usuarios resource) {
        String username = getCurrentUsername();
        resource.setCreatedBy1(username); 
        return repository.save(resource);
    }

    
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return userDetails.getUsername();
        }
        return null;
    }
	
	
   public List<usuarios> listar() {
	   
	   return repository.findAll();
   }

   
   public usuarios salvar(usuarios usuario) {
	   
	   return repository.save(usuario);
   } 


   
   public usuarios atualizar (Long id ,usuarios usuarioAtualizado) {
	   
	   if(repository.existsById(id)) {
		   usuarioAtualizado.setId(id);;
	   
	   return repository.save(usuarioAtualizado);
	   }
  
   return null;
   }
   
   
   public Optional<usuarios> GetById(Long id){
	   
	   return repository.findById(id);
   }
   
   
  public void deletar(Long id) {
	 repository.deleteById(id);
  }
}