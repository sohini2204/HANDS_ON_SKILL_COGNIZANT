package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.model.Country;
import com.cognizant.springlearn.service.CountryService;
import com.cognizant.springlearn.service.exception.CountryNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(CountryController.class);

    private CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    // Existing method: Get India
    @RequestMapping("/country")
    public Country getCountryIndia() {

        LOGGER.info("START - getCountryIndia()");

        Country country = new Country("IN", "India");

        LOGGER.info("END - getCountryIndia()");

        return country;
    }

    // Existing method: Get all countries
    @GetMapping("/countries")
    public Country[] getAllCountries() {

        LOGGER.info("START - getAllCountries()");

        Country[] countries = {
                new Country("IN", "India"),
                new Country("US", "United States"),
                new Country("JP", "Japan"),
                new Country("DE", "Germany")
        };

        LOGGER.info("END - getAllCountries()");

        return countries;
    }

    // ADD THE NEW METHOD HERE
    @GetMapping("/country/{code}")
    public Country getCountry(@PathVariable String code)
            throws CountryNotFoundException {

        LOGGER.info("START - getCountry()");

        Country country = countryService.getCountry(code);

        LOGGER.info("END - getCountry()");

        return country;
    }
}