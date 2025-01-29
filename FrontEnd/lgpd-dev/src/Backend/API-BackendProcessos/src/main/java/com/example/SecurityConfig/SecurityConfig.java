import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig1 extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {


    @Override
	public void configure(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .csrf().disable();
    }

       @Bean
	    public UserDetailsService userDetailsService() {
	        return username -> {
	        
	            User user = new User(username, passwordEncoder().encode("password"), new ArrayList<>());
	            return user;
	        }

    @Bean
	    protected UserDetailsService userDetailsService() {
	        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
	        manager.createUser(User.withUsername("user").password(passwordEncoder().encode("password")).roles("USER").build());
	        return manager;
	    }
    	private BCryptPasswordEncoder passwordEncoder() {
			
			return new BCryptPasswordEncoder();
		}


}
	