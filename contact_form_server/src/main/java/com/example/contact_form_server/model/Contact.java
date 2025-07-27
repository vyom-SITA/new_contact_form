package com.example.contact_form_server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contact_form_entry")
public class Contact {
    @Id
    @Column(name = "phone_number", unique = true, nullable = false)
    private String phoneNumber;
    @Column(name = "email")
    private String email;
    @Column(name = "title")
    private String title;
    @Column(name = "first_name" , nullable = false)
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Contact() {
    }
    public Contact(String phoneNumber, String email, String title, String firstName, String lastName) {
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
    }}