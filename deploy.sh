#!/bin/bash
# ArphaxTech — One-command deployment script
set -e

echo "======================================"
echo "  ArphaxTech Deployment Script"
echo "======================================"

# Check .env exists
if [ ! -f .env ]; then
  echo "ERROR: .env file not found!"
  echo "Run: cp .env.example .env  then fill in your values"
  exit 1
fi

echo ""
echo "1. Pulling latest changes..."
git pull 2>/dev/null || echo "  (No git repo, skipping)"

echo "2. Building Docker images..."
docker compose build --no-cache

echo "3. Stopping old containers..."
docker compose down

echo "4. Starting all services..."
docker compose up -d

echo "5. Running database migrations..."
docker compose exec backend python manage.py migrate

echo "6. Creating admin user (if not exists)..."
docker compose exec backend python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@arphaxtech.com', 'ArphaxTech2025!')
    print('Admin user created: admin / ArphaxTech2025!')
else:
    print('Admin user already exists')
"

echo ""
echo "======================================"
echo "  Deployment Complete!"
echo "======================================"
echo ""
echo "  Website:       http://your-server-ip"
echo "  Admin Panel:   http://your-server-ip/admin"
echo "  Django Admin:  http://your-server-ip/django-admin"
echo "  API:           http://your-server-ip/api"
echo ""
echo "  View logs: docker compose logs -f"
echo "======================================"
