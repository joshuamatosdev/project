package com.joshuamatos.library.unit;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "unit_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "units")
public abstract class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Type cannot be blank")
    private String type;

    @NotNull(message = "Range cannot be null")
    @Min(value = 0, message = "Range must be non-negative")
    private Integer artRange;

    private Boolean favorite;

    @Min(value = 0, message = "RPM must be non-negative")
    private Integer rpm;

    @Column(length = 65535)
    private String facts;

    // Constructors
    public Unit() {
    }

    public Unit(Long id, String type, Integer artRange, Boolean favorite, Integer rpm) {
        this.id = id;
        this.type = type;
        this.artRange = artRange;
        this.favorite = favorite;
        this.rpm = rpm;
    }

    public Unit(String type, Integer artRange, Boolean favorite, Integer rpm, String facts) {
        this.type = type;
        this.artRange = artRange;
        this.favorite = favorite;
        this.rpm = rpm;
        this.facts = facts;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getArtRange() {
        return artRange;
    }

    public void setArtRange(Integer artRange) {
        this.artRange = artRange;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public Integer getRpm() {
        return rpm;
    }

    public void setRpm(Integer rpm) {
        this.rpm = rpm;
    }

    public String getFacts() {
        return facts;
    }

    public void setFacts(String facts) {
        this.facts = facts;
    }
}
