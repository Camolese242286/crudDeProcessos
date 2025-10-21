package com.qintess.lgpd.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.qintess.lgpd.model.CriarProcessosPessoasRequest;
import com.qintess.lgpd.model.Pessoa;
import com.qintess.lgpd.model.Processos;
import com.qintess.lgpd.model.ProcessosPessoas;
import com.qintess.lgpd.model.ProcessosPessoasDTO;
import com.qintess.lgpd.model.Questao;
import com.qintess.lgpd.repository.PessoaRepository;
import com.qintess.lgpd.repository.ProcessosPessoaRepository;
import com.qintess.lgpd.repository.ProcessosRepository;
import com.qintess.lgpd.service.ProcessoPessoaService;

@RestController
@RequestMapping("/api/processos-pessoas")
public class ProcessosPessoasController {

    @Autowired
    private ProcessosPessoaRepository processosPessoasRepository;

    @Autowired
    private PessoaRepository pessoaRepository;
    
    @Autowired
    private ProcessosRepository processosRepository;

    @Autowired
    private ProcessoPessoaService processoPessoaService;

    // Endpoint para obter todas as áreas
    @GetMapping
    public List<ProcessosPessoas> get() {
        return processosPessoasRepository.findAll();
    }

    /*private ProcessosPessoasDTO toDTO(ProcessosPessoas pp, Pessoa pessoa) {
    return new ProcessosPessoasDTO(
        pp.getId(),
        pp.getProcessoId(),
        pp.getPessoaId(),
        pessoa.getNome(),
        pessoa.getEmail(),
        pp.getEnviadoEm(),
        pp.getRespondidoEm(),
        pp.getValidoAte(),
        pp.getAreas(),
        pp.getStatus()
        );
    }*/

    @GetMapping(value = "/{id}")
    public ResponseEntity<List<Pessoa>> getProcessosPessoas(@PathVariable Long id) throws IOException {
        List<ProcessosPessoas> processoPessoas = processosPessoasRepository.findByProcessoId(id);
        List<Pessoa> pessoas = new ArrayList<>();

        for (ProcessosPessoas pp : processoPessoas) {
            pessoaRepository.findById(pp.getPessoaId()).ifPresent(pessoas::add);
        }

        return ResponseEntity.ok(pessoas);
    }

    @GetMapping("/por-processo/{processoId}")
    public ResponseEntity<List<ProcessosPessoasDTO>> getPorProcesso(@PathVariable Long processoId) {
        List<ProcessosPessoasDTO> lista = processoPessoaService.buscarPorProcessoComNome(processoId);
        return ResponseEntity.ok(lista);
    }
    
    @GetMapping("/processo/{id}/usuarios")
    public List<ProcessosPessoasDTO> getUsuariosDoProcesso(@PathVariable Long id) {
        List<ProcessosPessoas> lista = processosPessoasRepository.findByProcessoId(id);

        return lista.stream().map(pp -> {
            Pessoa pessoa = pessoaRepository.findById(pp.getPessoaId()).orElse(null);
            return new ProcessosPessoasDTO(pp, pessoa);
        }).collect(Collectors.toList());
    }


    /*@GetMapping(value = "/detalhes/{id}")
    public ResponseEntity<ProcessosPessoasDTO> buscarProcessoPessoa(@PathVariable Long id) {
        Optional<ProcessosPessoas> processoPessoa = processoPessoaService.buscarPorId(id);

        if (processoPessoa.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Pessoa> pessoa = pessoaRepository.findById(processoPessoa.get().getPessoaId());

        if (pessoa.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna erro se não encontrar a pessoa
        }

        System.out.println("Área retornada para o frontend: " + processoPessoa.get().getAreas());

        return ResponseEntity.ok(new ProcessosPessoasDTO(processoPessoa.get(), pessoa.get()));
        
    }*/
    
