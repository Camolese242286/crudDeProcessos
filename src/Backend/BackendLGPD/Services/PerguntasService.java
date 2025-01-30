import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Perguntas.Model.Perguntas;
import com.example.Perguntas.Ropository.PerguntasRepository;


@Service
public class PerguntasService {
	
	
	@Autowired
	PerguntasRepository repository;
	
	public List<Perguntas> listarTodos(){
		
		return repository.findAll();
	}
	
	
	public Perguntas salvar(Perguntas perguntas) {
		
		return repository.save(perguntas);
	}
	
	public Perguntas atualizar(Long id ,Perguntas Perguntas) {
		
		if(repository.existsById(id)) {
			Perguntas.setId(id);
			return repository.save(Perguntas);
		}
		return null;
	}
	
	
	
	
	
	
	public void excluir(Long id) {
		
		repository.deleteById(id);
	} 
	
	
	public Optional<Perguntas> GetById(Long id ) {
		return repository.findById(id);
	}
}
