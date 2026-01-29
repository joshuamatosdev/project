package com.joshuamatos.library.artillery;

import com.joshuamatos.library.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ArtilleryService {
    private final ArtilleryRepository artilleryRepository;

    public List<Artillery> getAllArtilleryPieces() {
        return artilleryRepository.findAll();
    }

    public Artillery createArtillery(Artillery artillery) {
        return artilleryRepository.save(artillery);
    }

    public Artillery getArtilleryById(Long id) {
        return artilleryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Artillery not found with id: " + id));
    }

    public Artillery updateArtillery(Artillery artillery, Long id) {
        Artillery existing = artilleryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Artillery not found with id: " + id));

        if (artillery.getType() != null) {
            existing.setType(artillery.getType());
        }
        if (artillery.getArtRange() != null) {
            existing.setArtRange(artillery.getArtRange());
        }
        if (artillery.getFavorite() != null) {
            existing.setFavorite(artillery.getFavorite());
        }
        if (artillery.getRpm() != null) {
            existing.setRpm(artillery.getRpm());
        }
        if (artillery.getFacts() != null) {
            existing.setFacts(artillery.getFacts());
        }

        return artilleryRepository.save(existing);
    }

    public void deleteArtilleryById(Long id) {
        if (!artilleryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Artillery not found with id: " + id);
        }
        artilleryRepository.deleteById(id);
    }
}
