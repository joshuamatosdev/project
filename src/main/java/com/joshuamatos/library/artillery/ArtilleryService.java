package com.joshuamatos.library.artillery;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ArtilleryService {

    private final ArtilleryRepository artilleryRepository;

    //	CRUD	Verb	Path	Name	Purpose
    //	List	GET	/artillery	"index" or "list" route	Responds with a list of artillery
    // 	Create	POST	/artillery	"create" route	Creates a book
    // 	Read	GET	/artillery/{id}	"show" route	Responds with a single book
    // 	Update	PATCH	/artillery/{id}	"update" route	Updates attributes of the book
    // 	Delete DELETE	/artillery/{id}	"delete" route	Deletes the book

    //	List	GET	/artillery	"index" or "list" route	Responds with a list of artillery
    public List<Artillery> returnAllBooks() {
        return artilleryRepository.findAll();
    }

    // 	Create	POST	/artillery	"create" route	Creates a book
    public Artillery createASingleBook(Artillery artillery) {
        return artilleryRepository.save(artillery);
    }

    // 	Read	GET	/artillery/{id}	"show" route	Responds with a single book
    public Artillery returnASingleBook(Long id) {
        return artilleryRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    // 	Update	PATCH	/artillery/{id}	"update" route	Updates attributes of the book
    public Artillery patchASingleBook(Artillery artillery, Long id) {
        if (artilleryRepository.existsById(id)) {
            Artillery patchArtillery = artilleryRepository.findById(id).orElseThrow();


            if (artillery.getType() != null)
                patchArtillery.setType(artillery.getType());

//            if(artillery.getRange() > 0)
//                patchArtillery.setRange(artillery.getRange());

            //
//            if(artillery.getFavorite() != null)
//            patchArtillery.setFavorite(artillery.getFavorite());
            artilleryRepository.save(patchArtillery);
            return patchArtillery;
        } else {
            return new Artillery();
        }
    }

    // 	Delete DELETE	/artillery/{id}	"delete" route	Deletes the book
    public void deleteASingleBook(Long id) {
        if (artilleryRepository.existsById(id)) {
            artilleryRepository.deleteById(id);
        }
    }
}
