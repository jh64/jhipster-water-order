package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Farm;
import com.mycompany.myapp.service.FarmService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Farm}.
 */
@RestController
@RequestMapping("/api")
public class FarmResource {

    private final Logger log = LoggerFactory.getLogger(FarmResource.class);

    private static final String ENTITY_NAME = "farm";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FarmService farmService;

    public FarmResource(FarmService farmService) {
        this.farmService = farmService;
    }

    /**
     * {@code POST  /farms} : Create a new farm.
     *
     * @param farm the farm to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new farm, or with status {@code 400 (Bad Request)} if the farm has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/farms")
    public ResponseEntity<Farm> createFarm(@Valid @RequestBody Farm farm) throws URISyntaxException {
        log.debug("REST request to save Farm : {}", farm);
        if (farm.getId() != null) {
            throw new BadRequestAlertException("A new farm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Farm result = farmService.save(farm);
        return ResponseEntity.created(new URI("/api/farms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /farms} : Updates an existing farm.
     *
     * @param farm the farm to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated farm,
     * or with status {@code 400 (Bad Request)} if the farm is not valid,
     * or with status {@code 500 (Internal Server Error)} if the farm couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/farms")
    public ResponseEntity<Farm> updateFarm(@Valid @RequestBody Farm farm) throws URISyntaxException {
        log.debug("REST request to update Farm : {}", farm);
        if (farm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Farm result = farmService.save(farm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, farm.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /farms} : get all the farms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of farms in body.
     */
    @GetMapping("/farms")
    public List<Farm> getAllFarms() {
        log.debug("REST request to get all Farms");
        return farmService.findAll();
    }

    /**
     * {@code GET  /farms/:id} : get the "id" farm.
     *
     * @param id the id of the farm to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the farm, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/farms/{id}")
    public ResponseEntity<Farm> getFarm(@PathVariable Long id) {
        log.debug("REST request to get Farm : {}", id);
        Optional<Farm> farm = farmService.findOne(id);
        return ResponseUtil.wrapOrNotFound(farm);
    }

    /**
     * {@code DELETE  /farms/:id} : delete the "id" farm.
     *
     * @param id the id of the farm to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/farms/{id}")
    public ResponseEntity<Void> deleteFarm(@PathVariable Long id) {
        log.debug("REST request to delete Farm : {}", id);
        farmService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
