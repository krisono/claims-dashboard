#!/bin/bash

echo "🏪 Walmart Claims Dashboard Setup"
echo "================================="

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "✅ Docker found, starting PostgreSQL..."
    docker compose up -d
else
    echo "⚠️  Docker not found. Please install Docker or use a local PostgreSQL instance."
    echo ""
    echo "Manual PostgreSQL setup:"
    echo "1. Install PostgreSQL"
    echo "2. Create database: claims_db"
    echo "3. Create user: claims_user with password: claims_password"
    echo "4. Grant privileges to claims_user on claims_db"
    echo ""
fi

echo ""
echo "🔧 Starting Backend (Spring Boot)..."
echo "Navigate to backend directory and run:"
echo "  cd backend"
echo "  mvn spring-boot:run"
echo ""

echo "🎨 Starting Frontend (React)..."
echo "Navigate to client directory and run:"
echo "  cd client"
echo "  npm run dev"
echo ""

echo "🌐 Access Points:"
echo "  Dashboard: http://localhost:5173"
echo "  API: http://localhost:8080/api"
echo "  Database: localhost:5432"
echo ""

echo "📊 Features:"
echo "  ✨ Real-time WebSocket updates"
echo "  📈 Interactive Recharts visualizations"
echo "  🏢 Walmart-style supply chain simulation"
echo "  💾 PostgreSQL with proper relationships"
echo "  🎯 Event-driven architecture"
