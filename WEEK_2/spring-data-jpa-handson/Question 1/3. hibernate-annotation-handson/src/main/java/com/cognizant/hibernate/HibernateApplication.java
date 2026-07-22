package com.cognizant.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class HibernateApplication {

    public static void main(String[] args) {

        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .buildSessionFactory();

        // CREATE
        Session session = factory.openSession();
        Transaction transaction = session.beginTransaction();

        Employee employee = new Employee("Sohini", 50000);

        session.persist(employee);

        transaction.commit();
        session.close();

        System.out.println("Employee added successfully");

        // READ ALL
        session = factory.openSession();

        List<Employee> employees =
                session.createQuery(
                        "FROM Employee",
                        Employee.class
                ).list();

        for (Employee emp : employees) {
            System.out.println(emp);
        }

        session.close();

        factory.close();
    }
}