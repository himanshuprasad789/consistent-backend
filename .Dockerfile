FROM node:16
WORKDIR /src
RUN npm install
COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]