package com.joshuamatos.library.infantry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfantryRepository extends JpaRepository<Infantry, Long> {

}
