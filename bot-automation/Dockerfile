# Use a base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Set environment
ENV NODE_ENV=development

# Start dev server with hot reload
CMD ["npm", "run", "dev"]


FROM node:18-alpine

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm install --production

# Copy the rest of the files
COPY . .

# Build the application
RUN npm run build

# Run the application
CMD ["npm", "start"]