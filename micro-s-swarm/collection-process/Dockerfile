FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 6001
CMD ["npm", "run", "dev"]