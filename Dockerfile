# Use an official lightweight Node.js image
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm install

# Fetch assets from Cloud Storage and store them locally in the public folder (Uncomment if needed)
COPY assets/Car_Images /app/public/Car_Images/

# Build React App
RUN npm run build

# Check Build Directory
CMD ["ls", "build"]

# Use official Nginx as a base image
FROM nginx:alpine

# Set working directory
ENV NGINX_DIR=/usr/share/nginx/html
WORKDIR ${NGINX_DIR}

# Remove default Nginx files
RUN rm -rf ./*

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app into the container
COPY --from=build /app/build ${NGINX_DIR}

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]