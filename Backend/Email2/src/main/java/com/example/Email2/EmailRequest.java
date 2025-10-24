package com.example.Email2;

import lombok.Data;

@Data
public class EmailRequest {
    private String to;
    private String subject;
    private String body;

    // Getters e Setters
}