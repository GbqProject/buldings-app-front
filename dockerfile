# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app

# Copy and install dependencies first to leverage Docker's layer caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the Angular application for production
RUN npm run build

# The output directory name is standardized, no need for guessing
# Use a specific output directory if needed, e.g., --output-path=dist/
# This command outputs to a directory named after your project in 'dist'
# To see what gets built you can use ls -la dist/project-name/
# We will assume a simple 'dist' folder for this example
# If you are using Angular 17+ you may not have a subfolder.
# So you can adjust the next line to 'dist/project-name' as needed.
# For example `COPY --from=build /app/dist/buildings-app-front/ /usr/share/nginx/html/`

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove Nginx's default content
RUN rm -rf /usr/share/nginx/html/*

# Copy the built application from the 'build' stage
# Assuming the build output is in 'dist/buildings-app-front'
# You may need to adjust this path based on your Angular configuration
COPY --from=build /app/dist/buildings-app-front/ /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
