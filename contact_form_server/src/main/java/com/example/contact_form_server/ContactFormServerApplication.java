package com.example.contact_form_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.example.contact_form_server.model")
public class ContactFormServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactFormServerApplication.class, args);
	}

}
