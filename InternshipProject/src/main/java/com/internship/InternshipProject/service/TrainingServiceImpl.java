package com.internship.InternshipProject.service;

import com.internship.InternshipProject.DTO.TrainingDTO;
import com.internship.InternshipProject.model.Training;
import com.internship.InternshipProject.model.User;
import com.internship.InternshipProject.repository.ITrainingRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingServiceImpl implements ITrainingService{
    private final ModelMapper mapper;
    private final IUserService userService;
    private final ITrainingRepository trainingRepository;

    @Override
    public TrainingDTO create(TrainingDTO trainingDTO) {
        User currentUser = userService.getCurrentUser();

       Training training = mapper.map(trainingDTO, Training.class);
        training.setUser(currentUser);
        training.setCreatedDate(trainingDTO.getCreatedDate());
        training.setDuration(trainingDTO.getDuration());
        training.setNotes(trainingDTO.getNotes());
        training.setType(trainingDTO.getType());
        training.setIntensity(trainingDTO.getIntensity());
        training.setTiredness(trainingDTO.getTiredness());
        training.setCaloriesBurned(trainingDTO.getCaloriesBurned());
        Training saved = trainingRepository.save(training);
        return mapper.map(saved, TrainingDTO.class);

    }

    @Override
    public List<TrainingDTO> getAll() {
        List<Training> trainings = trainingRepository.findAll();
        List<TrainingDTO> trainingDTOS = new ArrayList<>();
        trainings.forEach(e -> trainingDTOS.add(mapper.map(e, TrainingDTO.class)));
        return trainingDTOS;
    }

    @Override
    public TrainingDTO getById(String id) {
        Training training = trainingRepository.findById(id).orElseThrow(() ->  new EntityNotFoundException("Training with id " + id + "not found"));
        return mapper.map(training, TrainingDTO.class);
    }
}
