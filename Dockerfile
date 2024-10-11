FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /var/www/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
