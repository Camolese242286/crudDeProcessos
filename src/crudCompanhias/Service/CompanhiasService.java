import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.companhias.Model.Companhias;
import com.example.companhias.Repository.CompanhiasRepository;

@Service
public class CompanhiasService {
    @Autowired
	private CompanhiasRepository repository;
	
	public List<Companhias> listartodos(){
		
		return repository.findAll();
	}
	
	
	public Companhias salvar(Companhias companhias) {
		
		
		return  repository.save(companhias);
	}
	
	
	
	public Companhias atualizar(Long id , Companhias companiasAtulizada) {
		
		if (repository.existsById(id)) {
			companiasAtulizada.setId(id);
		
			
			return repository.save(companiasAtulizada);
		}
		return null;
	}
	
	
	 public Optional<Companhias> getCompaniasById(Long id) {
	        return repository.findById(id);
	    }
	
	
	
	public void excluir(Long id) {
		
		 repository.deleteById(id);
	}
