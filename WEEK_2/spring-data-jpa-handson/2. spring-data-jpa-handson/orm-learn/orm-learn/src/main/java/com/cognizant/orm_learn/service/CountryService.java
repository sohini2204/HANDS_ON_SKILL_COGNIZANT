package com.cognizant.orm_learn.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.repository.CountryRepository;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public List<Country> findByNameContaining(String text) {
        return countryRepository.findByNameContaining(text);
    }

    public List<Country> findByNameContainingOrderByNameAsc(String text) {
        return countryRepository.findByNameContainingOrderByNameAsc(text);
    }

    public List<Country> findByNameStartingWith(String alphabet) {
        return countryRepository.findByNameStartingWith(alphabet);
    }
}