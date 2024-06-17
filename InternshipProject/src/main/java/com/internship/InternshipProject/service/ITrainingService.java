package com.internship.InternshipProject.service;

import com.internship.InternshipProject.DTO.TrainingDTO;
import com.internship.InternshipProject.DTO.WeeklyDTO;

import java.util.List;

public interface ITrainingService {
    TrainingDTO create(TrainingDTO trainingDTO);
    List<TrainingDTO> getAll();
    TrainingDTO getById(String id);
    List<WeeklyDTO> getMonthlySummary(int year, int month);
}
