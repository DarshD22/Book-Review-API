
# 📚 Book Review RESTful API

A RESTful API built using **Node.js**, **Express.js**, **MongoDB**, and **JWT** for managing users, books, and reviews.

---

## 🚀 Features

- JWT-based user authentication
- CRUD operations for books and reviews
- Pagination and filtering support
- Book search by title or author (case-insensitive)
- One review per user per book
- Clean MVC structure

---

## 🛠 Project Setup

### 1. Clone the repo
```bash
git clone https://github.com/DarshD22/Book-Review-API
cd Book-Review-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookdb
JWT_SECRET=your_jwt_secret_key
```

Replace with your actual MongoDB URI and secret.

---

## ▶️ Running the Server Locally

```bash
node server.js
```

Open [http://localhost:5000](http://localhost:5000)

---

## 📬 Example API Requests

### 🔐 Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username":"john","email":"john@example.com","password":"123456"}'
```

### 🔐 Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"john@example.com","password":"123456"}'
```

### 📚 Add Book (Auth Required)

```bash
curl -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"title":"1984","author":"George Orwell","genre":"Dystopian"}'
```

### 📖 Get All Books

```bash
curl http://localhost:5000/api/books?page=1&limit=10&author=Orwell
```

### 🔍 Search Books

```bash
curl http://localhost:5000/api/books/search?query=orwell
```

### ⭐ Submit Review (Auth Required)

```bash
curl -X POST http://localhost:5000/api/books/<BOOK_ID>/reviews \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"rating":5,"comment":"Fantastic read!"}'
```

---

## 🧠 Design Decisions / Assumptions

* JWT used for stateless authentication.
* A user can only review a book once.
* Reviews are paginated per book.
* Filtering and searching is done using MongoDB queries (title/author).
* Mongoose used as ODM to simplify schema definition.

---

## 🧾 Database Schema

### 🧍 User

```js
{
  username: String,
  email: String,
  password: String (hashed)
}
```

### 📖 Book

```js
{
  title: String,
  author: String,
  genre: String,
  createdBy: ObjectId (ref User)
}
```

### ✍️ Review

```js
{
  book: ObjectId (ref Book),
  user: ObjectId (ref User),
  rating: Number,
  comment: String
}
```

---

## 📮 Postman Collection

Download and import this collection in Postman to test all endpoints:
📦 [BookReviewAPI.postman\_collection.json](./BookReviewAPI.postman_collection.json)


---

```
