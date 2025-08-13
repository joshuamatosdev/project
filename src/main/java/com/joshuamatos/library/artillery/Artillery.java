package com.joshuamatos.library.artillery;

import javax.persistence.*;

@Table
@Entity
public class Artillery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private Integer artRange;
    private Boolean favorite;
    private Integer rpm;
    @Column(length = 65555)
    private String facts;

    public Artillery(Long id, String type, Integer artRange, Boolean favorite, Integer rpm) {
        this.id = id;
        this.type = type;
        this.artRange = artRange;
        this.favorite = favorite;
        this.rpm = rpm;
    }

    public Artillery(String type, Integer artRange, Boolean favorite , Integer rpm, String facts) {
        this.type = type;
        this.artRange = artRange;
        this.favorite = favorite;
        this.rpm = rpm;
        this.facts = facts;
    }


    public Artillery() {
    }

    public String getFacts() {
        return facts;
    }

    public void setFacts(String facts) {
        this.facts = facts;
    }

    public Integer getRpm() {
        return rpm;
    }

    public void setRpm(Integer rpm) {
        this.rpm = rpm;
    }

    public Integer getArtRange() {
        return artRange;
    }

    public void setArtRange(Integer range) {
        this.artRange = range;
    }

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

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }
}
