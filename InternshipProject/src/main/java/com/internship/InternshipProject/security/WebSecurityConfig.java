package com.internship.InternshipProject.security;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class WebSecurityConfig {
    private SecretKey secretKey;

    public WebSecurityConfig() {
        super();
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    @Bean
    public SecretKey secretKey() {
        return this.secretKey;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable())
                .addFilterAfter(new JWTAuthorizationFilter(secretKey), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests().requestMatchers(HttpMethod.POST, "/login","/register").permitAll().requestMatchers("/actuator/*").permitAll().anyRequest()
                .authenticated();
        return http.build();
    }

}
