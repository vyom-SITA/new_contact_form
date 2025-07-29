package com.example.contact_form_server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.contact_form_server.model.Contact;
import com.example.contact_form_server.repository.ContactRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;





@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;    
    @GetMapping("/api/test")
    public String testApi() {
        return "Test API is working!";
    }
    
    @PostMapping("api/post")
    public Contact createContact(@RequestBody Contact contact) {
        boolean exists = contactRepository.existsById(
        contact.getPhoneNumber()
    );
        if (exists) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Contact already exists");
            
        }else{
            return contactRepository.save(contact);
        }
        
    }

    @GetMapping("api/get")
    public List<Contact> getAllUser() {
        return contactRepository.findAll();
    }
    
    
    
}