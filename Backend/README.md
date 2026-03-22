# Uber-Clone Backend Authentication

## Overview

This project is a basic Node.js/Express backend with user authentication (register / login / profile / logout) using JWT and token blacklist for logout invalidation.

### Key features implemented

- `POST /users/register` - user signup with validation and password hashing
- `POST /users/login` - login with email & password, returns JWT token + sets cookie
- `GET /users/profile` - protected route using auth middleware
- `GET /users/logout` - protected route that clears cookie and blacklists token

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

### Register
1. Validate `fullname.firstname`, `email`, and `password`
2. Hash password on model layer
3. Save user and generate JWT
4. Respond with `{ token, user }`

### Login
1. Validate `email`, `password`
2. Find user by email and include password with `.select('+password')`
3. Compare password using user method
4. Generate token, set cookie `token`, respond with `{ token,user }`

### Middleware
- `middlewares/auth.middleware.js` reads token from:
  - `req.cookies.token`
  - `Authorization: Bearer <token>` header
- Checks blacklist collection (`models/blacklistToken.model.js`)
- Verifies JWT and attaches `req.user`

### Logout
- `user.controller.logoutUser` clears cookie and stores token in blacklist
- Blacklist entries auto-expire after 24h via schema `expires` property

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
- For `logout`, token is read from cookies or Authorization header.
- If you get `Unauthorized` on protected routes, check cookie name `token` and JWT matches secret.

## Advanced future improvements
- Refresh tokens
- Proper sign-out cleanup from blacklist when token expires
- Role-based access control
- Rate limiting and security headers
