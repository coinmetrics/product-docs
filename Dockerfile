FROM node:16-alpine
WORKDIR /usr/src/app
COPY server.js /usr/src/app/
COPY public /usr/src/app/public
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000
CMD node server.js
