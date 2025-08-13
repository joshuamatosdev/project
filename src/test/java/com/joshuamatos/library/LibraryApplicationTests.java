package com.joshuamatos.library;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joshuamatos.library.artillery.Artillery;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class LibraryApplicationTests {

    @Autowired
    MockMvc mvc;
    String API_URL = "http://localhost:8080/api/artillery/";
    String inittype = "M198 howitzer";
    Integer initRange = 30100;
    Boolean initFavorite = false;
    String JSON_Data;



    void init() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Artillery artillery = new Artillery(inittype, initRange, initFavorite, 2, "");
        JSON_Data = mapper.writeValueAsString(artillery);
    }

    @Test
    void contextLoads() throws Exception {
        this.mvc.perform(get(API_URL)).andExpect(status().isOk());
    }
    @Test
    void getListBooksTest() throws Exception {
        this.mvc.perform(get(API_URL).contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].type").value("M1 240 mm Howitzer"))
                .andExpect(jsonPath("$[0].artRange").value(30100))
                .andExpect(jsonPath("$[0].favorite").value(false));

    }

    @Test
    @Transactional
    @Rollback
    void createPostBooksTest() throws Exception {
        this.mvc.perform(post(API_URL).contentType(APPLICATION_JSON).content(JSON_Data));

        this.mvc.perform(get(API_URL).contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].type").value(inittype))
                .andExpect(jsonPath("$[1].artRange").value(initRange))
                .andExpect(jsonPath("$[1].favorite").value(initFavorite));

    }


    @Test
    @Transactional
    @Rollback
    void getSingleBooksTest() throws Exception {
        this.mvc.perform(get(API_URL + "/1").contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.type").value("M1 240 mm Howitzer"))
                .andExpect(jsonPath("$.artRange").value(23013))
                .andExpect(jsonPath("$.favorite").value(false));

    }

    @Test
    @Transactional
    @Rollback
    void patchBooksTest() throws Exception {

        this.mvc.perform(patch(API_URL + "/1").contentType(APPLICATION_JSON).content(
                "{" +
                        "\"id\": 0," +
                        "\"type\": \"fake_data\"," +
                        "\"artRange\": 300," +
                        "\"favorite\": false" +
                        "}"
        ));

        this.mvc.perform(get(API_URL + "/1").contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.type").value("fake_data"))
                .andExpect(jsonPath("$.artRange").value(300))
                .andExpect(jsonPath("$.favorite").value(false));
    }


    @Test
    @Transactional
    @Rollback
    void deleteBooksTest() throws Exception {
        this.mvc.perform(delete(API_URL + "/1").contentType(APPLICATION_JSON));
        this.mvc.perform(get(API_URL).contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").doesNotExist());
    }

}
