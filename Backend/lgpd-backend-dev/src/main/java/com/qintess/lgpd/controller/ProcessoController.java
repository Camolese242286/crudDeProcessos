package com.qintess.lgpd.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qintess.lgpd.model.Area;
import com.qintess.lgpd.model.Pessoa;
import com.qintess.lgpd.model.Processos;
import com.qintess.lgpd.model.Questao;
import com.qintess.lgpd.repository.PessoaRepository;
import com.qintess.lgpd.repository.ProcessosRepository;

@CrossOrigin
@RestController
@RequestMapping("api/processo")
public class ProcessoController {
	
	 	@Autowired
	    private ProcessosRepository repository;
	 	
	 	@Autowired
	    private PessoaRepository pessoaRepository;
	 	
	 	//@Autowired
	 	//private QuestaoRepository questaoRepository;

	   
	    @GetMapping
	    public List<Processos> get() {
	        return repository.findAll();
	    }
	    
	    /*@GetMapping("/{processoId}/questoes")
	    public ResponseEntity<List<Questao>> listarQuestoesPorProcesso(@PathVariable Long processoId) {
	        List<Questao> questoes = questaoRepository.findByProcessoId(processoId);
	        return ResponseEntity.ok(questoes);
	    }*/
	    
	    /*@GetMapping("/{id}")
	    public ResponseEntity<Processos> getProcesso(@PathVariable Long id) {
	        Optional<Processos> processo = repository.findByIdWithPessoa(id);
	        if (processo.isPresent()) {
	            return ResponseEntity.ok(processo.get());
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }*/

	    @GetMapping("/user/{id}")
	    public ResponseEntity<Pessoa> getUserById(@PathVariable Long id) {
	        Optional<Pessoa> pessoa = pessoaRepository.findById(id);
	        return pessoa.map(ResponseEntity::ok)
	                     .orElseGet(() -> ResponseEntity.notFound().build());
	    }

