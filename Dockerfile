FROM node:10-slim
WORKDIR /peliculas
COPY . .
RUN npm install && pwd
CMD [ "npm", "start" ]