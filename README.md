# ArphaxTech — Docker Deployment

Full Docker setup for ArphaxTech. One command to run everything.

---

## Architecture

```
Internet
   │
   ▼
Nginx (port 80/443)
   ├── /api/*         → Django Backend (Gunicorn)
   ├── /django-admin  → Django Admin
   ├── /static/       → Static files
   ├── /media/        → Uploaded images
   └── /*             → React Frontend + Admin Dashboard
         └── /admin   → ArphaxTech Admin Dashboard
```

---

## Quick Start (Local)

```bash
# 1. Copy and fill environment variables
cp .env.example .env

# 2. Build and start everything
docker compose up --build

# 3. Open in browser
# Website:     http://localhost
# Admin:       http://localhost/admin
# API:         http://localhost/api
```

---

## Production Deployment (VPS)

### Step 1 — Install Docker on your server

```bash
# Ubuntu / Debian
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### Step 2 — Upload project to server

```bash
# From your PC (replace with your server IP)
scp -r arphaxtech_docker/ root@YOUR_SERVER_IP:/opt/arphaxtech
```

### Step 3 — Configure environment

```bash
cd /opt/arphaxtech
cp .env.example .env
nano .env   # Fill in your domain, passwords, Cloudinary keys
```

### Step 4 — Deploy

```bash
chmod +x deploy.sh
./deploy.sh
```

### Step 5 — Set up SSL (HTTPS) with Let's Encrypt

```bash
# Replace with your actual domain
docker compose run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  -d yourdomain.com -d www.yourdomain.com \
  --email your@email.com --agree-tos
```

---

## Useful Commands

```bash
# View live logs
docker compose logs -f

# View logs for one service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx

# Restart a service
docker compose restart backend

# Stop everything
docker compose down

# Stop and delete all data (careful!)
docker compose down -v

# Run Django management commands
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py shell

# Access database
docker compose exec db psql -U arphaxtech
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `SECRET_KEY` | Django secret key | Long random string |
| `DEBUG` | Debug mode | `False` in production |
| `ALLOWED_HOSTS` | Allowed domains | `arphaxtech.co.ke,www.arphaxtech.co.ke` |
| `POSTGRES_DB` | Database name | `arphaxtech` |
| `POSTGRES_USER` | Database user | `arphaxtech` |
| `POSTGRES_PASSWORD` | Database password | Strong password |
| `CORS_ALLOWED_ORIGINS` | Frontend URLs | `https://arphaxtech.co.ke` |
| `VITE_API_URL` | API URL for frontend | `/api` (same server) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary name | From cloudinary.com |
| `CLOUDINARY_API_KEY` | Cloudinary key | From cloudinary.com |
| `CLOUDINARY_API_SECRET` | Cloudinary secret | From cloudinary.com |

---

## Default Admin Credentials

```
Username: admin
Password: ArphaxTech2025!
```

**Change this immediately after first login.**

