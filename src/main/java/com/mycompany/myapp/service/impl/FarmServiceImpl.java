package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.FarmService;
import com.mycompany.myapp.domain.Farm;
import com.mycompany.myapp.repository.FarmRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Farm}.
 */
@Service
@Transactional
public class FarmServiceImpl implements FarmService {

    private final Logger log = LoggerFactory.getLogger(FarmServiceImpl.class);

    private final FarmRepository farmRepository;

    public FarmServiceImpl(FarmRepository farmRepository) {
        this.farmRepository = farmRepository;
    }

    @Override
    public Farm save(Farm farm) {
        log.debug("Request to save Farm : {}", farm);
        return farmRepository.save(farm);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Farm> findAll() {
        log.debug("Request to get all Farms");
        return farmRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Farm> findOne(Long id) {
        log.debug("Request to get Farm : {}", id);
        return farmRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Farm : {}", id);
        farmRepository.deleteById(id);
    }
}
