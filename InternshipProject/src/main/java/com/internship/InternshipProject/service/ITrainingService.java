package com.internship.InternshipProject.service;

import com.internship.InternshipProject.DTO.TrainingDTO;
import org.hibernate.query.Page;

import java.awt.print.Pageable;
import java.util.List;

public interface ITrainingService {
    TrainingDTO create(TrainingDTO trainingDTO);
    List<TrainingDTO> getAll();
    TrainingDTO getById(String id);
    //TrainingDTO update(TrainingDTO expenseDTO,String id);
    //TrainingDTO deleteById(String id);
    //Page<TrainingDTO> getTrainings(Pageable pageable);
    //Page<> last5Expenses(Pageable pageable);
}
