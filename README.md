# MERN Blog Platform

A full-stack blogging platform built using the MERN stack where users can create, edit, delete, and interact with blogs in a modern and responsive environment.

## Live Demo

* **Frontend:** https://mern-blog-platform-one.vercel.app
* **Backend:** Deployed on Render

---

## Features

* User Authentication (Signup/Login/Logout)
* JWT-based Authentication using HTTP-only Cookies
* Create, Edit, and Delete Blogs
* Upload Cover Images for Blogs
* Add and Delete Comments
* Search Blogs
* Responsive UI for Desktop and Mobile
* Protected Routes and Authorization
* Modern UI built with Tailwind CSS

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Multer

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

```bash
mern-blog-platform/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── package.json
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/Manthan-Bhegade7781/mern-blog-platform.git
cd mern-blog-platform
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file inside the Frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend server:

```bash
npm run dev
```

---

## Environment Variables

### Backend

```env
PORT
MONGO_URL
JWT_SECRET
CLIENT_URL
NODE_ENV
```

### Frontend

```env
VITE_API_URL
```

---

## Screenshots

<img width="948" height="413" alt="Screenshot 2026-06-22 231552" src="https://github.com/user-attachments/assets/6be07dc8-71f2-406a-9d76-9873c00f2d4d" />

---

<img width="948" height="418" alt="Screenshot 2026-06-22 231147" src="https://github.com/user-attachments/assets/77bd9896-b800-4568-8d1d-f9953f38eb02" />

---

## Author

**Manthan Bhegade**

* GitHub: https://github.com/Manthan-Bhegade7781
* LinkedIn: https://www.linkedin.com/in/manthanbhegade

---

⭐ If you found this project useful, please consider giving it a star.