	    @GetMapping(value = "/{id}")
	    public ResponseEntity<Processos> getProcesso(@PathVariable Long id) throws IOException {
	        Processos processo = repository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));
	        return ResponseEntity.ok(processo);
	    }   


	    @GetMapping(value = "/{id}/criador")
	    public ResponseEntity<Pessoa> getCriadorProcesso(@PathVariable Long id) throws IOException {
	        List<Pessoa> criador = repository.getCriadorProcesso(id);
	        return ResponseEntity.ok(criador.getFirst());
	    }
	    
	    @GetMapping("/uploads/{nomeArquivo:.+}")
	    public ResponseEntity<Resource> download(@PathVariable String nomeArquivo) throws IOException {
	        Path caminho = Paths.get("uploads").resolve(nomeArquivo);
	        if (!Files.exists(caminho)) {
	            return ResponseEntity.notFound().build();
	        }

	        Resource resource = new UrlResource(caminho.toUri());
	        return ResponseEntity.ok()
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + nomeArquivo + "\"")
	            .body(resource);
	    }

	    @PostMapping
	    public ResponseEntity<?> createProcesso(@RequestBody Processos processo) {	        
	        repository.save(processo);
	        return ResponseEntity.ok(processo);
	    }

	    @PostMapping(consumes = "multipart/form-data")
	    public ResponseEntity<Processos> createProcesso(
	            @RequestParam("nome") String nome,
	            @RequestParam("descricao") String descricao,
	            @RequestParam("prioridade") String prioridade,
	            @RequestParam("areas") String areasJson,
	            @RequestParam("status") String status,
	            @RequestParam("dataCriacao") String dataCriacao,
	            @RequestParam("criadoPor") String criadoPor,
	            @RequestParam("emailreCriadoPor") String emailreCriadoPor,
	            @RequestParam("questoes") String questoesJson,
	            @RequestParam(value = "arquivo", required = false) List<MultipartFile> arquivos
	    ) throws IOException {

	        ObjectMapper objectMapper = new ObjectMapper();

	        // Converta o JSON de áreas para um objeto Area
	        Area area = objectMapper.readValue(areasJson, Area.class);

	        // Converta o JSON de questões para uma lista de objetos Questao
	        List<Questao> questoes = objectMapper.readValue(questoesJson, new TypeReference<List<Questao>>() {});
	        /*Area area = areas.get(0);*/

	        Processos processo = new Processos();
	        processo.setNome(nome);
	        processo.setDescricao(descricao);
	        processo.setPrioridade(prioridade);
	        processo.setAreas(area);
	        processo.setStatus(status);
	        processo.setCreatedDate(LocalDate.parse(dataCriacao));
	        processo.setCriadoPor(criadoPor);
	        processo.setEmailreCriadoPor(emailreCriadoPor);	        
	        //processo.setQuestoes(objectMapper.readValue(questoesJson, new TypeReference<List<Questao>>() {}));

	        if (arquivos != null) {
	            for (int i = 0; i < arquivos.size(); i++) {
	            	Questao questao = questoes.get(i);
	                MultipartFile arquivo = arquivos.get(i);
	                /*MultipartFile arquivo = arquivos.get(i);
	                if (!arquivo.isEmpty()) {
	                    String nomeArquivoSalvo = salvarArquivo(arquivo);
	                    questoes.get(i).setArquivo(nomeArquivoSalvo);	*/              
	            
	            if (questao.getTipo() == Questao.TipoQuestao.UPLOAD_ARQUIVO && arquivo != null && !arquivo.isEmpty()) {
	                String nomeArquivoSalvo = salvarArquivo(arquivo);
	                questao.setArquivo(nomeArquivoSalvo);
	                // LINHA CRÍTICA PARA CONSISTÊNCIA:
	                questao.setResposta(nomeArquivoSalvo); // Garante que CampoResposta.jsx funcione	            
	           	   }
	            }
	         }  
	    
	    // Salve o processo no banco de dados
        processo.setQuestoes(questoes);
	    Processos savedProcesso = repository.save(processo); 
	    
	    return ResponseEntity.ok(savedProcesso);
	    }      
	     
	    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
	    public ResponseEntity<Processos> updateProcesso(
	            @PathVariable Long id,
	            @RequestParam("nome") String nome,
	            @RequestParam("descricao") String descricao,
	            @RequestParam("prioridade") String prioridade, 
	            @RequestParam("areas") String areasJson, 
	            @RequestParam("status") String status, 
	            @RequestParam("dataCriacao") String dataCriacao,
	            @RequestParam("questoes") String questoesJson,
	            @RequestParam(value = "arquivo", required = false) List<MultipartFile> arquivos) throws IOException {

	        Processos processo = repository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));
	        
	        ObjectMapper objectMapper = new ObjectMapper();
	        
	        List<Questao> questoes = convertJsonToQuestoes(questoesJson);
	        Area area = convertJsonToArea(areasJson);

	        processo.setNome(nome);
	        processo.setDescricao(descricao);
	        processo.setPrioridade(prioridade);
	        processo.setAreas(area);
	        processo.setStatus(status);
	        processo.setCreatedDate(LocalDate.parse(dataCriacao));	        ;
	        //processo.setQuestoes(objectMapper.readValue(questoesJson, new TypeReference<List<Questao>>() {}));
	        
	        if (arquivos != null && arquivos.size() == questoes.size()) {
	            for (int i = 0; i < questoes.size(); i++) {
	                Questao questao = questoes.get(i);
	                MultipartFile arquivo = arquivos.get(i);

	                // A lógica 'if' vai aqui DENTRO do loop
	                if (questao.getTipo() == Questao.TipoQuestao.UPLOAD_ARQUIVO && arquivo != null && !arquivo.isEmpty()) {
	                    String nomeArquivoSalvo = salvarArquivo(arquivo);
	                    questao.setArquivo(nomeArquivoSalvo);
	                    // Garante que o nome do arquivo também seja a resposta para consistência
	                    questao.setResposta(nomeArquivoSalvo);
	                }
	            }
	        }	        
	        
	       /* if (arquivos != null) {
	            for (int i = 0; i < arquivos.size(); i++) {
	                MultipartFile arquivo = arquivos.get(i);
	                if (!arquivo.isEmpty()) {
	                    // Salvar o arquivo e obter o nome do arquivo salvo
	                    String nomeArquivoSalvo = salvarArquivo(arquivo);
	                    questoes.get(i).setArquivo(nomeArquivoSalvo);
	                }
	            }	            
	        }*/        
	       

	        // Salve o processo atualizado no banco de dados
	        processo.setQuestoes(questoes);
	        Processos updatedProcesso = repository.save(processo);

	        return ResponseEntity.ok(updatedProcesso);
	    }
	    
	    private List<Questao> convertJsonToQuestoes(String questoesJson) throws IOException {
	        ObjectMapper objectMapper = new ObjectMapper();
	        return objectMapper.readValue(questoesJson, new TypeReference<List<Questao>>() {});
	    }

	    private Area convertJsonToArea(String areasJson) throws IOException {
	        ObjectMapper objectMapper = new ObjectMapper();
	        return objectMapper.readValue(areasJson, Area.class);
	    }
	    
	    private String salvarArquivo(MultipartFile arquivo) throws IOException {
	        String nomeArquivo = UUID.randomUUID() + "_" + arquivo.getOriginalFilename();
	        Path caminho = Paths.get("uploads").resolve(nomeArquivo);

	        Files.createDirectories(caminho.getParent()); // Garante que a pasta exista
	        Files.copy(arquivo.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

	        return nomeArquivo;
	    }

	    
	    @PutMapping(value = "/{id}", consumes = "application/json")
	    public ResponseEntity<Processos> updateProcesso(
	            @PathVariable Long id,
	            @RequestBody Processos processoAtualizado) {
	        Processos processo = repository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));

	        processo.setNome(processoAtualizado.getNome());
	        processo.setDescricao(processoAtualizado.getDescricao());
	        processo.setPrioridade(processoAtualizado.getPrioridade());
	        processo.setAreas(processoAtualizado.getAreas());
	        processo.setStatus(processoAtualizado.getStatus());
	        processo.setCreatedDate(processoAtualizado.getCreatedDate());
	        processo.setQuestoes(processoAtualizado.getQuestoes());
	        
	        /*List<Questao> questoes = processoAtualizado.getQuestoes();
	        if (questoes != null) {
	            for (Questao questao : questoes) {
	                questao.setProcesso(processo);
	            }
	            processo.setQuestoes(questoes);
	        }*/
	      
	        Processos updatedProcesso = repository.save(processo);
	        return ResponseEntity.ok(updatedProcesso);
	    }

	    
	    @DeleteMapping("/{id}") // Mapeia DELETE para /api/areas/{id}
	    public ResponseEntity<Void> deletar(@PathVariable Long id) {
	        if (repository.existsById(id)) {
	            repository.deleteById(id);
	            return ResponseEntity.noContent().build(); // 204 No Content
	        } else {
	            return ResponseEntity.notFound().build(); // 404 Not Found
	        }
	    }
	    

}


