package com.joshuamatos.library.artillery;

import com.joshuamatos.library.unit.Unit;
import jakarta.persistence.*;

@Entity
@DiscriminatorValue("ARTILLERY")
public class Artillery extends Unit {

    public Artillery() {
        super();
    }

    public Artillery(Long id, String type, Integer artRange, Boolean favorite, Integer rpm) {
        super(id, type, artRange, favorite, rpm);
    }

    public Artillery(String type, Integer artRange, Boolean favorite, Integer rpm, String facts) {
        super(type, artRange, favorite, rpm, facts);
    }
}
