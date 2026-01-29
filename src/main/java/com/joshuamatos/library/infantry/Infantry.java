package com.joshuamatos.library.infantry;

import com.joshuamatos.library.unit.Unit;
import jakarta.persistence.*;

@Entity
@DiscriminatorValue("INFANTRY")
public class Infantry extends Unit {

    public Infantry() {
        super();
    }

    public Infantry(Long id, String type, Integer artRange, Boolean favorite, Integer rpm) {
        super(id, type, artRange, favorite, rpm);
    }

    public Infantry(String type, Integer artRange, Boolean favorite, Integer rpm, String facts) {
        super(type, artRange, favorite, rpm, facts);
    }
}
