FROM node

RUN mkdir /app/

WORKDIR /app/

COPY . .

RUN npm install --production

CMD ["node", "app.js"]
