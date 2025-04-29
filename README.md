# 📝 Blog Application (Full Stack: React + Node.js + MongoDB)

This is an ongoing full-stack blog project. The backend is built using **Node.js**, **Express**, and **MongoDB**, and the frontend is developed with **React.js**. The application allows users to register, log in, create blog posts, and comment on them. Admin functionality and post/image management are also in progress.

> **Note**: This project is still under development. New features and improvements are continuously being added.

---

##  Key Features

###  Authentication
- Secure **user registration and login**.
- **Google OAuth login/register integration**.
- JWT-based authentication system.
- Authorization middleware to protect routes.

###  Blog Posts
- Authenticated users can:
  - Create posts (with image uploads).
  - View all posts or a single post.
  - Edit their own posts.
  - Delete their own posts.
- Posts include:
  - Title, content, author, date, and image (optional).

###  Comments
- Users can comment on blog posts.
- Comments are linked to specific posts and users.
- In-progress: edit/delete functionality for comments.

###  Image Uploads
- Users can upload images for blog posts.
- Uses `Multer` for handling file uploads.
- Uploaded files are stored in the `uploads/` directory.

###  Frontend (React)
- Built with React.js and communicates with the backend via REST API.
- Core pages include:
  - Home page (displays all blog posts).
  - Post detail page.
  - Login and registration forms.
  - Post creation/editing forms.
- React hooks (e.g., `useState`, `useEffect`) and `axios` are used for API calls.
- Responsive UI still under design.

---

## Technologies Used

### Backend
- **Node.js** – JavaScript runtime environment.
- **Express.js** – Web framework for building RESTful APIs.
- **MongoDB** – NoSQL database for storing blog data.
- **Mongoose** – MongoDB ODM to model and manage schema.
- **JWT (jsonwebtoken)** – For authentication and secure user sessions.
- **Multer** – Middleware for handling image uploads.
- **dotenv** – For managing environment variables.

### Frontend
- **React.js** – JavaScript library for building the user interface.
- **Axios** – For HTTP requests to the backend API.
- **React Router DOM** – For navigation and routing.
- **Bootstrap / Custom CSS** – For responsive and clean UI.
- **React Hooks** – For managing component state and side effects.

---
---

##  Google OAuth Integration

This app supports login and registration through Google using OAuth 2.0.

### How it works:
- Users can click "Sign in with Google" on the frontend.
- They are redirected to Google’s OAuth page.
- After successful authentication, a JWT token is generated and returned.
- This token can then be used to authenticate API requests like a regular login.

### Backend:
- Uses `passport.js` and `passport-google-oauth20` strategy.
- On successful login, the user is either:
  - Registered (if new) and a token is issued.
  - Logged in (if already exists) and a token is issued.

### Frontend:
- Google sign-in is handled via the Google API (or with libraries like `react-google-login`).
- The token returned is stored in `localStorage` and used in API calls.


##  Authentication Flow (Backend)
- User registers via `/api/auth/register`.
- Login via `/api/auth/login` returns a JWT.
- JWT is stored in the frontend (usually in `localStorage`) and sent in the `Authorization` header for protected routes.
- Middleware checks token and allows/denies access.

---

##  Frontend-Backend Integration
- Frontend makes calls to the backend via axios.
- Each API call is routed to the Express backend and handled with appropriate logic and validation.
- Authentication token is included in headers for protected routes:

---

##  To Do / Upcoming Features
- [x] Register & Login functionality
- [x] Create, Edit, Delete Posts
- [x] Upload and Display Post Images
- [x] Add Comments
- [ ] Edit/Delete Comments
- [ ] User profile pages
- [ ] Like/Dislike blog posts
- [ ] Admin panel (approve/reject posts)
- [ ] Pagination and Search
- [ ] Better error handling and loading states
- [ ] UI/UX improvements on frontend

---

##  API Endpoints (Examples)

### Authentication
- `POST /api/auth/register` – Register new user.
- `POST /api/auth/login` – Authenticate and return JWT.

### Posts
- `GET /api/posts` – Get all blog posts.
- `GET /api/posts/:id` – Get single post.
- `POST /api/posts` – Create new post (requires auth).
- `PUT /api/posts/:id` – Update post (requires auth).
- `DELETE /api/posts/:id` – Delete post (requires auth).

### Comments
- `POST /api/posts/:id/comments` – Add comment to post.
- `DELETE /api/posts/:id/comments/:commentId` – Remove comment (WIP).

---


> Thank you for checking out my project! More features and enhancements are on the way. Stay tuned 🌱

