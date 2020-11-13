package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.WaterOrder;
import com.mycompany.myapp.service.WaterOrderService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.WaterOrder}.
 */
@RestController
@RequestMapping("/api")
public class WaterOrderResource {

    private final Logger log = LoggerFactory.getLogger(WaterOrderResource.class);

    private static final String ENTITY_NAME = "waterOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WaterOrderService waterOrderService;

    public WaterOrderResource(WaterOrderService waterOrderService) {
        this.waterOrderService = waterOrderService;
    }

    /**
     * {@code POST  /water-orders} : Create a new waterOrder.
     *
     * @param waterOrder the waterOrder to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new waterOrder, or with status {@code 400 (Bad Request)} if the waterOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/water-orders")
    public ResponseEntity<WaterOrder> createWaterOrder(@Valid @RequestBody WaterOrder waterOrder) throws URISyntaxException {
        log.debug("REST request to save WaterOrder : {}", waterOrder);
        if (waterOrder.getId() != null) {
            throw new BadRequestAlertException("A new waterOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        
        /*TODO: jd - #4 The API must ensure the water orders for a farm do not overlap
         *  For example, if Farm X already has an order for 30 Jan 2019 starting at 6am with a 3
            hours duration, it should not allow Farm X to place an order starting at 8am on the
            same day.
         */
        
        WaterOrder result = waterOrderService.save(waterOrder);
        return ResponseEntity.created(new URI("/api/water-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /water-orders} : Updates an existing waterOrder.
     *
     * @param waterOrder the waterOrder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated waterOrder,
     * or with status {@code 400 (Bad Request)} if the waterOrder is not valid,
     * or with status {@code 500 (Internal Server Error)} if the waterOrder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/water-orders")
    public ResponseEntity<WaterOrder> updateWaterOrder(@Valid @RequestBody WaterOrder waterOrder) throws URISyntaxException {
        log.debug("REST request to update WaterOrder : {}", waterOrder);
        if (waterOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WaterOrder result = waterOrderService.save(waterOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, waterOrder.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /water-orders} : get all the waterOrders.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of waterOrders in body.
     */
    @GetMapping("/water-orders")
    public ResponseEntity<List<WaterOrder>> getAllWaterOrders(Pageable pageable) {
        log.debug("REST request to get a page of WaterOrders");
        Page<WaterOrder> page = waterOrderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /water-orders/:id} : get the "id" waterOrder.
     *
     * @param id the id of the waterOrder to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the waterOrder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/water-orders/{id}")
    public ResponseEntity<WaterOrder> getWaterOrder(@PathVariable Long id) {
        log.debug("REST request to get WaterOrder : {}", id);
        Optional<WaterOrder> waterOrder = waterOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(waterOrder);
    }

    /**
     * {@code DELETE  /water-orders/:id} : delete the "id" waterOrder.
     *
     * @param id the id of the waterOrder to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/water-orders/{id}")
    public ResponseEntity<Void> deleteWaterOrder(@PathVariable Long id) {
        log.debug("REST request to delete WaterOrder : {}", id);
        waterOrderService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
