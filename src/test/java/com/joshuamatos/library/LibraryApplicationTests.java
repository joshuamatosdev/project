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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class LibraryApplicationTests {

    @Autowired
    MockMvc mvc;

    private final String API_URL = "/api/artillery";
    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void contextLoads() {
        // Just verify the application context loads successfully
    }

    @Test
    @Transactional
    @Rollback
    void getAllArtillery_ReturnsEmptyList_WhenNoData() throws Exception {
        this.mvc.perform(get(API_URL).contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @Transactional
    @Rollback
    void createArtillery_ReturnsCreatedArtillery() throws Exception {
        Artillery artillery = new Artillery("M198 howitzer", 30100, false, 2, "155mm howitzer");
        String jsonData = mapper.writeValueAsString(artillery);

        this.mvc.perform(post(API_URL).contentType(APPLICATION_JSON).content(jsonData))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.type").value("M198 howitzer"))
                .andExpect(jsonPath("$.artRange").value(30100))
                .andExpect(jsonPath("$.favorite").value(false))
                .andExpect(jsonPath("$.rpm").value(2));
    }

    @Test
    @Transactional
    @Rollback
    void getArtilleryById_ReturnsArtillery_WhenExists() throws Exception {
        // Create artillery first
        Artillery artillery = new Artillery("M777 howitzer", 24000, true, 5, "Lightweight 155mm");
        String jsonData = mapper.writeValueAsString(artillery);

        MvcResult createResult = this.mvc.perform(post(API_URL).contentType(APPLICATION_JSON).content(jsonData))
                .andExpect(status().isOk())
                .andReturn();

        // Extract the created ID from response
        String responseBody = createResult.getResponse().getContentAsString();
        Artillery created = mapper.readValue(responseBody, Artillery.class);

        // Get by ID
        this.mvc.perform(get(API_URL + "/" + created.getId()).contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(created.getId()))
                .andExpect(jsonPath("$.type").value("M777 howitzer"))
                .andExpect(jsonPath("$.artRange").value(24000))
                .andExpect(jsonPath("$.favorite").value(true));
    }

    @Test
    @Transactional
    @Rollback
    void getArtilleryById_Returns404_WhenNotExists() throws Exception {
        this.mvc.perform(get(API_URL + "/99999").contentType(APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @Rollback
    void updateArtillery_ReturnsUpdatedArtillery() throws Exception {
        // Create artillery first
        Artillery artillery = new Artillery("M109 Paladin", 18000, false, 4, "Self-propelled howitzer");
        String jsonData = mapper.writeValueAsString(artillery);

        MvcResult createResult = this.mvc.perform(post(API_URL).contentType(APPLICATION_JSON).content(jsonData))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = createResult.getResponse().getContentAsString();
        Artillery created = mapper.readValue(responseBody, Artillery.class);

        // Update it
        String updateJson = "{\"type\": \"M109A6 Paladin\", \"artRange\": 22000, \"favorite\": true}";

        this.mvc.perform(patch(API_URL + "/" + created.getId()).contentType(APPLICATION_JSON).content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(created.getId()))
                .andExpect(jsonPath("$.type").value("M109A6 Paladin"))
                .andExpect(jsonPath("$.artRange").value(22000))
                .andExpect(jsonPath("$.favorite").value(true));
    }

    @Test
    @Transactional
    @Rollback
    void updateArtillery_Returns404_WhenNotExists() throws Exception {
        String updateJson = "{\"type\": \"Fake Artillery\"}";

        // This test verifies that updating a non-existent artillery returns 404
        this.mvc.perform(patch(API_URL + "/99999").contentType(APPLICATION_JSON).content(updateJson))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @Transactional
    @Rollback
    void deleteArtillery_Succeeds_WhenExists() throws Exception {
        // Create artillery first
        Artillery artillery = new Artillery("M198 howitzer", 30100, false, 2, "Test artillery");
        String jsonData = mapper.writeValueAsString(artillery);

        MvcResult createResult = this.mvc.perform(post(API_URL).contentType(APPLICATION_JSON).content(jsonData))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = createResult.getResponse().getContentAsString();
        Artillery created = mapper.readValue(responseBody, Artillery.class);

        // Delete it
        this.mvc.perform(delete(API_URL + "/" + created.getId()).contentType(APPLICATION_JSON))
                .andExpect(status().isOk());

        // Verify it's gone
        this.mvc.perform(get(API_URL + "/" + created.getId()).contentType(APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @Rollback
    void deleteArtillery_Returns404_WhenNotExists() throws Exception {
        this.mvc.perform(delete(API_URL + "/99999").contentType(APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @Rollback
    void createArtillery_Returns400_WhenInvalidData() throws Exception {
        // Missing required type field (should be @NotBlank)
        String invalidJson = "{\"artRange\": 5000, \"favorite\": false}";

        this.mvc.perform(post(API_URL).contentType(APPLICATION_JSON).content(invalidJson))
                .andExpect(status().isBadRequest());
    }
}
