# Full-Stack E-Commerce Platform

**[Click here to visit the live demo](https://sudama-website.vercel.app)**

A complete, full-stack e-commerce platform built to handle complex business logic, secure user authentication, and relational data modeling. This project demonstrates a deep understanding of RESTful API architecture.

_Note: Since the backend is currently running on free tier of render, it takes time for server to start so bear on for now. It will be fixed soon._

## Features

- **Secure Authentication:** JSON Web Tokens (JWT) for sessions and bcrypt for password hashing to enable secure user registration, login, and protected routes.
- **Complex Data Modeling:** Efficiently structured NoSQL database schema using MongoDB and Mongoose to manage relationships between Users, Products, and Order History.
- **Stateful Shopping Cart:** Robust backend logic to handle cart calculations, inventory checks, and checkout flows.
- **RESTful Architecture:** Clean, predictable API endpoints designed for scalability and easy frontend integration.
- **MVC File Structure:** Codebase strictly adheres to MVC principles, ensuring logic, routing, and database interactions are modular and easy to maintain.
- **Google Login Enabled:** Users can easily create a new account or login to their existing ones using google id's, this removes the hassle to remember credentials

## 💻 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Security:** JWT (JSON Web Tokens), Bcrpyt

## ⚙️ Local Installation & Setup

**1. Clone the repository**

```zsh
git clone https://github.com/diadeor/SudamaWebsite.git
cd SudamaWebsite
```

\*\*2. Setup Backend

```zsh
cd backend
npm install
npm start
```

Create a **.env** file in the root of your backend directory and add these environment variables:

```
PORT
DB_URI
JWT_SECRET
JWT_EXPIRE
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

**3. Setup Frontend**

```zsh
cd ../frontend
npm install
```

Create a **.env** file in the root of your frontend directory which contains **"VITE_API_URL"** variable which should be the url for your backend

**4. Start Frontend**

```zsh
npm start
```

## 🗺️ Core API Endpoints

_Note: This is a curated list of the primary routes. The full API contains ~30 endpoints handling admin controls, carts, orders, and advanced filtering._

### Authentication & Users

| HTTP Method | Endpoint             | Description                           | Auth Required |
| :---------- | :------------------- | :------------------------------------ | :------------ |
| `POST`      | `/api/auth/register` | Register a new user and hash password | No            |
| `POST`      | `/api/auth/login`    | Authenticate user and return JWT      | No            |
| `POST`      | `/api/auth/google`   | Validates a user using google account | Yes           |

### Products & Inventory

| HTTP Method | Endpoint               | Description                                     | Auth Required |
| :---------- | :--------------------- | :---------------------------------------------- | :------------ |
| `GET`       | `/api/products`        | Fetch all products (supports pagination/search) | No            |
| `GET`       | `/api/products/:id`    | Fetch details for a single product              | No            |
| `POST`      | `/api/products/create` | Create a new product                            | Yes (Admin)   |

### Cart & Orders

| HTTP Method | Endpoint             | Description                                   | Auth Required  |
| :---------- | :------------------- | :-------------------------------------------- | :------------- |
| `POST`      | `/api/carts/add`     | Add an item to the active cart                | Yes            |
| `GET`       | `/api/carts/`        | Fetches carts for all users                   | Yes<br>(Admin) |
| `GET`       | `/api/orders/`       | Fetches order history <br>for all users       | Yes<br>(Admin) |
| `GET`       | `/api/orders/me`     | Fetches order history <br>for a specific user | Yes            |
| `POST`      | `/api/orders/create` | Creates a new order                           | Yes            |

## 🧠 Architecture & Practical Application

This platform was developed to solve a real-world business need for a local plant store, providing them with a reliable and easily manageable online storefront. Rather than over-engineering the backend, the architecture strictly prioritizes stability, maintainability, and data accuracy.
