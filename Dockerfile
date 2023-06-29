FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts -g @nestjs/cli 

COPY prisma ./prisma/

RUN yarn install --production

COPY . .

RUN yarn build

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD [ "yarn", "start:prod" ]