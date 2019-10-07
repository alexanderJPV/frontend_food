FROM node:10.16.3 AS builder
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build -- --prod

FROM nginx:alpine
COPY --from=node /app/dist/frontend-restaurante /user/share/nginx/html && rm -r /frontend-restaurante/