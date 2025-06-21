# Development stage (matches your current setup)
FROM node:18 AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Production builder stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production runner stage
FROM node:18-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/worker ./worker
COPY --from=builder /app/scripts ./scripts

# Install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

EXPOSE 3000
CMD ["node", "server.js"]