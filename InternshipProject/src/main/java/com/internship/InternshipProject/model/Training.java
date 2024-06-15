package com.internship.InternshipProject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Training {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Version
    private Integer version;

    @Enumerated
    private Type type;

    private Integer duration;
    private Integer caloriesBurned;
    private Integer intensity;
    private Integer tiredness;
    private String notes;
    private Date createdDate;


    @JsonBackReference(value = "user-training")
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


}
