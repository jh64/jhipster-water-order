package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.WaterOrderService;
import com.mycompany.myapp.domain.WaterOrder;
import com.mycompany.myapp.repository.WaterOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link WaterOrder}.
 */
@Service
@Transactional
public class WaterOrderServiceImpl implements WaterOrderService {

    private final Logger log = LoggerFactory.getLogger(WaterOrderServiceImpl.class);

    private final WaterOrderRepository waterOrderRepository;

    public WaterOrderServiceImpl(WaterOrderRepository waterOrderRepository) {
        this.waterOrderRepository = waterOrderRepository;
    }

    @Override
    public WaterOrder save(WaterOrder waterOrder) {
        log.debug("Request to save WaterOrder : {}", waterOrder);
        return waterOrderRepository.save(waterOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WaterOrder> findAll(Pageable pageable) {
        log.debug("Request to get all WaterOrders");
        return waterOrderRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<WaterOrder> findOne(Long id) {
        log.debug("Request to get WaterOrder : {}", id);
        return waterOrderRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete WaterOrder : {}", id);
        waterOrderRepository.deleteById(id);
    }
}
