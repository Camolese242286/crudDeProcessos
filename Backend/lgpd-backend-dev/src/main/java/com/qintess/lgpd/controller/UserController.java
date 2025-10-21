package com.qintess.lgpd.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qintess.lgpd.model.User;
import com.qintess.lgpd.repository.UserRepository;

@RestController
@CrossOrigin
@RequestMapping("api/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userRepository.findAll();
		if(users.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(users);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		Optional<User> user = userRepository.findById(id);
		return user.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<?> createUser(@RequestBody User user) {
		try {
			// Validações básicas
			if (user.getName() == null || user.getName().trim().isEmpty()) {
				return ResponseEntity.badRequest().body("Nome do usuário é obrigatório");
			}

			if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
				return ResponseEntity.badRequest().body("Email do usuário é obrigatório");
			}

			// Salva o novo usuário
			User newUser = userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(newUser);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao criar usuário: " + e.getMessage());
		}
	}

	//commit
	@GetMapping("/check-admin/{id}")
	public ResponseEntity<String> checkAdmin(@PathVariable Long id) {
		Optional<User> user = userRepository.findById(id);
		if (user.isPresent()) {
			boolean isAdmin = user.get().isAdmin();
			if (isAdmin) {
				return ResponseEntity.ok("Usuário é admin.");
			} else {
				return ResponseEntity.ok("Usuário não é admin.");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Usuário com ID " + id + " não encontrado.");
		}
	}
}