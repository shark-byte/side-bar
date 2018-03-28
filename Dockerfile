FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install 
RUN ./node_modules/.bin/webpack
EXPOSE 3003
CMD [ "npm", "run", "docker-start" ]
