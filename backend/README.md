# Backend for Full-Stack Intern Assignment

This is a Node.js backend with TypeScript, Express, and Prisma.

## Tech Stack

- Node.js & Express
- TypeScript
- Prisma ORM
- SQLite Database
- JWT Authentication
- Bcrypt for password hashing

## Project Structure

- `/src`: Source code
  - `/controllers`: Business logic for endpoints
  - `/routes`: API route definitions
  - `/middleware`: Express middleware functions
  - `/utils`: Utility functions
- `/prisma`: Prisma schema and migrations

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   Copy the `.env.example` file to `.env` and update the values.

3. Set up the database:
   ```
   npx prisma migrate dev --name init
   ```

4. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

- POST `/api/users/register`: Register a new user
- POST `/api/users/login`: Login a user
- GET `/api/users/profile`: Get user profile (requires authentication)

## Error Handling

The backend implements custom error handling through the `AppError` class and `errorHandler` middleware to provide consistent error responses.

