package com.example.contact_form_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.contact_form_server.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, String> {
    // Additional query methods can be defined here if needed
}
