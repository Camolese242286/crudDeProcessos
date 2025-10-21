package com.qintess.lgpd.service;

import com.microsoft.graph.models.UserSendMailParameterSet;

import com.azure.identity.ClientSecretCredential;
import com.azure.identity.ClientSecretCredentialBuilder;
import com.microsoft.graph.authentication.TokenCredentialAuthProvider;
import com.microsoft.graph.models.*;
import com.microsoft.graph.requests.GraphServiceClient;
import okhttp3.Request;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final GraphServiceClient<Request> graphClient;

    public EmailService(
            @Value("${graph.client-id}") String clientId,
            @Value("${graph.client-secret}") String clientSecret,
            @Value("${graph.tenant-id}") String tenantId
    ) {
        List<String> scopes = Arrays.asList("https://graph.microsoft.com/.default");

        ClientSecretCredential clientSecretCredential = new ClientSecretCredentialBuilder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .tenantId(tenantId)
                .build();

        TokenCredentialAuthProvider authProvider = new TokenCredentialAuthProvider(scopes, clientSecretCredential);

        this.graphClient = GraphServiceClient
                .builder()
                .authenticationProvider(authProvider)
                .buildClient();
    }

    public void sendEmail(String[] to, String subject, String bodyContent, boolean isHtml) {
        Message message = new Message();
        message.subject = subject;

        ItemBody body = new ItemBody();
        body.contentType = isHtml ? BodyType.HTML : BodyType.TEXT;
        body.content = bodyContent;
        message.body = body;

        List<Recipient> toRecipients = new LinkedList<>();
        for (String email : to) {
            EmailAddress emailAddress = new EmailAddress();
            emailAddress.address = email;

            Recipient recipient = new Recipient();
            recipient.emailAddress = emailAddress;

            toRecipients.add(recipient);
        }
        message.toRecipients = toRecipients;

        try {
            UserSendMailParameterSet parameters = UserSendMailParameterSet
                    .newBuilder()
                    .withMessage(message)
                    .withSaveToSentItems(false)
                    .build();

            graphClient
                    .users("dpo.lgpd@qintess.com")
                    .sendMail(parameters)
                    .buildRequest()
                    .post();

            logger.info("E-mail enviado para: {}", String.join(", ", to));
        } catch (Exception e) {
            logger.error("Erro ao enviar e-mail via Graph: {}", e.getMessage(), e);
            throw new RuntimeException("Erro ao enviar e-mail via Microsoft Graph", e);
        }
    }


    public void sendHtmlEmail(String[] to, String subject, String htmlContent) {
        sendEmail(to, subject, htmlContent, true);
    }
}
