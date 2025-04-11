#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to handle errors
handle_error() {
  echo -e "${RED}Error: $1${NC}"
  exit 1
}

# Navigate to project directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR" || handle_error "Failed to navigate to script directory"

# Start backend
echo -e "${BLUE}Starting backend...${NC}"
cd backend || handle_error "Backend directory not found"
npx prisma migrate dev --name init || handle_error "Failed to run Prisma migrations"
echo -e "${GREEN}Starting backend server...${NC}"
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo -e "${BLUE}Waiting for backend to start...${NC}"
sleep 5

# Start frontend
echo -e "${BLUE}Starting frontend...${NC}"
cd ../frontend || handle_error "Frontend directory not found"
echo -e "${GREEN}Starting frontend server...${NC}"
npm start &
FRONTEND_PID=$!

# Handle exit
function cleanup {
  echo -e "${BLUE}Shutting down servers...${NC}"
  kill $BACKEND_PID $FRONTEND_PID
  exit 0
}

trap cleanup INT TERM

echo -e "${GREEN}Both servers are running. Press Ctrl+C to stop.${NC}"
wait