package com.example.Email2;



import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarEmail(String para, String assunto, String mensagem) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(para);
        mailMessage.setSubject(assunto);
        mailMessage.setText(mensagem);
        mailMessage.setFrom("seu_email@gmail.com"); // mesmo do username
        mailSender.send(mailMessage);
    }
}

