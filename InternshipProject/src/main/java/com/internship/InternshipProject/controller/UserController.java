package com.internship.InternshipProject.controller;

import com.internship.InternshipProject.DTO.UserDTO;
import com.internship.InternshipProject.model.User;
import com.internship.InternshipProject.repository.IUserRepository;
import com.internship.InternshipProject.security.Encryption;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class UserController {
    private final IUserRepository userRepository;

    private final SecretKey secretKey;

    @Value("${spring.security.token-duration}")
    private Integer tokenDuration;


    private String getJWTToken(User userEntity) {
        String token = Jwts.builder()
                .setId("softtekJWT")
                .setSubject(userEntity.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + this.tokenDuration))
                .signWith(this.secretKey)
                .compact();
        return "Bearer " + token;
    }


    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestParam("user") String username, @RequestParam("password") String pwd) {
        User userEntity = userRepository.findByUsername(username);
        if (userEntity != null && Encryption.validatePassword(pwd, userEntity.getPassword())) {
            String token = getJWTToken(userEntity);
            UserDTO user = new UserDTO();
            user.setUser(username);
            user.setToken(token);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("Wrong credentials", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam("user") String username, @RequestParam("password") String pwd) {
        if (userRepository.findByUsername(username) != null) {
            return new ResponseEntity<>("Username already taken", HttpStatus.BAD_REQUEST);
        }
        String encodedPassword = Encryption.getPassEncoded(pwd);
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(encodedPassword);
        userRepository.save(newUser);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

}
