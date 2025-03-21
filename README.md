# Service-Based Website

## Overview
This is a service-based website built using **Next.js**, **Tailwind CSS**, and **MongoDB**. The platform offers web development, digital marketing, and Shopify solutions. It consists of two main sections:
- **Main Site** (Client-Facing)
- **Admin Panel** (Management Dashboard)

## Features
### Main Site (Client-Facing)
- **Landing Page:** Displays services, client testimonials (fake reviews), and an attractive UI.
- **Service Pages:** Detailed descriptions of web development, digital marketing, and Shopify solutions.
- **Contact Form:** Clients can submit inquiries directly.
- **Blog Section:** Fetches JSON data from MongoDB on initial load.
- **Dark/Light Theme Support:** Users can toggle between themes.

### Admin Panel
- **Dashboard:** Overview of website analytics.
- **Content Management:** Add, update, or delete services, blog posts, and fake reviews.
- **Theme Settings:** Customize website appearance with a dynamic theme settings page.
- **User Management:** Admin authentication and role-based access.

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS, React Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** NextAuth or JWT
- **Deployment:** Vercel for frontend, DigitalOcean/Render for backend

## Installation & Setup
### Prerequisites
- Node.js installed
- MongoDB instance (local or cloud)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/service-website.git
   cd service-website
   ```
2. **Install dependencies**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. **Environment Variables**
   Create a `.env` file in both `client` and `server` directories and configure:
   ```env
   MONGO_URI=your_mongodb_connection_string
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```
4. **Run the development servers**
   ```bash
   # Start backend
   cd server
   npm run dev
   
   # Start frontend
   cd ../client
   npm run dev
   ```

## API Endpoints
| Method | Endpoint          | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/api/services`   | Fetch all services               |
| POST   | `/api/services`   | Add a new service (Admin only)   |
| GET    | `/api/blogs`      | Fetch all blog posts             |
| POST   | `/api/blogs`      | Add a new blog post (Admin only) |
| GET    | `/api/reviews`    | Fetch client reviews             |

## Deployment
- **Frontend:** Deploy on Vercel
- **Backend:** Deploy on DigitalOcean, Render, or AWS
- **Database:** Use MongoDB Atlas for production

## Future Enhancements
- Add payment gateway integration.
- Implement a customer dashboard.
- Improve SEO and performance optimization.

## License
This project is licensed under the MIT License.

