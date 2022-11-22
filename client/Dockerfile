FROM node:14-alpine as react-builder
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