    private String calcularStatus(ProcessosPessoas pp) {
        if (pp.getRespondidoEm() != null) {
            return "Respondido";
        } else if (pp.getValidoAte() != null && pp.getValidoAte().isBefore(LocalDate.now())) {
            return "Vencido";
        } else {
            return "Dentro_Prazo";
        }
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<ProcessosPessoas> createProcesso(
            @RequestBody ProcessosPessoas payload
    ) throws IOException {
        Long pessoaId = payload.getPessoaId();
        Long processoId = payload.getProcessoId();

        if (pessoaId == null || processoId == null) {
            throw new RuntimeException("Pessoa ou Processo não pode ser nulo");
        }

        /*Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
        
        Processos processo = processoRepository.findById(processoId)
                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));*/
        
        Optional<Processos> processoOpt = processosRepository.findById(processoId);
        if (!processoOpt.isPresent()) {
            throw new RuntimeException("Processo não encontrado");
        }
        Processos processo = processoOpt.get();

        String prioridade = processo.getPrioridade(); // Supondo que existe esse campo
        LocalDate enviadoEm = LocalDate.now();
        //LocalDate validoAte = calcularDataVencimento(enviadoEm, prioridade);
        LocalDate validoAte = payload.getValidoAte();
        
        if(validoAte == null) {
        	validoAte = calcularDataVencimento(enviadoEm, prioridade);
        }

        ProcessosPessoas processoPessoa = new ProcessosPessoas();
        processoPessoa.setProcessoId(processoId);
        processoPessoa.setPessoaId(pessoaId);
        processoPessoa.setEnviadoEm(enviadoEm);
        processoPessoa.setValidoAte(validoAte); 
        processoPessoa.setAreas(payload.getAreas());
        processoPessoa.setStatus(calcularStatus(processoPessoa));
        
        // Salve o processo no banco de dados
        ProcessosPessoas savedProcessosPessoas = processosPessoasRepository.save(processoPessoa);

        return ResponseEntity.ok(savedProcessosPessoas);
    }

    public LocalDate calcularDataVencimento(LocalDate dataEnvio, String prioridade) {
        int dias;
        switch (prioridade) {
            case "Alta":
                dias = 7;
                break;
            case "Média":
                dias = 15;
                break;
            case "Baixa":
                dias = 30;
                break;
            default:
                dias = 15; // padrão
        }
        return dataEnvio.plusDays(dias);
    }
    /**
     * Marca o vínculo como respondido hoje e atualiza o status.
     */

    @PutMapping("/{id}/responder")
    public ResponseEntity<ProcessosPessoas> marcarRespondido(@PathVariable Long id) {
        Optional<ProcessosPessoas> ppOpt = processosPessoasRepository.findById(id);
        if (ppOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ProcessosPessoas pp = ppOpt.get();

        pp.setRespondidoEm(LocalDate.now());

        pp.setStatus(calcularStatus(pp));

        ProcessosPessoas atualizado = processosPessoasRepository.save(pp);
        return ResponseEntity.ok(atualizado);
    }

    @PostMapping("/criar-processos-pessoas")
    public ResponseEntity<?> criarProcessosPessoas(@RequestBody CriarProcessosPessoasRequest request) {
    	Optional<Processos> processoOpt = processosRepository.findById(request.getProcessoId());
    	if(!processoOpt.isPresent()) {
    		return ResponseEntity.badRequest().body("Processo não encontrado");
    	}
    	Processos processo = processoOpt.get();
    	String prioridade = processo.getPrioridade();
    	LocalDate enviadoEm = LocalDate.now();
    	
    	for(Long pessoaId : request.getResponsaveisIds()) {
    		boolean jaExiste = processosPessoasRepository.existsByProcessoIdAndPessoaId(request.getProcessoId(), pessoaId);
    		if(!jaExiste) {
    		LocalDate validoAte = request.getValidoAte();
    		if(validoAte == null) {
    			validoAte = calcularDataVencimento(enviadoEm, prioridade);
    		}
    		ProcessosPessoas pp = new ProcessosPessoas();
    		pp.setProcessoId(request.getProcessoId());
    		pp.setPessoaId(pessoaId);
    		pp.setEnviadoEm(enviadoEm);
    		pp.setValidoAte(validoAte);
    		pp.setAreas(request.getNomeArea());
    		pp.setStatus(calcularStatus(pp));
    		processosPessoasRepository.save(pp);
    		} 
    	}
    	return ResponseEntity.ok().build();
    }
    

}
