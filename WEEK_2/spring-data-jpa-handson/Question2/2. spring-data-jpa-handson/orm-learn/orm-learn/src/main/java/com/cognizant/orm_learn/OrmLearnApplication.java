/*package com.cognizant.orm_learn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cognizant.orm_learn.service.CountryService;

@SpringBootApplication
public class OrmLearnApplication implements CommandLineRunner {

    @Autowired
    private CountryService countryService;

    public static void main(String[] args) {
        SpringApplication.run(OrmLearnApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Countries containing 'ou'");
        System.out.println(countryService.findByNameContaining("ou"));

        System.out.println("-------------------------");

        System.out.println("Countries containing 'ou' in ascending order");
        System.out.println(countryService.findByNameContainingOrderByNameAsc("ou"));

        System.out.println("-------------------------");

        System.out.println("Countries starting with 'Z'");
        System.out.println(countryService.findByNameStartingWith("Z"));
    }
}*/

package com.cognizant.orm_learn;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cognizant.orm_learn.repository.StockRepository;

@SpringBootApplication
public class OrmLearnApplication implements CommandLineRunner {

    @Autowired
    private StockRepository stockRepository;

    public static void main(String[] args) {
        SpringApplication.run(OrmLearnApplication.class, args);
    }

    @Override
    public void run(String... args) {

        System.out.println("Facebook September 2019");
        System.out.println(
                stockRepository.findByCodeAndDateBetween(
                        "FB",
                        LocalDate.of(2019,9,1),
                        LocalDate.of(2019,9,30)));

        System.out.println("--------------------------------");

        System.out.println("Google close >1250");
        System.out.println(
                stockRepository.findByCodeAndCloseGreaterThan(
                        "GOOGL",
                        1250));

        System.out.println("--------------------------------");

        System.out.println("Top 3 Highest Volume");
        System.out.println(
                stockRepository.findTop3ByOrderByVolumeDesc());

        System.out.println("--------------------------------");

        System.out.println("Lowest Netflix Stocks");
        System.out.println(
                stockRepository.findTop3ByCodeOrderByCloseAsc("NFLX"));
    }
}