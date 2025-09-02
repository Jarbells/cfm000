// src/main/java/com/culturafm/site/config/SecurityConfig.java
package com.culturafm.site.config;

import static org.springframework.security.config.Customizer.withDefaults; // 2. Importe o withDefaults

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // 1. Importe o HttpMethod
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
		http.cors(cors -> cors.configurationSource(corsConfigurationSource())).csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth
						// Permite acesso PÚBLICO a todos os endpoints com método GET
						.requestMatchers(HttpMethod.GET).permitAll()
						// EXIGE autenticação para qualquer outro método (POST, PUT, DELETE)
						.anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.httpBasic(withDefaults());

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