package com.joshuamatos.library.artillery;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/")
public class ArtilleryController {
    private final ArtilleryService artilleryService;
    @GetMapping("/artillery")
    public List<Artillery> getAllArtillery() {
        return artilleryService.getAllArtilleryPieces();
    }

    @PostMapping("/artillery")
    public Artillery createArtillery(@Valid @RequestBody Artillery artillery) {
        return artilleryService.createArtillery(artillery);
    }

    @GetMapping("/artillery/{id}")
    public Artillery getArtilleryById(@PathVariable Long id) {
        return artilleryService.getArtilleryById(id);
    }

    @PatchMapping("/artillery/{id}")
    public Artillery updateArtillery(@PathVariable Long id, @Valid @RequestBody Artillery artillery) {
        return artilleryService.updateArtillery(artillery, id);
    }

    @DeleteMapping("/artillery/{id}")
    public void deleteArtilleryById(@PathVariable Long id) {
        artilleryService.deleteArtilleryById(id);
    }
}
