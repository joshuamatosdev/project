package com.joshuamatos.library.artillery;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PATCH})
@RequestMapping("/api/")
public class ArtilleryController {
    private final ArtilleryService artilleryService;
    @GetMapping("/artillery")
    public List<Artillery> getAllBooks() {
        return artilleryService.getAllArtilleryPieces();
    }

    @PostMapping("/artillery")
    public Artillery createASingleBook(@RequestBody Artillery artillery) {
        return artilleryService.createArtillery(artillery);
    }

    @GetMapping("/artillery/{id}")
    public Artillery returnASingleBook(@PathVariable Long id) {
        return artilleryService.getArtilleryById(id);
    }

    @PatchMapping("/artillery/{id}")
    public Artillery patchASingleBook(@PathVariable Long id, @RequestBody Artillery artillery) {
        return artilleryService.updateArtillery(artillery, id);
    }
    
    @DeleteMapping("/artillery/{id}")
    public void deleteASingleBook(@PathVariable Long id) {
        artilleryService.deleteArtilleryById(id);
    }
}
