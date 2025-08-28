// src/main/java/com/culturafm/site/config/SecurityConfig.java
package com.culturafm.site.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Usa a nossa configuração de CORS definida abaixo
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // Desabilita a proteção CSRF, que não é necessária para a nossa API stateless
            .csrf(csrf -> csrf.disable())
            // Define a política de sessão como STATELESS, pois é uma API REST
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Autoriza todas as requisições HTTP, sem necessidade de login
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
            
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Permite os seus dois frontends
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174"));
        
        // Permite todos os métodos HTTP necessários
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Permite todos os cabeçalhos
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Permite o envio de credenciais
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica a todos os endpoints
        return source;
    }
}