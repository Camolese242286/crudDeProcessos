package com.qintess.lgpd.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
//olha o Léo fazendo cagada por aqui!!!
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.qintess.lgpd.model.Area;
import com.qintess.lgpd.model.Processos;
import com.qintess.lgpd.repository.AreaRepository;
import com.qintess.lgpd.repository.ProcessosRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/area")
public class AreaController {
	
    @Autowired
    private AreaRepository areaRepository;
    
    @Autowired
    private ProcessosRepository processoRepository;

    // Endpoint para obter todas as áreas
    @GetMapping
    public List<Area> getAreas() {
        return areaRepository.findAll();
    }
    
   @PostMapping
    public ResponseEntity<Area> criarArea(@RequestBody Area area) {
        try {
            Area novaArea = areaRepository.save(area);
            return ResponseEntity.ok(novaArea);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
   
   @GetMapping(value = "/{id}")
   public ResponseEntity<Area> getArea(@PathVariable Long id) throws IOException {
       Area area = areaRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Processo não encontrado"));
       return ResponseEntity.ok(area);
   }
    
    @PutMapping("/{id}")
    public ResponseEntity<Area> atualizarArea(@PathVariable Long id, @RequestBody Area area) {
        try {
            area.setId(id);
            Area areaAtualizada = areaRepository.save(area);
            return ResponseEntity.ok(areaAtualizada);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }    
    
    /*@DeleteMapping("/{id}") 
    public ResponseEntity<Void> deletarArea(@PathVariable Long id) {
        if (areaRepository.existsById(id)) {
            areaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArea(@PathVariable Long id) {

        processoRepository.deleteByAreas_Id(id);  

        areaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
}
