package com.qintess.lgpd.controller;

import com.qintess.lgpd.model.EmailRequest;
import com.qintess.lgpd.model.Pessoa;
import com.qintess.lgpd.repository.PessoaRepository;
import com.qintess.lgpd.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
public class EmailController {

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PessoaRepository pessoaRepositorio;
	
	@GetMapping("/usuarios/{id}")
	public Pessoa getPessoaById(@PathVariable Long id) {
	    return pessoaRepositorio.findById(id).orElseThrow();
	}

	@PostMapping(value = "/send", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> sendEmail(@RequestBody EmailRequest emailRequest) {
		try {
			if (emailRequest.getEmails() == null || emailRequest.getEmails().isEmpty()) {
				return ResponseEntity.badRequest().body(
						Map.of("status", "error", "message", "Lista de e-mails vazia")
				);
			}

			String subject = emailRequest.getSubject() != null ? emailRequest.getSubject() : "Novo Processo para responder";
			String content = emailRequest.getContent() != null ? emailRequest.getContent() :
					"Você foi designado para responder. Link: " + (emailRequest.getLink() != null ? emailRequest.getLink() : "");

			emailService.sendHtmlEmail(
					emailRequest.getEmails().toArray(new String[0]),
					subject,
					content
			);

			return ResponseEntity.ok().body(
					Map.of("status", "success", "message", "E-mails enviados com sucesso")
			);

		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(
					Map.of("status", "error", "message", e.getMessage())
			);
		}
	}

}
