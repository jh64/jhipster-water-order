package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.WaterOrder;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link WaterOrder}.
 */
public interface WaterOrderService {

    /**
     * Save a waterOrder.
     *
     * @param waterOrder the entity to save.
     * @return the persisted entity.
     */
    WaterOrder save(WaterOrder waterOrder);

    /**
     * Get all the waterOrders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WaterOrder> findAll(Pageable pageable);


    /**
     * Get the "id" waterOrder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WaterOrder> findOne(Long id);

    /**
     * Delete the "id" waterOrder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
