package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.WaterorderApp;
import com.mycompany.myapp.domain.WaterOrder;
import com.mycompany.myapp.repository.WaterOrderRepository;
import com.mycompany.myapp.service.WaterOrderService;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.Status;
/**
 * Integration tests for the {@link WaterOrderResource} REST controller.
 */
@SpringBootTest(classes = WaterorderApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class WaterOrderResourceIT {

    private static final Instant DEFAULT_START_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    private static final Status DEFAULT_STATUS = Status.REQUESTED;
    private static final Status UPDATED_STATUS = Status.INPROGRESS;

    @Autowired
    private WaterOrderRepository waterOrderRepository;

    @Autowired
    private WaterOrderService waterOrderService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWaterOrderMockMvc;

    private WaterOrder waterOrder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WaterOrder createEntity(EntityManager em) {
        WaterOrder waterOrder = new WaterOrder()
            .startTimestamp(DEFAULT_START_TIMESTAMP)
            .duration(DEFAULT_DURATION)
            .status(DEFAULT_STATUS);
        return waterOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WaterOrder createUpdatedEntity(EntityManager em) {
        WaterOrder waterOrder = new WaterOrder()
            .startTimestamp(UPDATED_START_TIMESTAMP)
            .duration(UPDATED_DURATION)
            .status(UPDATED_STATUS);
        return waterOrder;
    }

    @BeforeEach
    public void initTest() {
        waterOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createWaterOrder() throws Exception {
        int databaseSizeBeforeCreate = waterOrderRepository.findAll().size();
        // Create the WaterOrder
        restWaterOrderMockMvc.perform(post("/api/water-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(waterOrder)))
            .andExpect(status().isCreated());

        // Validate the WaterOrder in the database
        List<WaterOrder> waterOrderList = waterOrderRepository.findAll();
        assertThat(waterOrderList).hasSize(databaseSizeBeforeCreate + 1);
        WaterOrder testWaterOrder = waterOrderList.get(waterOrderList.size() - 1);
        assertThat(testWaterOrder.getStartTimestamp()).isEqualTo(DEFAULT_START_TIMESTAMP);
        assertThat(testWaterOrder.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testWaterOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createWaterOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = waterOrderRepository.findAll().size();

        // Create the WaterOrder with an existing ID
        waterOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWaterOrderMockMvc.perform(post("/api/water-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(waterOrder)))
            .andExpect(status().isBadRequest());

        // Validate the WaterOrder in the database
        List<WaterOrder> waterOrderList = waterOrderRepository.findAll();
        assertThat(waterOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStartTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = waterOrderRepository.findAll().size();
        // set the field null
        waterOrder.setStartTimestamp(null);

        // Create the WaterOrder, which fails.


        restWaterOrderMockMvc.perform(post("/api/water-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(waterOrder)))
            .andExpect(status().isBadRequest());

        List<WaterOrder> waterOrderList = waterOrderRepository.findAll();
        assertThat(waterOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDurationIsRequired() throws Exception {
        int databaseSizeBeforeTest = waterOrderRepository.findAll().size();
        // set the field null
        waterOrder.setDuration(null);

        // Create the WaterOrder, which fails.


        restWaterOrderMockMvc.perform(post("/api/water-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(waterOrder)))
            .andExpect(status().isBadRequest());

        List<WaterOrder> waterOrderList = waterOrderRepository.findAll();
        assertThat(waterOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWaterOrders() throws Exception {
        // Initialize the database
        waterOrderRepository.saveAndFlush(waterOrder);

        // Get all the waterOrderList
        restWaterOrderMockMvc.perform(get("/api/water-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(waterOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].startTimestamp").value(hasItem(DEFAULT_START_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getWaterOrder() throws Exception {
        // Initialize the database
        waterOrderRepository.saveAndFlush(waterOrder);

        // Get the waterOrder
        restWaterOrderMockMvc.perform(get("/api/water-orders/{id}", waterOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(waterOrder.getId().intValue()))
            .andExpect(jsonPath("$.startTimestamp").value(DEFAULT_START_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingWaterOrder() throws Exception {
        // Get the waterOrder
        restWaterOrderMockMvc.perform(get("/api/water-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWaterOrder() throws Exception {
        // Initialize the database
        waterOrderService.save(waterOrder);

        int databaseSizeBeforeUpdate = waterOrderRepository.findAll().size();

        // Update the waterOrder
        WaterOrder updatedWaterOrder = waterOrderRepository.findById(waterOrder.getId()).get();
        // Disconnect from session so that the updates on updatedWaterOrder are not directly saved in db
        em.detach(updatedWaterOrder);
        updatedWaterOrder
            .startTimestamp(UPDATED_START_TIMESTAMP)
            .duration(UPDATED_DURATION)
            .status(UPDATED_STATUS);

        restWaterOrderMockMvc.perform(put("/api/water-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedWaterOrder)))
            .andExpect(status().isOk());

        // Validate the WaterOrder in the database
        List<WaterOrder> waterOrderList = waterOrderRepository.findAll();
        assertThat(waterOrderList).hasSize(databaseSizeBeforeUpdate);
        WaterOrder testWaterOrder = waterOrderList.get(waterOrderList.size() - 1);
        assertThat(testWaterOrder.getStartTimestamp()).isEqualTo(UPDATED_START_TIMESTAMP);
        assertThat(testWaterOrder.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testWaterOrder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingWaterOrder() throws Exception {
        int databaseSizeBeforeUpdate = waterOrderRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWaterOrderMockMvc.perform(put("/api/water-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(waterOrder)))
            .andExpect(status().isBadRequest());

        // Validate the WaterOrder in the database
        List<WaterOrder> waterOrderList = waterOrderRepository.findAll();
        assertThat(waterOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWaterOrder() throws Exception {
        // Initialize the database
        waterOrderService.save(waterOrder);

        int databaseSizeBeforeDelete = waterOrderRepository.findAll().size();

        // Delete the waterOrder
        restWaterOrderMockMvc.perform(delete("/api/water-orders/{id}", waterOrder.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WaterOrder> waterOrderList = waterOrderRepository.findAll();
        assertThat(waterOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
    
    @Test
    @Transactional
    public void getAllWaterOrdersInprogressAndRunBatchTasklet() throws Exception {
        // Initialize the database
        waterOrderService.save(waterOrder);
        
        System.out.println("waterOrderRepository.findAll().size() - " + waterOrderRepository.findAll().size());
        
        //TODO: jd - implement and test the batch job function here - BatchJobTasklet.fuctionToRun()
    }
}
