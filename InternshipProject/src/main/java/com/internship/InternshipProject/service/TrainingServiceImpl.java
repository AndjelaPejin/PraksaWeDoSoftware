package com.internship.InternshipProject.service;

import com.internship.InternshipProject.DTO.TrainingDTO;
import com.internship.InternshipProject.DTO.WeeklyDTO;
import com.internship.InternshipProject.exception.NoTrainingsFoundException;
import com.internship.InternshipProject.model.Training;
import com.internship.InternshipProject.model.User;
import com.internship.InternshipProject.repository.ITrainingRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Override
    public List<WeeklyDTO> getMonthlySummary(int year, int month) {
        List<Training> trainings = trainingRepository.findByYearAndMonth(year, month);
        if (trainings.isEmpty()) {
            throw new NoTrainingsFoundException("No trainings found for the specified year and month.");
        }

        Map<Integer, List<Training>> trainingsByWeek = trainings.stream().collect(Collectors.groupingBy(training -> {
            Calendar cal = Calendar.getInstance();
            cal.setTime(training.getCreatedDate());
            cal.set(Calendar.YEAR, year);
            cal.set(Calendar.MONTH, month - 1);
            return cal.get(Calendar.WEEK_OF_MONTH);
        }));

        return trainingsByWeek.entrySet().stream().map(entry -> {
            int week = entry.getKey();
            List<Training> weeklyTrainings = entry.getValue();
            int totalDuration = weeklyTrainings.stream().mapToInt(Training::getDuration).sum();
            int totalCount = weeklyTrainings.size();
            double avgIntensity = weeklyTrainings.stream().mapToInt(Training::getIntensity).average().orElse(0);
            double avgTiredness = weeklyTrainings.stream().mapToInt(Training::getTiredness).average().orElse(0);

            return new WeeklyDTO(week, totalDuration, totalCount, avgIntensity, avgTiredness);
        }).collect(Collectors.toList());
    }

}
