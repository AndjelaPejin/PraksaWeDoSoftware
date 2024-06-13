package com.internship.InternshipProject.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Type {
    CARDIO,
    STRENGTH,
    STRETCHING;

    //metoda za kreiranje enum vrednosti iz stringa
    @JsonCreator
    public static Type fromString(String value) {
        for (Type type : Type.values()) {
            if (type.name().equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unable to convert to type: " + value);
    }
}
