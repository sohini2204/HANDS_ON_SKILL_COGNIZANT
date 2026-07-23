package com.cognizant.springlearn.service;

import com.cognizant.springlearn.model.Country;
import com.cognizant.springlearn.service.exception.CountryNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CountryService {

    private Country[] countries = {
            new Country("IN", "India"),
            new Country("US", "United States"),
            new Country("JP", "Japan"),
            new Country("DE", "Germany")
    };

    public Country getCountry(String code)
            throws CountryNotFoundException {

        for (Country country : countries) {

            if (country.getCode().equalsIgnoreCase(code)) {
                return country;
            }
        }

        throw new CountryNotFoundException();
    }
}