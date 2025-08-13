package com.joshuamatos.library.artillery;

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
        return artilleryRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Artillery updateArtillery(Artillery artillery, Long id) {
        if (artilleryRepository.existsById(id)) {
            Artillery patchArtillery = artilleryRepository.findById(id).orElseThrow();


            if (artillery.getType() != null)
                patchArtillery.setType(artillery.getType());

//            if(artillery.getRange() > 0)
//                patchArtillery.setRange(artillery.getRange());
//            if(artillery.getFavorite() != null)
//            patchArtillery.setFavorite(artillery.getFavorite());

            artilleryRepository.save(patchArtillery);
            return patchArtillery;
        } else {
            return new Artillery();
        }
    }

    public void deleteArtilleryById(Long id) {
        if (artilleryRepository.existsById(id)) {
            artilleryRepository.deleteById(id);
        }
    }
}
