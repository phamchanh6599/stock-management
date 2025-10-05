# Directus API Gateway (Functional Approach)

A Backend For Frontend (BFF) API Gateway built with Node.js, Express, and TypeScript using functional programming patterns to abstract and enhance Directus CMS functionality.

## Features

- 🔐 **Authentication**: User sign-up, sign-in with Directus
- 🛡️ **Security**: Helmet, CORS, rate limiting, JWT authentication
- 📦 **Product Management**: Proxy endpoints for product data
- 🛒 **Advanced Checkout**: Stock validation with atomic checks
- ✅ **Validation**: Request validation using Zod
- 🎯 **Functional Design**: Pure functions, no classes
- 📝 **TypeScript**: Full type safety
- 🚀 **Production Ready**: Error handling, logging, and best practices

## Prerequisites

- Node.js >= 18.x
- Directus instance (running locally or remote)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Directus credentials

## Development

Run in development mode with hot reload:
```bash
npm run dev
```

## Build & Production

Build the project:
```bash
npm run build
```

Run in production:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/signin` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token

### Products (Public)
- `GET /api/v1/products` - Get all in-stock products
- `GET /api/v1/products/:id` - Get product by ID

### Checkout (Protected - Requires JWT)
- `POST /api/v1/checkout` - Process checkout with stock validation
- `POST /api/v1/checkout/stock-check` - Check stock availability

## Example Requests

### Sign Up
```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","first_name":"John","last_name":"Doe"}'
```

### Sign In
```bash
curl -X POST http://localhost:5000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/v1/products
```

### Checkout (with JWT)
```bash
curl -X POST http://localhost:5000/api/v1/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"items":[{"product_id":"product-id-1","quantity":2},{"product_id":"product-id-2","quantity":1}]}'
```

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers (pure functions)
├── services/        # Business logic (pure functions)
├── middleware/      # Express middleware
├── routes/          # Route definitions
├── types/           # TypeScript interfaces
├── utils/           # Utility functions
└── server.ts        # Application entry point
```

## Functional Programming Approach

This codebase follows functional programming principles:

- ✅ Pure functions without side effects
- ✅ No classes, only functions and modules
- ✅ Immutable data structures
- ✅ Composable and testable code
- ✅ Clear separation of concerns
- ✅ Declarative over imperative

## Best Practices Implemented

- ✅ TypeScript for type safety
- ✅ Functional programming patterns
- ✅ Environment-based configuration
- ✅ Comprehensive error handling
- ✅ Request validation with Zod
- ✅ Security headers with Helmet
- ✅ Rate limiting
- ✅ Async/await with proper error handling
- ✅ Centralized error handling middleware
- ✅ Standardized API responses
- ✅ JWT authentication
- ✅ Business logic in services, not controllers

## License

MIT