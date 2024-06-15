package com.internship.InternshipProject.DTO;

import com.internship.InternshipProject.model.Type;
import jakarta.persistence.Enumerated;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
public class TrainingDTO {

    private String id;
    @Enumerated
    private Type type;

    private Integer duration;
    private Integer caloriesBurned;
    private Integer intensity;
    private Integer tiredness;
    private String notes;
    private Date createdDate;
}
