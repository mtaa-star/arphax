# ArphaxTech — Django Backend

REST API powering the ArphaxTech website and admin dashboard.

---

## Tech Stack
- **Django 6** + Django REST Framework
- **PostgreSQL** (SQLite for local dev)
- **Cloudinary** for image storage
- **Token Authentication**

---

## Quick Start (Local)

```bash
cd arphaxtech_backend
pip install -r requirements.txt
cp .env.example .env          # fill in your values
python manage.py migrate
python manage.py seed_data    # optional: loads sample data
python manage.py runserver
```

API runs at: `http://localhost:8000/api/`

Default admin: `admin` / `ArphaxTech2025!`

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login/` | Public | Admin login → returns token |
| POST | `/api/auth/logout/` | Admin | Invalidate token |
| GET | `/api/dashboard/` | Admin | Stats for dashboard |
| GET/POST | `/api/products/` | Public/Admin | List or create products |
| GET | `/api/products/?category=laptops` | Public | Filter by category slug |
| GET | `/api/products/?search=hp` | Public | Search products |
| GET | `/api/products/featured/` | Public | Featured products only |
| GET/PATCH/DELETE | `/api/products/{id}/` | Admin | Product detail |
| GET/POST | `/api/categories/` | Public/Admin | Categories |
| GET/POST | `/api/blog/` | Public/Admin | Blog posts |
| POST | `/api/blog/{slug}/publish/` | Admin | Toggle publish status |
| GET/POST | `/api/bookings/` | Public/Admin | Repair bookings |
| PATCH | `/api/bookings/{id}/update_status/` | Admin | Update booking status |
| GET/POST | `/api/messages/` | Public/Admin | Contact messages |
| PATCH | `/api/messages/{id}/mark_read/` | Admin | Mark message as read |

---

## Environment Variables (.env)

```
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://user:pass@localhost/arphaxtech
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend.onrender.com
ALLOWED_HOSTS=localhost,your-backend.onrender.com
```

---

## Deployment on Render

1. Push to GitHub
2. Create a **Web Service** on render.com
3. Build Command: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
4. Start Command: `gunicorn arphaxtech_backend.wsgi:application`
5. Add all env vars from above
6. Add a PostgreSQL database (Render provides free tier)
