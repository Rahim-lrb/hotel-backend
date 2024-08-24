# Backend hotel Project

Welcome to the backend repository of our hotel project! This repository contains the server-side code for our hotel platform.


## Demo

Explore the project live [here]()!


## Features

- **User Authentication**: Secure user authentication system to register, login, and manage user accounts.
- **room Management**: Create, read, update, and delete posts.
- **Search Functionality**: Implement search functionality to find users and posts.


## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Multer for handling file uploads (for profile pictures, post images, etc.)
- Cloudinary for storing and serving images


## API Endpoints

- `/api/auth`: Authentication endpoints (register, login, logout)
- `/api/users`: User endpoints (get user profile)
- `/api/rooms`: Post endpoints (create, read, update, delete posts)


## Getting Started

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up environment variables (e.g., MongoDB URI, JWT secret key, Cloudinary credentials).
4. Run the server using `npm start`.
