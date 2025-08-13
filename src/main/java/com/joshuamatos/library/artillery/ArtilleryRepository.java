package com.joshuamatos.library.artillery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtilleryRepository extends JpaRepository<Artillery, Long> {

}
