Here's a comprehensive `README.md` file for your project with a clean structure and clear separation between the admin panel and blog site:

```markdown
# Digital Marketing Services Platform

![Project Banner](https://via.placeholder.com/1200x400) <!-- Add your banner image here -->

A full-featured platform offering digital marketing services including ad management, graphic design, content creation, and web development. Built with Next.js and Tailwind CSS.

## ✨ Features

### Admin Panel

- 📊 Dashboard for managing all services
- ✏️ Blog post creation and management
- 🖼️ Media upload for graphics and logos
- 📧 Email campaign management
- 🔐 User authentication and role management

### Blog Site (Main UI)

- 🌟 Service showcase pages
- 📝 Blog with category filtering
- 🔍 SEO-optimized content
- 📱 Fully responsive design
- ✉️ Contact forms for service inquiries

#Daily run commands

# Start containers (detached mode)

docker-compose up -d

# Stop containers

docker-compose down

# View logs

docker logs -f nextjs-app

# Rebuild images

docker-compose build

# SSH into container

docker exec -it nextjs-app sh

## Free Space weekly run

docker-compose up -d

# Clean unused containers/images

docker system prune -f

# View disk usage

docker system df

## 🛠 Tech Stack

**Frontend:**

- Next.js 14 (App Router)
- Tailwind CSS
- React Hook Form
- Framer Motion (for animations)

**Backend:**

- Node.js (API routes)
- MongoDB (Database)
- NextAuth.js (Authentication)

**Deployment:**

- Vercel (for frontend)
- MongoDB Atlas (for database)

## 📁 Project Structure
```

digital-services-platform/
├── admin-panel/ # Admin application
│ ├── app/ # Next.js app router
│ │ ├── dashboard/ # Admin dashboard
│ │ ├── blogs/ # Blog management
│ │ ├── services/ # Services management
│ │ └── layout.tsx # Admin layout
│ ├── components/ # Admin components
│ └── lib/ # Admin utilities
│
├── blog-site/ # Main website
│ ├── app/ # Next.js app router
│ │ ├── (public)/ # Public routes
│ │ │ ├── blog/ # Blog pages
│ │ │ ├── services/ # Service pages
│ │ │ └── layout.tsx # Main layout
│ ├── components/ # UI components
│ └── lib/ # Utilities
│
├── shared/ # Shared code
│ ├── types/ # TypeScript types
│ └── utils/ # Common utilities
│
├── package.json # Root dependencies
└── README.md # This file

````

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/digital-services-platform.git
   cd digital-services-platform
````

2. Install dependencies for both apps:

   ```bash
   cd admin-panel && npm install
   cd ../blog-site && npm install
   ```

3. Set up environment variables:
   Create `.env` files in both `admin-panel` and `blog-site` with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   ```

### Running Locally

1. Start the admin panel:

   ```bash
   cd admin-panel
   npm run dev
   ```

2. Start the blog site:

   ```bash
   cd ../blog-site
   npm run dev
   ```

3. Access the apps:
   - Admin Panel: http://localhost:3001
   - Blog Site: http://localhost:3000

## 🔒 Authentication

The admin panel uses NextAuth.js with the following default credentials:

- Email: admin@example.com
- Password: admin123

## 🧪 Testing

Run tests for both applications:

```bash
# In admin-panel or blog-site directory
npm run test
```

## 🚀 Deployment

### Vercel

1. Create two Vercel projects (one for admin, one for blog)
2. Set environment variables in both projects
3. Connect to your GitHub repository

### Docker

Build and run with Docker:

```bash
docker-compose up --build
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - your.email@example.com  
Project Link: [https://github.com/yourusername/digital-services-platform](https://github.com/yourusername/digital-services-platform)

```

This README includes:
1. Clear separation between admin panel and blog site
2. Modern tech stack details
3. Visual folder structure
4. Comprehensive setup instructions
5. Deployment options
6. Contribution guidelines

You can customize the placeholder text, add your own screenshots, and adjust the technical details to match your exact implementation.
```

docker cmd: docker build --cache-from your-image-name -t your-image-name .

# git_hub pull request token for wsl teminal and more:

# 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
