package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Farm;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Farm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FarmRepository extends JpaRepository<Farm, Long> {

    @Query("select farm from Farm farm where farm.user.login = ?#{principal.username}")
    List<Farm> findByUserIsCurrentUser();
}
