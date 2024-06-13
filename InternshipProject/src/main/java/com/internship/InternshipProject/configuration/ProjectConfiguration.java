package com.internship.InternshipProject.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProjectConfiguration {
    @Bean
    public ModelMapper modelMapperBean() {
        return new ModelMapper();
    }
}
