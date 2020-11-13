package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.WaterorderApp;
import com.mycompany.myapp.domain.Farm;
import com.mycompany.myapp.repository.FarmRepository;
import com.mycompany.myapp.service.FarmService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FarmResource} REST controller.
 */
@SpringBootTest(classes = WaterorderApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FarmResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private FarmService farmService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFarmMockMvc;

    private Farm farm;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Farm createEntity(EntityManager em) {
        Farm farm = new Farm()
            .name(DEFAULT_NAME);
        return farm;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Farm createUpdatedEntity(EntityManager em) {
        Farm farm = new Farm()
            .name(UPDATED_NAME);
        return farm;
    }

    @BeforeEach
    public void initTest() {
        farm = createEntity(em);
    }

    @Test
    @Transactional
    public void createFarm() throws Exception {
        int databaseSizeBeforeCreate = farmRepository.findAll().size();
        // Create the Farm
        restFarmMockMvc.perform(post("/api/farms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isCreated());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeCreate + 1);
        Farm testFarm = farmList.get(farmList.size() - 1);
        assertThat(testFarm.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createFarmWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = farmRepository.findAll().size();

        // Create the Farm with an existing ID
        farm.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFarmMockMvc.perform(post("/api/farms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = farmRepository.findAll().size();
        // set the field null
        farm.setName(null);

        // Create the Farm, which fails.


        restFarmMockMvc.perform(post("/api/farms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isBadRequest());

        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFarms() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        // Get all the farmList
        restFarmMockMvc.perform(get("/api/farms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(farm.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getFarm() throws Exception {
        // Initialize the database
        farmRepository.saveAndFlush(farm);

        // Get the farm
        restFarmMockMvc.perform(get("/api/farms/{id}", farm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(farm.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingFarm() throws Exception {
        // Get the farm
        restFarmMockMvc.perform(get("/api/farms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFarm() throws Exception {
        // Initialize the database
        farmService.save(farm);

        int databaseSizeBeforeUpdate = farmRepository.findAll().size();

        // Update the farm
        Farm updatedFarm = farmRepository.findById(farm.getId()).get();
        // Disconnect from session so that the updates on updatedFarm are not directly saved in db
        em.detach(updatedFarm);
        updatedFarm
            .name(UPDATED_NAME);

        restFarmMockMvc.perform(put("/api/farms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFarm)))
            .andExpect(status().isOk());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
        Farm testFarm = farmList.get(farmList.size() - 1);
        assertThat(testFarm.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingFarm() throws Exception {
        int databaseSizeBeforeUpdate = farmRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFarmMockMvc.perform(put("/api/farms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(farm)))
            .andExpect(status().isBadRequest());

        // Validate the Farm in the database
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFarm() throws Exception {
        // Initialize the database
        farmService.save(farm);

        int databaseSizeBeforeDelete = farmRepository.findAll().size();

        // Delete the farm
        restFarmMockMvc.perform(delete("/api/farms/{id}", farm.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Farm> farmList = farmRepository.findAll();
        assertThat(farmList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
