package com.joshuamatos.library.infantry;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PATCH})
@RequestMapping("/api")
public class InfantryController {
    //	CRUD	Verb	Path	Name	Purpose
    //	List	GET	/Infantry	"index" or "list" route	Responds with a list of Infantry
    // 	Create	POST	/Infantry	"create" route	Creates a Infantry
    // 	Read	GET	/Infantry/{id}	"show" route	Responds with a single Infantry
    // 	Update	PATCH	/Infantry/{id}	"update" route	Updates attributes of the Infantry
    // 	Delete DELETE	/Infantry/{id}	"delete" route	Deletes the Infantry

    private final InfantryService infantryService;

    //	List	GET	/Infantry	"index" or "list" route	Responds with a list of Infantry
    @GetMapping("/infantry")
    public List<Infantry> getAllInfantry() {
        return infantryService.returnAllInfantry();
    }

    // 	Create	POST	/Infantry	"create" route	Creates a Infantry
    @PostMapping("/infantry")
    public Infantry createASingleInfantry(@RequestBody Infantry infantry) {
        return infantryService.createASingleInfantry(infantry);
    }

    // 	Read	GET	/Infantry/{id}	"show" route	Responds with a single Infantry
    @GetMapping("/infantry/{id}")
    public Infantry returnASingleInfantry(@PathVariable Long id) {
        return infantryService.returnASingleInfantry(id);
    }

    // 	Update	PATCH	/Infantry/{id}	"update" route	Updates attributes of the Infantry
    @PatchMapping("/infantry/{id}")
    public Infantry patchASingleInfantry(@PathVariable Long id, @RequestBody Infantry infantry) {
        return infantryService.patchASingleInfantry(infantry, id);
    }

    // 	Delete DELETE	/Infantry/{id}	"delete" route	Deletes the Infantry
    @DeleteMapping("/infantry/{id}")
    public void deleteASingleInfantry(@PathVariable Long id) {
        infantryService.deleteASingleInfantry(id);
    }
}
