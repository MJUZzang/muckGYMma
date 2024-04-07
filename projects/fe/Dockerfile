FROM node:16.20.1
WORKDIR /projects/fe
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3000
CMD [ "node", "index" ]