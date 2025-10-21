package com.qintess.lgpd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qintess.lgpd.model.Pessoa;
import com.qintess.lgpd.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	User findByName(String name);
}
