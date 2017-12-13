FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
#RUN npm i -g npm
RUN npm install
EXPOSE 1982
CMD ["node", "server/index.js"]