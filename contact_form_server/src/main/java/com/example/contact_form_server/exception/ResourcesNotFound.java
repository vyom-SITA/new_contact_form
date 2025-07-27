package com.example.contact_form_server.exception;

public class ResourcesNotFound extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ResourcesNotFound(String message) {
        super(message);
    }

    public ResourcesNotFound(String message, Throwable cause) {
        super(message, cause);
    }

    public ResourcesNotFound(Throwable cause) {
        super(cause);
    }
    
}
