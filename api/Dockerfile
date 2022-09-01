FROM node:16.17-alpine3.15
WORKDIR '/app'

RUN npm install -g nodemon

COPY package.json .

RUN npm install --save form-data

# CMD ["npm", "start"]

COPY . .