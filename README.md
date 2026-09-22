# 🛒 HackMart

**HackMart** is a purposely vulnerable web application designed for educational purposes — to help students and beginner developers **understand, detect and exploit common web application vulnerabilities** in a safe local environment.

The project simulates a simple online store where each vulnerability can be discovered and exploited manually.  
It demonstrates both **frontend** and **backend** aspects of insecure web development.

---

## 🧩 Project Structure

```
hackmart/
├─ backend/      # Java + Spring Boot backend
├─ frontend/     # React + Vite + MUI frontend
├─ compose.yaml  # full environment definition (frontend + backend + MySQL + phpMyAdmin)
├─ nginx.conf    # frontend reverse proxy to backend
└─ README.md
```

---

## ⚙️ Technologies Used

### Frontend
- React (Vite)
- TypeScript
- Material UI (MUI)
- React Query

### Backend
- Java 17+
- Spring Boot 3
- Spring Data JPA
- Spring Web
- MySQL
- Swagger / OpenAPI

### Environment
- Docker & Docker Compose
- MySQL 8
- phpMyAdmin
- Nginx

---

## 🚀 Getting Started


### 1. Clone the repository
```bash
git clone https://github.com/PacekMikolaj/hackmart.git
cd hackmart
```

---

### 2. Build and run the entire environment

> 🧠 **Everything runs with one command.**  
> The command below builds the frontend and backend images, sets up the MySQL database and phpMyAdmin, and starts all containers.

```bash
docker compose up -d --build
```

Wait a moment until all containers start.  
You can verify status with:

```bash
docker compose ps
```

or view logs live:

```bash
docker compose logs -f
```

---

### 3. Access the application

| Service                         | URL                         | Description          |
| ------------------------------- | --------------------------- | -------------------- |
| 🛍️ Frontend (HackMart web app) | http://localhost:3000       | Main user interface  |
| ⚙️ Backend (API)               | http://localhost:7000/api   | Spring Boot REST API |
| 🗄️ phpMyAdmin                  | http://localhost:8080       | MySQL management GUI |
| 🐬 MySQL                        | localhost:3306              | user: admin / admin  |

---

### 4. Stop all containers

```bash
docker compose down -v
```

This stops and removes containers, networks, and volumes.

---

## 🧱 Build Details (for curiosity)

When you run `docker compose up --build`:
1. **Backend**  
   Uses a multi-stage Dockerfile: Maven builds the JAR, then the final image runs it with OpenJDK 17.
2. **Frontend**  
   Built inside a Node 20 image (Vite build), then served by Nginx.
3. **MySQL + phpMyAdmin**  
   Default MySQL 8 with educational credentials, accessible via phpMyAdmin on port `8080`.

---

## 🛠 Troubleshooting (common issues)

- **Port 3306 already in use**: Another local DB is probably running. Stop it or change the port mapping in `compose.yaml`.
- **Containers restarting**: Run `docker compose logs <service>` to check errors (e.g. DB connection, missing env vars, build errors).
- **Frontend shows blank page**: Check `docker compose logs web` and ensure Nginx serves `/index.html`; also ensure the backend is healthy so API calls don’t fail.
- **phpMyAdmin can't connect**: Verify MySQL container health and credentials. Use `docker compose exec mysql mysql -u root -p` to connect locally.

---

## 📘 License

This project was created for **educational and research** purposes as part of an engineering thesis.  
You may freely use it for learning and local experimentation.

---
