package com.joshuamatos.library.infantry;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PATCH})
@RequestMapping("/api")
public class InfantryController {
    private final InfantryService infantryService;

    @GetMapping("/infantry")
    public List<Infantry> getAllInfantry() {
        return infantryService.getAllInfantry();
    }
    
    @PostMapping("/infantry")
    public Infantry createASingleInfantry(@RequestBody Infantry infantry) {
        return infantryService.createInfantry(infantry);
    }
    
    @GetMapping("/infantry/{id}")
    public Infantry returnASingleInfantry(@PathVariable Long id) {
        return infantryService.getInfantry(id);
    }
    
    @PatchMapping("/infantry/{id}")
    public Infantry patchASingleInfantry(@PathVariable Long id, @RequestBody Infantry infantry) {
        return infantryService.updateInfantry(infantry, id);
    }
    
    @DeleteMapping("/infantry/{id}")
    public void deleteASingleInfantry(@PathVariable Long id) {
        infantryService.deleteInfantryById(id);
    }
}
