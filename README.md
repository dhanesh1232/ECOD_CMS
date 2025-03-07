# ECOD_CMS

# EcoD Tech - Affiliate Programming, Wildlife Nature, and Online Marketing Services

Welcome to **EcoD Tech**, a web application that combines affiliate programming, wildlife nature content, and online marketing services. This project includes an admin panel for managing content and services, as well as a blog site for users to explore.

## Features

- **Admin Panel**: Manage blog posts, services, and affiliate programs.
- **Blog Site**: Publish wildlife nature content and affiliate marketing articles.
- **API Integration**: Seamless data flow between the admin panel and the main site.
- **Domain Setup**:
  - Admin Panel: `admin.ecodtech.com`
  - Blog Site: `ecodtech.com`

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React.js (or any framework of your choice)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (or any database of your choice)
- **API**: RESTful API for communication between admin panel and blog site
- **Hosting**: AWS, DigitalOcean, or any cloud provider

## Folder Structure

ecodtech/
├── admin-panel/ # Admin panel frontend and backend
│ ├── src/ # Frontend source code
│ ├── server/ # Backend server code
│ └── package.json # Dependencies for admin panel
├── blog-site/ # Blog site frontend and backend
│ ├── src/ # Frontend source code
│ ├── server/ # Backend server code
│ └── package.json # Dependencies for blog site
├── api/ # Shared API logic
│ ├── controllers/ # API controllers
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ └── config/ # Database and API configuration
├── shared/ # Shared components and utilities
├── README.md # Project documentation
└── .env # Environment variables

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB or any database installed
- Domain names configured (`admin.ecodtech.com` and `ecodtech.com`)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ecodtech.git
cd ecodtech
```

cd admin-panel
npm install

cd ../blog-site
npm install

# Database Configuration

DB_URI=mongodb://localhost:27017/ecodtech

# Admin Panel Domain

ADMIN_DOMAIN=admin.ecodtech.com

# Blog Site Domain

BLOG_DOMAIN=ecodtech.com

# API Keys and Secrets

API_SECRET=your_api_secret_key

# Start Admin Panel

cd admin-panel
npm start

# Start Blog Site

cd ../blog-site
npm start

---

## **Step-by-Step Guidance**

### 1. **Folder Structure**

- Create separate folders for the admin panel and blog site.
- Use a shared `api` folder to avoid code duplication.

### 2. **API Calls**

- Use RESTful APIs to manage data between the admin panel and blog site.
- Example: When a blog post is created in the admin panel, send a `POST` request to the API to save it in the database.

### 3. **Admin Panel to Blog Site Integration**

- Use a shared database to store blog posts, services, and affiliate programs.
- Implement real-time updates using WebSocket or polling.

### 4. **Domain Setup**

- Use a reverse proxy (Nginx or Apache) to route traffic to the correct application based on the domain.

### 5. **Build Like Shopify**

- Shopify uses a headless architecture where the admin panel and storefront are separate applications connected via APIs.
- Follow a similar approach by decoupling your admin panel and blog site.

---

This structure and guide should help you build your application step by step. Let me know if you need further assistance!
