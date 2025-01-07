import org.springframework.data.jpa.repository.JpaRepository;

import com.example.usuarios.Model.usuarios;

public interface usuariosRepository extends JpaRepository<usuarios, Long> {

}