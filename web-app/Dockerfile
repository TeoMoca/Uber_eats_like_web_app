FROM node:12.18.1
ENV  NODE_ENV=dev
RUN npm install -g http-server
RUN npm install -g @vue/cli
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]