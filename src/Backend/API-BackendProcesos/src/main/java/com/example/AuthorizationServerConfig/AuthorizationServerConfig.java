import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;

@Configuration
@EnableWebSecurity
public class AuthorizationServerConfig {

	
	@Bean
	public RegisteredClientRepository registeredClientRepository() {
		
		 RegisteredClient registeredClient = RegisteredClient.withId(UUID.randomUUID().toString())
		            .clientId("client-id")
		            .clientSecret("{noop}client-secret") 
		            .scope(OidcScopes.OPENID)
		            .scope("read")
		            .scope("write")
		            .redirectUri("http://localhost:8080/login/oauth2/code/")
		            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
		            .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
		            .tokenSettings(TokenSettings.builder().build())
		            .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
		            .build();

	        return new InMemoryRegisteredClientRepository(registeredClient);      
	}
    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder()
            .issuer("http://localhost:8080")
            .build();
    }

}
