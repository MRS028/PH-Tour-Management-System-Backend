# PH Tour Management Backend System

This is the backend API for the PH Tour Management System, built with Node.js, TypeScript, and Express. It provides RESTful endpoints for managing tours, users, authentication, and related resources.

## Features

- User authentication and authorization (JWT-based)
- Tour management (CRUD operations)
- Modular route and controller structure
- Centralized error handling
- Environment-based configuration
- File uploads (Cloudinary integration)
- Input validation and error helpers

## Project Structure

```
Backend-PH-Tour-Management-Syestem/
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server entry point
│   └── app/
│       ├── config/           # Configurations (env, cloudinary, multer, passport)
│       ├── constants.ts      # App-wide constants
│       ├── errorHelpers/     # Custom error classes and handlers
│       ├── helpers/          # Error handling utilities
│       ├── interfaces/       # TypeScript types and interfaces
│       ├── middlewares/      # Express middlewares
│       ├── modules/          # Feature modules (auth, tours, etc.)
│       ├── routes/           # Route definitions
│       └── utils/            # Utility functions
├── package.json
├── tsconfig.json
├── eslint.config.mjs
└── PH_TOUR_API.json          # API documentation (Postman/Swagger)
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd Backend-PH-Tour-Management-Syestem
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in required values (MongoDB URI, JWT secret, Cloudinary keys, etc.)

### Running the Server

```sh
npm run dev
# or
yarn dev
```

The server will start on the port specified in your `.env` file (default: 5000).

## Scripts

- `npm run dev` — Start server in development mode (with nodemon)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Start server in production mode

## API Documentation

- See `PH_TOUR_API.json` for Postman collection or Swagger docs.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
