#!/bin/bash

# AgentPay Virtual Card System - Quick Start Script
# This script sets up and runs the complete system

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  AgentPay SDK - Virtual Card System Quick Start            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from correct directory
if [ ! -d "flux" ] || [ ! -d "AgentPay-SDK" ]; then
    echo "❌ Error: Please run this script from the 'Flux overall' directory"
    echo "   Expected structure: flux/, AgentPay-SDK/, quorum-dashboard/"
    exit 1
fi

echo "${BLUE}📋 Step 1: Checking prerequisites...${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+"
    exit 1
fi
echo "✅ Python $(python3 --version)"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi
echo "✅ Node.js $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✅ npm $(npm --version)"

echo ""
echo "${BLUE}📦 Step 2: Installing backend dependencies...${NC}"
cd flux/flux-economy/backend

# Install Python packages
if [ ! -f "venv/bin/activate" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -q --upgrade pip
pip install -q flask flask-cors python-dotenv supabase requests dedalus-labs

echo "✅ Backend dependencies installed"

echo ""
echo "${BLUE}📦 Step 3: Installing frontend dependencies...${NC}"
cd ..
npm install --silent
echo "✅ Frontend dependencies installed"

echo ""
echo "${BLUE}📦 Step 4: Installing SDK dependencies...${NC}"
cd ../../AgentPay-SDK
pip install -q -e .
echo "✅ SDK installed in development mode"

echo ""
echo "${BLUE}⚙️  Step 5: Environment setup...${NC}"

# Check for .env file
cd ../flux/flux-economy/backend
if [ ! -f ".env" ]; then
    echo "${YELLOW}⚠️  No .env file found. Creating template...${NC}"
    cat > .env << EOF
# Database Configuration
USE_SUPABASE=false

# For Supabase (production)
# USE_SUPABASE=true
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_anon_key

# Flask Secret Key
SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')

# Dedalus API Key (for AI consensus)
# DEDALUS_API_KEY=your_dedalus_api_key
EOF
    echo "✅ Created .env file with template"
    echo "${YELLOW}⚠️  Please configure your environment variables in flux/flux-economy/backend/.env${NC}"
else
    echo "✅ .env file exists"
fi

# Initialize SQLite database if using local mode
if ! grep -q "USE_SUPABASE=true" .env 2>/dev/null; then
    echo "Using SQLite (local mode)..."
    
    # Create database directory if needed
    mkdir -p data
    
    # Initialize database if not exists
    if [ ! -f "economy.db" ]; then
        echo "Initializing SQLite database..."
        python3 << EOF
import sqlite3
import hashlib
from datetime import datetime

conn = sqlite3.connect('economy.db')
cursor = conn.cursor()

# Users table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    )
''')

# API Keys table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        key_name TEXT NOT NULL,
        key_hash TEXT NOT NULL,
        last_used_at TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
''')

# Agents table (basic structure)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS agents (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        display_name TEXT NOT NULL,
        type TEXT NOT NULL,
        balance INTEGER DEFAULT 0,
        hold INTEGER DEFAULT 0,
        total_spent INTEGER DEFAULT 0,
        total_earned INTEGER DEFAULT 0,
        transaction_count INTEGER DEFAULT 0,
        avg_transaction_size INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at TEXT NOT NULL
    )
''')

# Transactions table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        from_agent_id TEXT,
        from_agent_name TEXT,
        to_agent_id TEXT,
        to_agent_name TEXT,
        amount INTEGER NOT NULL,
        purpose TEXT NOT NULL,
        memo TEXT,
        status TEXT NOT NULL,
        consensus_required INTEGER DEFAULT 0,
        consensus_result TEXT,
        timestamp TEXT NOT NULL
    )
''')

# Create demo user (password: "welcome")
import uuid
user_id = str(uuid.uuid4())
password_hash = hashlib.sha256('welcome'.encode()).hexdigest()
now = datetime.now().isoformat() + 'Z'

cursor.execute('''
    INSERT OR IGNORE INTO users (id, username, password_hash, email, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
''', (user_id, 'demo', password_hash, 'demo@agentpay.com', now, now))

conn.commit()
conn.close()
print('✅ Database initialized with demo user')
EOF
        echo "✅ SQLite database created"
    else
        echo "✅ Database already exists"
    fi
fi

echo ""
echo "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    🚀 READY TO LAUNCH                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "To start the system, run these commands in separate terminals:"
echo ""
echo "${BLUE}Terminal 1 - Backend:${NC}"
echo "  cd flux/flux-economy/backend"
echo "  source venv/bin/activate"
echo "  python api.py"
echo ""
echo "${BLUE}Terminal 2 - Frontend:${NC}"
echo "  cd flux/flux-economy"
echo "  npm run dev"
echo ""
echo "${BLUE}Terminal 3 - Autonomous Agent Demo:${NC}"
echo "  cd AgentPay-SDK"
echo "  export AGENTPAY_API_KEY=\"your_api_key_here\""
echo "  python examples/autonomous_agent.py"
echo ""
echo "${YELLOW}📝 Quick Access:${NC}"
echo "  Dashboard:  http://localhost:3000"
echo "  API:        http://localhost:5001"
echo "  Login:      demo / welcome"
echo ""
echo "${YELLOW}📖 Next Steps:${NC}"
echo "  1. Start backend and frontend"
echo "  2. Login to dashboard (demo/welcome)"
echo "  3. Go to http://localhost:3000/api-keys"
echo "  4. Generate an API key"
echo "  5. Run the autonomous agent with your key"
echo ""
echo "For detailed instructions, see: IMPLEMENTATION_GUIDE.md"
echo ""
