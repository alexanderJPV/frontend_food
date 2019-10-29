FROM node:10.16.3 AS builder
COPY . ./frontend-restaurante
WORKDIR /frontend-restaurante
RUN npm install
RUN $(npm bin)/ng build --prod

FROM nginx:alpine
COPY --from=builder /frontend-restaurante/dist/frontend-restaurante/ /usr/share/nginx/html
COPY --from=builder /frontend-restaurante/nginx.conf /etc/nginx/conf.d/default.conf