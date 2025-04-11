# Frontend for Full-Stack Intern Assignment

This is a React-based frontend with TypeScript for the Full-Stack Intern Assignment.

## Tech Stack

- React 18
- TypeScript
- React Router for navigation
- React Query for data fetching
- React Hook Form with Zod for form validation
- Axios for API communication

## Project Structure

- `/src`: Source code
  - `/components`: UI and layout components
    - `/ui`: Basic UI components like Button, TextField, etc.
    - `/layout`: Layout components like Navbar
  - `/context`: React context (Auth context for user authentication)
  - `/pages`: Page components
  - `/schemas`: Zod validation schemas
  - `/api`: API hooks and utilities
  - `/hooks`: Custom React hooks
  - `/utils`: Utility functions

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm start
   ```

## Features

- User registration and login with form validation
- JWT-based authentication
- Protected routes for authenticated users
- Profile page showing user details

## Error Handling

The frontend implements error handling for form validations and API errors, providing a user-friendly experience.

