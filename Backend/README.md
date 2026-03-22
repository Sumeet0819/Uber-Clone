# Uber-Clone Backend Authentication

## Overview

This project is a Node.js/Express backend with authentication for both users and captains (drivers) in an Uber-like ride-sharing application. Features JWT authentication with token blacklist for secure logout.

### Key features implemented

#### User Authentication
- `POST /users/register` - user signup with validation and password hashing
- `POST /users/login` - login with email & password, returns JWT token + sets cookie
- `GET /users/profile` - protected route using auth middleware
- `GET /users/logout` - protected route that clears cookie and blacklists token

#### Captain (Driver) Authentication
- `POST /captains/register` - captain signup with vehicle details and validation
- `POST /captains/login` - captain login with email & password
- `GET /captains/profile` - protected route for captain profile access
- `GET /captains/logout` - protected route that clears cookie and blacklists token

## Tech stack

- Node.js
- Express
- MongoDB + Mongoose
- bcrypt (password hashing)
- jsonwebtoken (JWT)
- express-validator (request validation)
- cookie-parser (cookie support)
- cors

## Auth flow details

### User Registration
1. Validate `fullname.firstname`, `email`, and `password`
2. Hash password on model layer
3. Save user and generate JWT
4. Respond with `{ token, user }`

### Captain Registration
1. Validate `fullname.firstname`, `fullname.lastname`, `email`, `password`, and `vehicle` details
2. Vehicle validation includes: `color`, `plate`, `capacity`, `vehicleType` (car/motorcycle/auto)
3. Hash password on model layer
4. Save captain with vehicle information and generate JWT
5. Respond with `{ token, captain }`

### Login (Both User & Captain)
1. Validate `email`, `password`
2. Find user/captain by email and include password with `.select('+password')`
3. Compare password using model method
4. Generate token, set cookie `token`, respond with `{ token, user/captain }`

### Middleware
- `middlewares/auth.middleware.js` provides two middlewares:
  - `authUser` - for user routes, attaches `req.user`
  - `authCaptain` - for captain routes, attaches `req.captain`
- Both read token from:
  - `req.cookies.token`
  - `Authorization: Bearer <token>` header
- Checks blacklist collection (`models/blacklistToken.model.js`)
- Verifies JWT and attaches user/captain to request

### Logout (Both User & Captain)
- Clears cookie and stores token in blacklist
- Blacklist entries auto-expire after 24h via schema `expires` property

## Data Models

### User Model (`models/user.model.js`)
- `fullname` (object with `firstname`, `lastname`)
- `email` (unique)
- `password` (hashed, not selected by default)
- Methods: `generateAuthToken()`, `ComparePassword()`, static `hashPassword()`

### Captain Model (`models/caption.model.js`)
- `fullname` (object with `firstname`, `lastname`)
- `email` (unique)
- `password` (hashed, not selected by default)
- `vehicle` (object with `color`, `plate`, `capacity`, `vehicleType`)
- `socketId` (for real-time features)
- `status` (active/inactive, default: inactive)
- `location` (optional latitude/longitude)
- Methods: `generateAuthToken()`, `ComparePassword()`, static `hashPassword()`

## API Endpoints

### User Routes (`/users`)
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile (protected)
- `GET /users/logout` - Logout user (protected)

### Captain Routes (`/captains`)
- `POST /captains/register` - Register new captain with vehicle details
- `POST /captains/login` - Captain login
- `GET /captains/profile` - Get captain profile (protected)
- `GET /captains/logout` - Logout captain (protected)

## Setup

1. Copy `.env.example` to `.env` and set:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` (optional)
2. Install dependencies:
   ```bash
   cd Backend
   npm install
   ```
3. Run:
   ```bash
   npm run dev
   ```

## Notes/Troubleshooting
- In `app.js`, ensure `app.use(cookieParser())` is registered before routes.
- For logout, token is read from cookies or Authorization header.
- If you get `Unauthorized` on protected routes, check cookie name `token` and JWT matches secret.
- Captain routes use `authCaptain` middleware while user routes use `authUser` middleware.
- Captain registration requires vehicle details: color, plate (unique), capacity, and vehicleType.
- Vehicle types are restricted to: "car", "motorcycle", "auto".
- Captain model includes additional fields like `socketId`, `status`, and `location` for ride-sharing features.

## Testing with Postman
- Sample request bodies are available in `captain-demo.json` in the root directory.
- Import the Postman collection from `captain-demo.json` for easy testing.
- Set the `base_url` environment variable to your server URL (default: `http://localhost:3000`).

## Advanced future improvements
- Refresh tokens
- Proper sign-out cleanup from blacklist when token expires
- Role-based access control
- Rate limiting and security headers
- Captain status management (online/offline)
- Real-time location updates using socketId
- Ride booking and matching system
- Payment integration
- Captain earnings and rating system
