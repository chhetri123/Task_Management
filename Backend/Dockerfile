FROM node:20.12.2  AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install


FROM node:20.12.2
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app /usr/src/app
COPY . .

EXPOSE 8000
CMD ["npm", "start"]
