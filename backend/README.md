# Hospital Patient Portal - Java Backend Architecture

This directory provides an architectural overview of the **Hospital Patient Portal** backend project developed by **Madduri Vara Prasad**.

> **Note**: The complete, compiled Java Full Stack backend source code (Servlets, JSP, JDBC, Maven, Tomcat) is hosted in its dedicated GitHub repository:
> 
> 🔗 **GitHub Repository**: [Hospital Patient Portal Source Code](https://github.com/VaraPrasad-225/HospitalPatientPortal)  
> 🌐 **Live Demo Page**: [Hospital Patient Portal Demo](https://varaprasad-225.github.io/HospitalPatientPortal/)

---

## Technical Stack & Architecture

- **Programming Language**: Core Java (JDK 17+)
- **Web Tier**: Java Servlets, JSP (JavaServer Pages), JSTL, Expression Language (EL)
- **Persistence Tier**: JDBC (Java Database Connectivity) with Connection Pooling (HikariCP / Tomcat DBCP)
- **Database Engine**: MySQL 8.0+
- **Build System**: Apache Maven
- **Application Server**: Apache Tomcat 9.0 / 10.0

---

## MVC Architecture & Package Structure

```text
com.hospitalpatientportal/
├── controller/            # Java Servlets handling HTTP GET/POST Requests
│   ├── PatientServlet.java
│   ├── AppointmentServlet.java
│   └── LoginServlet.java
├── dao/                   # Data Access Object Interfaces & JDBC Implementations
│   ├── PatientDAO.java
│   ├── PatientDAOImpl.java
│   ├── AppointmentDAO.java
│   └── AppointmentDAOImpl.java
├── model/                  # Plain Old Java Objects (POJOs / Entity Beans)
│   ├── Patient.java
│   ├── Doctor.java
│   ├── Appointment.java
│   └── MedicalRecord.java
├── util/                   # Database Connection Manager (JDBC Utilities)
│   └── DBConnection.java
└── service/                # Business Logic & Validation Layer
    └── HospitalService.java
```

---

## Database Connection Utility (`DBConnection.java` Example Snippet)

```java
package com.hospitalpatientportal.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/hospital_db?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASSWORD = "your_mysql_password";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
```

---

## How to Build & Deploy

1. Clone the dedicated backend repository:
   ```bash
   git clone https://github.com/VaraPrasad-225/HospitalPatientPortal.git
   ```
2. Import the database schema from [`/sql/hospital_database.sql`](../sql/hospital_database.sql):
   ```bash
   mysql -u root -p < sql/hospital_database.sql
   ```
3. Build the project using Maven:
   ```bash
   mvn clean package
   ```
4. Deploy the generated `.war` file onto **Apache Tomcat** webapps directory and access `https://localhost:8443/HospitalPatientPortal`.
