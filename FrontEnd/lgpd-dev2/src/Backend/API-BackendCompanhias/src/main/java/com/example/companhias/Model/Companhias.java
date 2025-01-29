package com.example.companhias.Model;

import java.util.Optional;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Companhias {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private  String Name;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public static Optional<Companhias> map(Object object) {
		// TODO Auto-generated method stub
		return null;
	}
}
