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
        User currentUser = userService.getCurrentUser();
        String id = currentUser.getId();
        List<Training> trainings = trainingRepository.findByUserId(id);
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
        User currentUser = userService.getCurrentUser();
        String userId = currentUser.getId();

        // Preuzmanje treninga za zadati mesec i godinu
        List<Training> allTrainingsForMonth = trainingRepository.findByYearAndMonth(year, month);

        // Filtriranje treninga za trenutnog korisnika
        List<Training> userTrainingsForMonth = allTrainingsForMonth.stream()
                .filter(training -> userId.equals(training.getUser().getId()))
                .collect(Collectors.toList());

        if (userTrainingsForMonth.isEmpty()) {
            throw new NoTrainingsFoundException("No trainings found for the specified year and month.");
        }

        // Grupisanje treninga po nedeljama
        Map<Integer, List<Training>> trainingsByWeek = userTrainingsForMonth.stream().collect(Collectors.groupingBy(training -> {
            Calendar cal = Calendar.getInstance();
            cal.setTime(training.getCreatedDate());
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
