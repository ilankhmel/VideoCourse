FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install --production

# RUN npm run build
EXPOSE 8800

CMD ["npm", "start", "--production"]