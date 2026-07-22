package com.cognizant.country.service;

import com.cognizant.country.entity.Country;
import com.cognizant.country.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepository countryRepository;

    @Override
    public Country findCountryByCode(String code) {
        return countryRepository.findById(code).orElse(null);
    }

    @Override
    public Country addCountry(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public Country updateCountry(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public void deleteCountry(String code) {
        countryRepository.deleteById(code);
    }

    @Override
    public List<Country> searchCountryByName(String name) {
        return countryRepository.findByNameContainingIgnoreCase(name);
    }
}