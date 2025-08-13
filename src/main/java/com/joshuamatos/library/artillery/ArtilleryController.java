package com.joshuamatos.library.artillery;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PATCH})
@RequestMapping("/api/")
public class ArtilleryController {
    //	CRUD	Verb	Path	Name	Purpose
    //	List	GET	/artillery	"index" or "list" route	Responds with a list of artillery
    // 	Create	POST	/artillery	"create" route	Creates a book
    // 	Read	GET	/artillery/{id}	"show" route	Responds with a single book
    // 	Update	PATCH	/artillery/{id}	"update" route	Updates attributes of the book
    // 	Delete DELETE	/artillery/{id}	"delete" route	Deletes the book

    private final ArtilleryService artilleryService;

    //	List	GET	/artillery	"index" or "list" route	Responds with a list of artillery
    @GetMapping("/artillery")
    public List<Artillery> getAllBooks() {
        return artilleryService.returnAllBooks();
    }

    // 	Create	POST	/artillery	"create" route	Creates a book
    @PostMapping("/artillery")
    public Artillery createASingleBook(@RequestBody Artillery artillery) {
        return artilleryService.createASingleBook(artillery);
    }

    // 	Read	GET	/artillery/{id}	"show" route	Responds with a single book
    @GetMapping("/artillery/{id}")
    public Artillery returnASingleBook(@PathVariable Long id) {
        return artilleryService.returnASingleBook(id);
    }

    // 	Update	PATCH	/artillery/{id}	"update" route	Updates attributes of the book
    @PatchMapping("/artillery/{id}")
    public Artillery patchASingleBook(@PathVariable Long id, @RequestBody Artillery artillery) {
        return artilleryService.patchASingleBook(artillery, id);
    }

    // 	Delete DELETE	/artillery/{id}	"delete" route	Deletes the book
    @DeleteMapping("/artillery/{id}")
    public void deleteASingleBook(@PathVariable Long id) {
        artilleryService.deleteASingleBook(id);
    }
}
