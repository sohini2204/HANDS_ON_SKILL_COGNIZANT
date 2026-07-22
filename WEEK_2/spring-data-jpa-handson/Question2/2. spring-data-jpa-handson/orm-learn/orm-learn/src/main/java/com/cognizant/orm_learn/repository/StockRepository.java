package com.cognizant.orm_learn.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.orm_learn.model.Stock;

public interface StockRepository extends JpaRepository<Stock,Integer>{

    // Facebook in September 2019
    List<Stock> findByCodeAndDateBetween(
            String code,
            LocalDate start,
            LocalDate end);

    // Google close price >1250
    List<Stock> findByCodeAndCloseGreaterThan(
            String code,
            double close);

    // Highest volume
    List<Stock> findTop3ByOrderByVolumeDesc();

    // Lowest Netflix stocks
    List<Stock> findTop3ByCodeOrderByCloseAsc(String code);

}