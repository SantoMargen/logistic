FROM node:alpine

ARG SERVICE_NAME
WORKDIR  /app

COPY package*.json ./

RUN npm install --silent

COPY . ./

EXPOSE 3001

CMD [ "npm", "run", "start" ]