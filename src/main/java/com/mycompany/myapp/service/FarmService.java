package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Farm;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Farm}.
 */
public interface FarmService {

    /**
     * Save a farm.
     *
     * @param farm the entity to save.
     * @return the persisted entity.
     */
    Farm save(Farm farm);

    /**
     * Get all the farms.
     *
     * @return the list of entities.
     */
    List<Farm> findAll();


    /**
     * Get the "id" farm.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Farm> findOne(Long id);

    /**
     * Delete the "id" farm.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
