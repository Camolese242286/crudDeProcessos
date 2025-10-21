package com.qintess.lgpd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LgpdApplication {

	public static void main(String[] args) {
		SpringApplication.run(LgpdApplication.class, args);
	}

}
