package com.joshuamatos.library.infantry;

import com.joshuamatos.library.exception.ResourceNotFoundException;
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
        return infantryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Infantry not found with id: " + id));
    }

    public Infantry updateInfantry(Infantry infantry, Long id) {
        Infantry existing = infantryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Infantry not found with id: " + id));

        if (infantry.getType() != null) {
            existing.setType(infantry.getType());
        }
        if (infantry.getArtRange() != null) {
            existing.setArtRange(infantry.getArtRange());
        }
        if (infantry.getFavorite() != null) {
            existing.setFavorite(infantry.getFavorite());
        }
        if (infantry.getRpm() != null) {
            existing.setRpm(infantry.getRpm());
        }
        if (infantry.getFacts() != null) {
            existing.setFacts(infantry.getFacts());
        }

        return infantryRepository.save(existing);
    }

    public void deleteInfantryById(Long id) {
        if (!infantryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Infantry not found with id: " + id);
        }
        infantryRepository.deleteById(id);
    }
}
