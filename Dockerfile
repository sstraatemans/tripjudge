FROM node:18.9.0-alpine3.16

ENV  DATA_HOST="127.0.0.1"
ENV  DATA_PORT=5432
ENV  DATE_USERNAME="admin"
ENV  DATA_PASSWORD="admin"
ENV  DATA_DATABASE="tripjudge"

WORKDIR /app

COPY . .

RUN npm install
CMD ["npm", "run", "dev"]