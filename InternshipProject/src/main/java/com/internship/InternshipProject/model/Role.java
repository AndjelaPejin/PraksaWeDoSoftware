package com.internship.InternshipProject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "role_id")
    private String id;
    @Column(name = "role_name")
    private String name;
    @Version
    private Integer version;

    @JsonManagedReference(value = "user-role")
    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH})
    private List<User> users = new ArrayList<>();

}
