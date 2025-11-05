# HackMart – Backend

HackMart is a vulnerable web application created to help students understand and explore the common web vulnerabilities.

This repository contains the **Java + Spring Boot backend** of the HackMart project.

## ⚙️ Technologies Used

- Java 17+
- Spring Boot 3
- Spring Web
- Spring Data JPA
- MySQL
- Swagger/OpenAPI (`springdoc-openapi-ui`)

## 🚀 Getting Started

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/hackmart-backend.git
cd hackmart-backend
```

### 2. Create database via Docker.

a) Make sure a **Docker Engine** is installed **and running**  
&nbsp;&nbsp;• On **Windows**, the easiest option is to start **Docker Desktop** and wait until the whale icon is green (Linux containers mode).  
&nbsp;&nbsp;• On **Linux** or on a remote server, ensure the `docker` daemon is running.

b) From the root directory of the project, run:
```bash
docker compose -f dbInit/docker-compose.yml up -d --build
```

### 3. Install JDK 17

This project requires **JDK 17**.  
Download and install it from one of the official distributions:

* [Oracle JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
* [Adoptium Temurin 17](https://adoptium.net/temurin/releases/?version=17)

Make sure the `JAVA_HOME` environment variable points to the JDK 17 installation.  
You can verify it with:
```bash
java -version
```

### 4. Build and run the application

```bash
./mvnw spring-boot:run
# or if you have Maven:
mvn spring-boot:run
