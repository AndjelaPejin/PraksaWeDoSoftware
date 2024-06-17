package com.internship.InternshipProject.repository;

import com.internship.InternshipProject.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ITrainingRepository extends JpaRepository<Training,String> {
    @Query("SELECT t FROM Training t WHERE YEAR(t.createdDate) = :year AND MONTH(t.createdDate) = :month")
    List<Training> findByYearAndMonth(@Param("year") int year, @Param("month") int month);
}
