package com.internship.InternshipProject.repository;

import com.internship.InternshipProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User,String> {
    User findByUsername(String username);
}
