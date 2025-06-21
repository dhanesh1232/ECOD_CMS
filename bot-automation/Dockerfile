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
