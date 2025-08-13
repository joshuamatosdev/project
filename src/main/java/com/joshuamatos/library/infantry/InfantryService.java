package com.joshuamatos.library.infantry;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InfantryService {

    private final InfantryRepository infantryRepository;

    //	CRUD	Verb	Path	Name	Purpose
    //	List	GET	/artillery	"index" or "list" route	Responds with a list of artillery
    // 	Create	POST	/artillery	"create" route	Creates a Infantry
    // 	Read	GET	/artillery/{id}	"show" route	Responds with a single Infantry
    // 	Update	PATCH	/artillery/{id}	"update" route	Updates attributes of the Infantry
    // 	Delete DELETE	/artillery/{id}	"delete" route	Deletes the Infantry

    //	List	GET	/artillery	"index" or "list" route	Responds with a list of artillery
    public List<Infantry> returnAllInfantry() {
        return infantryRepository.findAll();
    }

    // 	Create	POST	/artillery	"create" route	Creates a Infantry
    public Infantry createASingleInfantry(Infantry infantry) {
        return infantryRepository.save(infantry);
    }

    // 	Read	GET	/artillery/{id}	"show" route	Responds with a single Infantry
    public Infantry returnASingleInfantry(Long id) {
        return infantryRepository.findById(id).orElseThrow(() -> new RuntimeException("Infantry not found"));
    }

    // 	Update	PATCH	/artillery/{id}	"update" route	Updates attributes of the Infantry
    public Infantry patchASingleInfantry(Infantry infantry, Long id) {
        if (infantryRepository.existsById(id)) {
            Infantry patchInfantry = infantryRepository.findById(id).orElseThrow();


            if (infantry.getType() != null)
                patchInfantry.setType(infantry.getType());

//            if(artillery.getRange() > 0)
//                patchArtillery.setRange(artillery.getRange());

            //
//            if(artillery.getFavorite() != null)
//            patchArtillery.setFavorite(artillery.getFavorite());
            infantryRepository.save(patchInfantry);
            return patchInfantry;
        } else {
            return new Infantry();
        }
    }

    // 	Delete DELETE	/artillery/{id}	"delete" route	Deletes the Infantry
    public void deleteASingleInfantry(Long id) {
        if (infantryRepository.existsById(id)) {
            infantryRepository.deleteById(id);
        }
    }
}
