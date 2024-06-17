package com.internship.InternshipProject.DTO;

import com.internship.InternshipProject.model.Type;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

@Data
public class TrainingDTO {

    private String id;
    @Enumerated
    private Type type;
    private Integer duration;
    private Integer caloriesBurned;
    @Min(value = 1)
    @Max(value = 10)
    private Integer intensity;
    @Min(value = 1)
    @Max(value = 10)
    private Integer tiredness;
    @Size(max = 100)
    private String notes;
    private Date createdDate;
}
