package com.internship.InternshipProject.repository;

import com.internship.InternshipProject.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role, String> {
    Role findByName(String name);
}
