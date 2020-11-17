package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WaterOrder;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the WaterOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WaterOrderRepository extends JpaRepository<WaterOrder, Long> {

    @Query("select waterOrder from WaterOrder waterOrder where waterOrder.user.login = ?#{principal.username}")
    List<WaterOrder> findByUserIsCurrentUser();
    
    @Query("select waterOrder from WaterOrder waterOrder where waterOrder.status = 'INPROGRESS'")
    List<WaterOrder> findAllInprogress();
}
