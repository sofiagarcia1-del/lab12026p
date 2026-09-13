# Frontend Banco2025

Frontend en React + Vite para el Laboratorio 1 (Arquitectura de Software).
Consume el backend Spring Boot del repo `lab12026p` (paquete `com.udea.lab12026p`).

## Vistas incluidas

1. **Clientes** — lista todos los clientes y permite crear uno nuevo (`GET/POST /api/customers`).
2. **Transferencia** — transfiere dinero entre dos cuentas (`POST /api/transactions`).
3. **Historial** — consulta el histórico de transacciones de una cuenta (`GET /api/transactions/{accountNumber}`).

## Pasos

1. Copia la carpeta `config/` dentro de `src/main/java/com/udea/lab12026p/` de tu backend
   (incluye `CorsConfig.java`, necesario para que el navegador pueda llamar a `localhost:8080`
   desde `localhost:5173`).
2. Levanta el backend: `./mvnw spring-boot:run` (puerto 8080).
3. Instala dependencias del frontend:
   ```
   npm install
   ```
4. Ejecuta el frontend:
   ```
   npm run dev
   ```
5. Abre `http://localhost:5173`.

## Notas

- Si cambias el puerto o el dominio del frontend, actualiza `allowedOrigins` en `CorsConfig.java`.
- La URL base del backend está en `src/api.js` (`http://localhost:8080/api`).
- Los endpoints de actualizar/borrar cliente son opcionales según el enunciado; no están implementados
  aún en el backend, así que no se agregaron al frontend. Si los agregas al `CustomerController`,
  puedes extender `ClientesView.jsx` con botones de editar/borrar.
