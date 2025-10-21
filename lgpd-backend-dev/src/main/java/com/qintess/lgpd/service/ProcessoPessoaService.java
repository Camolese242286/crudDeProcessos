package com.qintess.lgpd.service;

import com.qintess.lgpd.model.ProcessosPessoas;
import com.qintess.lgpd.model.ProcessosPessoasDTO;
import com.qintess.lgpd.repository.PessoaRepository;
import com.qintess.lgpd.repository.ProcessosPessoaRepository;
import com.qintess.lgpd.repository.ProcessosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProcessoPessoaService {

	private final ProcessosPessoaRepository processosPessoaRepository;
	private final NotificacaoService notificacaoService;
	private final PessoaRepository pessoaRepository;
	private final ProcessosRepository processoRepository;

	@Autowired
	public ProcessoPessoaService(
			ProcessosPessoaRepository processosPessoaRepository,
			NotificacaoService notificacaoService,
			PessoaRepository pessoaRepository,
			ProcessosRepository processoRepository) {
		this.processosPessoaRepository = processosPessoaRepository;
		this.notificacaoService = notificacaoService;
		this.pessoaRepository = pessoaRepository;
		this.processoRepository = processoRepository;
	}

	public Optional<ProcessosPessoas> buscarPorId(Long id) {
		return processosPessoaRepository.findById(id);
	}

	@Transactional
	public ProcessosPessoas salvarResposta(ProcessosPessoas processoPessoa) {
		ProcessosPessoas saved = processosPessoaRepository.save(processoPessoa);
		enviarNotificacaoProcessoRespondido(saved);
		return saved;
	}

	public List<ProcessosPessoasDTO> buscarPorProcessoComNome(@Param("processoId") Long processoId) {
		return processosPessoaRepository.buscarPorProcessoComNome(processoId);
	}

	private void enviarNotificacaoProcessoRespondido(ProcessosPessoas processoPessoa) {
		String nomeUsuario = "Usuário Anônimo";
		String nomeProcesso = "Processo sem nome";
		Long processId = processoPessoa.getProcessoId();

		if (processoPessoa.getPessoaId() != null) {
			nomeUsuario = pessoaRepository.findById(processoPessoa.getPessoaId())
					.map(pessoa -> pessoa.getNome())
					.orElse("Usuário Anônimo");
		}

		if (processoPessoa.getProcessoId() != null) {
			nomeProcesso = processoRepository.findById(processoPessoa.getProcessoId())
					.map(processo -> processo.getNome())
					.orElse("Processo sem nome");
		}

		if (processId != null) {
			notificacaoService.criarNotificacao(nomeUsuario, nomeProcesso, processId);
		}
	}
}
