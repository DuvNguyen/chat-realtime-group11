# -------- Stage 1: Build Vite app --------
FROM node:20-alpine AS build
WORKDIR /app

# Cài dependencies
COPY package*.json ./
RUN npm ci

# Copy toàn bộ source code
COPY . .

# Build Vite app (sử dụng biến API backend)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build


# -------- Stage 2: Serve bằng NGINX --------
FROM nginx:alpine

# Copy file build sang thư mục public của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy file config Nginx tùy chỉnh
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 để serve
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
