package com.internship.InternshipProject.repository;

import com.internship.InternshipProject.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITrainingRepository extends JpaRepository<Training,String> {
}
