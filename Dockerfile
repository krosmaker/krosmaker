FROM node:16.17.0 AS builder
WORKDIR /usr/src/app

# Installing dependencies:
COPY package.json package-lock.json ./
RUN npm ci

# Copying configuration:
COPY tsconfig.json nuxt.config.js ./
# Copying assets:
COPY static/ ./static/
COPY assets/ ./assets/
COPY locales/ ./locales/
# Copying less frequently used source folders:
COPY pages/ ./pages/
COPY plugins/ ./plugins/
COPY layouts/ ./layouts/
# Copying sources:
COPY store/ ./store/
COPY components/ ./components/
# Creating dummy .git folder:
RUN git init &&\
    git config user.name "Krosmaker" &&\
    git config user.email "noreply@krosmaker.github.io" &&\
    git add nuxt.config.js && git commit -m "init"

# Building app:
RUN npm run generate

# Using Nginx image to serve static content:
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/data

# Removing default Nginx index page:
RUN rm -r /usr/share/nginx/html/*

# Copying Nginx configuration:
COPY nginx.conf /etc/nginx/

# Copying bundled application from the builder image:
COPY --from=builder /usr/src/app/dist/ ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
