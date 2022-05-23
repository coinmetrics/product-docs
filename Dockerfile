FROM node:16-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm install serve
CMD npx serve ./public -p 3000
