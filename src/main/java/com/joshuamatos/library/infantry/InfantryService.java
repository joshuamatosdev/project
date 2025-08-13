package com.joshuamatos.library.infantry;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InfantryService {
    private final InfantryRepository infantryRepository;

    public List<Infantry> getAllInfantry() {
        return infantryRepository.findAll();
    }


    public Infantry createInfantry(Infantry infantry) {
        return infantryRepository.save(infantry);
    }
    
    public Infantry getInfantry(Long id) {
        return infantryRepository.findById(id).orElseThrow(() -> new RuntimeException("Infantry not found"));
    }
    
    public Infantry updateInfantry(Infantry infantry, Long id) {
        if (infantryRepository.existsById(id)) {
            Infantry patchInfantry = infantryRepository.findById(id).orElseThrow();
            
            if (infantry.getType() != null)
                patchInfantry.setType(infantry.getType());
            infantryRepository.save(patchInfantry);
            return patchInfantry;
        } else {
            return new Infantry();
        }
    }
    
    public void deleteInfantryById(Long id) {
        if (infantryRepository.existsById(id)) {
            infantryRepository.deleteById(id);
        }
    }
}
