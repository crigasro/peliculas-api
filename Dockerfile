FROM node:10
WORKDIR /peliculas
COPY . .
RUN npm install && pwd
CMD [ "npm", "start" ]