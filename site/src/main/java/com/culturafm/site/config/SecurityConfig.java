package com.culturafm.site.config;

import static org.springframework.security.config.Customizer.withDefaults;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // A LÓGICA CORRETA E DEFINITIVA:
                // Permite acesso PÚBLICO (GET) aos endpoints que o site público precisa.
                .requestMatchers(HttpMethod.GET, "/programas/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/news/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/events/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/locutores/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/sponsors/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/radio-info/**").permitAll()
                .requestMatchers(new AntPathRequestMatcher("/ws/**")).permitAll()
                // EXIGE autenticação para qualquer outro pedido.
                .anyRequest().authenticated())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .httpBasic(withDefaults());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permite os seus dois frontends de desenvolvimento
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}