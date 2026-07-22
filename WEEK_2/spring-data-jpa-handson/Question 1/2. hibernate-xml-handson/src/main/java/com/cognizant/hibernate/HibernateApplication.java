package com.cognizant.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class HibernateApplication {

    private static SessionFactory factory;

    public static void main(String[] args) {

        factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .buildSessionFactory();

        addEmployee();

        getAllEmployees();

        getEmployee(1);

        deleteEmployee(1);

        factory.close();
    }

    // CREATE
    private static void addEmployee() {

        Session session = factory.openSession();
        Transaction transaction = null;

        try {

            transaction = session.beginTransaction();

            Employee employee =
                    new Employee("Sohini", 50000);

            session.persist(employee);

            transaction.commit();

            System.out.println("Employee added successfully");

        } catch (Exception e) {

            if (transaction != null) {
                transaction.rollback();
            }

            e.printStackTrace();

        } finally {

            session.close();
        }
    }

    // READ ALL
    private static void getAllEmployees() {

        Session session = factory.openSession();

        try {

            List<Employee> employees =
                    session.createQuery(
                            "FROM Employee",
                            Employee.class
                    ).list();

            for (Employee employee : employees) {
                System.out.println(employee);
            }

        } finally {

            session.close();
        }
    }

    // READ ONE
    private static void getEmployee(int id) {

        Session session = factory.openSession();

        try {

            Employee employee =
                    session.get(Employee.class, id);

            System.out.println("Employee found:");
            System.out.println(employee);

        } finally {

            session.close();
        }
    }

    // DELETE
    private static void deleteEmployee(int id) {

        Session session = factory.openSession();
        Transaction transaction = null;

        try {

            transaction = session.beginTransaction();

            Employee employee =
                    session.get(Employee.class, id);

            if (employee != null) {
                session.remove(employee);
            }

            transaction.commit();

            System.out.println("Employee deleted successfully");

        } catch (Exception e) {

            if (transaction != null) {
                transaction.rollback();
            }

            e.printStackTrace();

        } finally {

            session.close();
        }
    }
}