package com.internship.InternshipProject.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WeeklyDTO {
    private int week;
    private int totalDuration;
    private int totalCount;
    private double avgIntensity;
    private double avgTiredness;
}
