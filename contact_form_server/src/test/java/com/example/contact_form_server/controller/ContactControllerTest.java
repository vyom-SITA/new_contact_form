package com.example.contact_form_server.controller;

import com.example.contact_form_server.model.Contact;
import com.example.contact_form_server.repository.ContactRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ContactController.class)
public class ContactControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactRepository contactRepository;

    @Test
    void testTestApi() throws Exception {
        mockMvc.perform(get("/api/test"))
                .andExpect(status().isOk())
                .andExpect(result ->
                        org.assertj.core.api.Assertions.assertThat(result.getResponse().getContentAsString())
                                .isEqualTo("Test API is working!"));
    }

    @Test
    void testCreateContact_NewContact() throws Exception {
        Contact contact = new Contact();
        contact.setPhoneNumber("1234567890");
        contact.setFirstName("Jane");
        contact.setLastName("Smith");
        contact.setEmail("jane@example.com");
        contact.setTitle("Ms");
        Mockito.when(contactRepository.existsById("1234567890")).thenReturn(false);
        Mockito.when(contactRepository.save(Mockito.any(Contact.class))).thenReturn(contact);

        String json = "{" +
                "\"phoneNumber\":\"1234567890\"," +
                "\"firstName\":\"Jane\"," +
                "\"lastName\":\"Smith\"," +
                "\"email\":\"jane@example.com\"," +
                "\"title\":\"Ms\"}";

        mockMvc.perform(post("/api/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Jane"));
    }

    @Test
    void testCreateContact_ExistingContact() throws Exception {
        Mockito.when(contactRepository.existsById("1234567890")).thenReturn(true);
        String json = "{" +
                "\"phoneNumber\":\"123456789\"," +
                "\"firstName\":\"Jane\"," +
                "\"lastName\":\"Smith\"," +
                "\"email\":\"jane@example.com\"," +
                "\"title\":\"Ms\"}";

        mockMvc.perform(post("/api/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testGetAllUser() throws Exception {
        Contact contact = new Contact();
        contact.setPhoneNumber("1234567890");
        contact.setFirstName("John");
        contact.setLastName("Doe");
        contact.setEmail("john@example.com");
        contact.setTitle("Mr");
        Mockito.when(contactRepository.findAll()).thenReturn(Collections.singletonList(contact));

        mockMvc.perform(get("/api/get"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("John"));
    }
}
