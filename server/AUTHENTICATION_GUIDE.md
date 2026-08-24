# User Authentication System Documentation

## Overview
A complete JWT-based authentication system has been implemented for the Design Journal application. The system includes user registration, login, protected routes, and role-based access control.

## Features Implemented

### 1. User Model with Password Hashing
- **File**: `models/User.js`
- **Features**:
  - Password hashing using bcryptjs
  - Email validation
  - User roles (user/admin)
  - Account activation status
  - Password comparison method

### 2. Authentication Routes
- **File**: `routes/auth.js`
- **Endpoints**:
  - `POST /api/auth/register` - Register new user
  - `POST /api/auth/login` - Login user
  - `POST /api/auth/logout` - Logout user (protected)
  - `GET /api/auth/me` - Get current user (protected)
  - `PUT /api/auth/update-password` - Update password (protected)

### 3. JWT Middleware
- **File**: `middleware/auth.js`
- **Functions**:
  - `protect` - Requires authentication for routes
  - `authorize` - Role-based access control
  - `optionalAuth` - Optional authentication

### 4. Protected Post Routes
- **File**: `routes/posts.js`
- **Changes**:
  - POST /api/posts - Requires authentication
  - PUT /api/posts/:id - Requires authentication (author or admin)
  - DELETE /api/posts/:id - Requires authentication (author or admin)
  - GET routes remain public

### 5. Authentication Utilities
- **File**: `utils/auth.js`
- **Functions**:
  - `generateToken` - Generate JWT tokens
  - `verifyToken` - Verify JWT tokens
  - `extractToken` - Extract token from request
  - `sendTokenResponse` - Send token response with cookies

## Default Admin User

The system includes a seed script that creates a default admin user:

**Credentials**:
- Email: `admin@designjournal.com`
- Password: `Admin123!`
- Role: `admin`

**⚠️ Important**: Change this password after first login!

## Usage Examples

### 1. Register a New User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 3. Access Protected Routes
```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Create a Post (Protected)
```bash
POST /api/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "My New Post",
  "slug": "my-new-post",
  "content": "Post content here",
  "category": "Tutorial",
  "excerpt": "Brief excerpt",
  "tags": ["design", "tutorial"]
}
```

## Client-Side Integration

### Store Token
After successful login/registration, store the JWT token:

```javascript
// After login
localStorage.setItem('token', response.token);
// or sessionStorage.setItem('token', response.token);
```

### Include Token in Requests
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(postData)
});
```

### Logout
```javascript
localStorage.removeItem('token');
// Redirect to login page
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs before storage
2. **JWT Tokens**: Secure token-based authentication with expiration
3. **Protected Routes**: Sensitive routes require valid authentication
4. **Role-Based Access**: Admin users have elevated permissions
5. **Account Status**: Inactive accounts cannot authenticate
6. **Input Validation**: All inputs are validated before processing

## Environment Variables

Add these to your `.env` file:

```env
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
```

## Testing

The authentication system has been tested with the following scenarios:

✅ User registration
✅ User login  
✅ Protected route access with valid token
✅ Protected route rejection without token
✅ Post creation with authentication
✅ Post creation rejection without authentication
✅ Admin user creation via seed script

## Next Steps for Client Integration

1. **Create Login/Register Components**: Build React components for user authentication
2. **Token Management**: Implement token storage and retrieval in the client
3. **Protected Routes**: Create React Router protected routes
4. **Auth Context**: Implement React Context for global auth state
5. **API Integration**: Update axios configuration to include auth headers

## Troubleshooting

### Common Issues

1. **"Not authorized to access this route"**
   - Ensure you're including the JWT token in the Authorization header
   - Check that the token hasn't expired
   - Verify the token format: `Bearer <token>`

2. **"Token is invalid or expired"**
   - The token may have expired (default 7 days)
   - The JWT_SECRET might have changed
   - User needs to login again to get a fresh token

3. **"User not found with this token"**
   - The user ID in the token no longer exists in the database
   - User account may have been deleted

4. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check your connection string in .env
   - Verify IP whitelist if using MongoDB Atlas

## Server Commands

```bash
# Start development server
npm run dev

# Seed admin user
npm run seed

# Start production server
npm start
```

## File Structure

```
server/
├── models/
│   ├── User.js          # User model with password hashing
│   └── Post.js          # Post model (updated with author field)
├── routes/
│   ├── auth.js          # Authentication routes
│   └── posts.js         # Protected post routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── utils/
│   └── auth.js          # Authentication utility functions
├── seed.js              # Admin user seed script
├── server.js            # Main server file
└── .env                 # Environment variables
```

## Security Best Practices

1. **Change JWT_SECRET**: Use a strong, random secret in production
2. **HTTPS**: Always use HTTPS in production to protect tokens
3. **Token Storage**: Consider using httpOnly cookies for enhanced security
4. **Password Requirements**: Implement strong password requirements
5. **Rate Limiting**: Add rate limiting to prevent brute force attacks
6. **Token Expiration**: Set appropriate token expiration times
7. **Input Validation**: Validate all user inputs on both client and server

## Support

For issues or questions about the authentication system, refer to:
- JWT documentation: https://jwt.io/
- bcryptjs documentation: https://github.com/dcodeIO/bcrypt.js
- Express middleware patterns: https://expressjs.com/en/guide/writing-middleware.html