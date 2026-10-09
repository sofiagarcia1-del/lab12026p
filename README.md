[![CI/CD Pipeline](https://github.com/sofiagarcia1-del/lab12026p/actions/workflows/build.yml/badge.svg)](https://github.com/sofiagarcia1-del/lab12026p/actions/workflows/build.yml)

# Banco - Lab 12026p

API REST de un banco: gestión de clientes, transferencias entre cuentas e histórico de transacciones.
Backend en Spring Boot con MySQL, desplegado con GitHub Actions, Docker y Render.

### Cómo ejecutarlo
    .\mvnw spring-boot:run

### Cómo correr los tests
    .\mvnw test

### Endpoints principales
- `GET /api/customers`: lista los clientes
- `GET /api/customers/{id}`: busca un cliente por id
- `POST /api/customers`: crea un cliente
- `POST /api/transactions`: hace una transferencia
- `GET /api/transactions/{cuenta}`: historial de una cuenta

### Despliegue  
Cada push a `main` ejecuta el pipeline: tests, análisis en SonarCloud, build del JAR,
imagen en Docker Hub y despliegue en Render.

API en la nube: https://lab12026p-latest-ng71.onrender.com/api/customers