package com.joshuamatos.library.infantry;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class InfantryController {
    private final InfantryService infantryService;

    @GetMapping("/infantry")
    public List<Infantry> getAllInfantry() {
        return infantryService.getAllInfantry();
    }
    
    @PostMapping("/infantry")
    public Infantry createInfantry(@Valid @RequestBody Infantry infantry) {
        return infantryService.createInfantry(infantry);
    }

    @GetMapping("/infantry/{id}")
    public Infantry getInfantryById(@PathVariable Long id) {
        return infantryService.getInfantry(id);
    }

    @PatchMapping("/infantry/{id}")
    public Infantry updateInfantry(@PathVariable Long id, @Valid @RequestBody Infantry infantry) {
        return infantryService.updateInfantry(infantry, id);
    }

    @DeleteMapping("/infantry/{id}")
    public void deleteInfantryById(@PathVariable Long id) {
        infantryService.deleteInfantryById(id);
    }
}
