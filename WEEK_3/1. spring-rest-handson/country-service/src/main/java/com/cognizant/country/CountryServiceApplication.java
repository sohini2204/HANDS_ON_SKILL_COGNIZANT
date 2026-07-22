/*package com.cognizant.country;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CountryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CountryServiceApplication.class, args);
	}

}*/
/*package com.cognizant.country;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
public class CountryServiceApplication {

    public static void main(String[] args) throws ParseException {

        SpringApplication.run(CountryServiceApplication.class, args);

        displayDate();
    }

    public static void displayDate() throws ParseException {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("date-format.xml");

        SimpleDateFormat format =
                context.getBean("dateFormat", SimpleDateFormat.class);

        Date date = format.parse("31/12/2018");

        System.out.println(date);
    }
}*/

/*package com.cognizant.country;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
public class CountryServiceApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(CountryServiceApplication.class);

    public static void main(String[] args) throws ParseException {

        SpringApplication.run(CountryServiceApplication.class, args);

        CountryServiceApplication application =
                new CountryServiceApplication();

        application.displayDate();
    }

    public void displayDate() throws ParseException {

        LOGGER.info("START");

        ApplicationContext context =
                new ClassPathXmlApplicationContext("date-format.xml");

        SimpleDateFormat format =
                context.getBean("dateFormat", SimpleDateFormat.class);

        Date date = format.parse("31/12/2018");

        LOGGER.debug("Date: {}", date);

        LOGGER.info("END");
    }
}*/

/*package com.cognizant.country;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class CountryServiceApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(CountryServiceApplication.class);

    public static void main(String[] args) {

        SpringApplication.run(CountryServiceApplication.class, args);

        CountryServiceApplication application =
                new CountryServiceApplication();

        application.displayCountry();
    }

    public void displayCountry() {

        LOGGER.info("START");

        ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        Country country =
                context.getBean("country", Country.class);

        LOGGER.debug("Country : {}", country.toString());

        LOGGER.info("END");
    }
}*/

/*package com.cognizant.country;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class CountryServiceApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(CountryServiceApplication.class);

    public static void main(String[] args) {

        SpringApplication.run(CountryServiceApplication.class, args);

        CountryServiceApplication application =
                new CountryServiceApplication();

        application.displayCountry();
    }

    public void displayCountry() {

        LOGGER.info("START");

        ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        Country country =
                context.getBean("country", Country.class);

        Country anotherCountry =
                context.getBean("country", Country.class);

        LOGGER.debug("Country : {}", country.toString());

        LOGGER.debug("Another Country : {}",
                anotherCountry.toString());

        LOGGER.info("END");
    }
}*/package com.cognizant.country;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class CountryServiceApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(CountryServiceApplication.class);

    public static void main(String[] args) {

        SpringApplication.run(CountryServiceApplication.class, args);

        CountryServiceApplication application =
                new CountryServiceApplication();

        application.displayCountries();
    }

    public void displayCountries() {

        LOGGER.info("START");

        ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        List<Country> countries =
                context.getBean("countryList", List.class);

        LOGGER.debug("Countries : {}", countries);

        LOGGER.info("END");
    }
}

