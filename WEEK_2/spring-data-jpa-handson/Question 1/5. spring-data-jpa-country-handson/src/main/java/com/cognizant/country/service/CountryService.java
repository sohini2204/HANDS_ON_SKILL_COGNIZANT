package com.cognizant.country.service;

import com.cognizant.country.entity.Country;

import java.util.List;

public interface CountryService {

    Country findCountryByCode(String code);

    Country addCountry(Country country);

    Country updateCountry(Country country);

    void deleteCountry(String code);

    List<Country> searchCountryByName(String name);
}