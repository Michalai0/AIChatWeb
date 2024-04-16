


# docker build -t kiwichat-web:0.11.3.1 ../AIChatWeb
# docker push michalai1/kiwichat-web:0.11.3.1
# docker tag 6a1373e75626 michalai1/kiwichat-front:latest
# docker push michalai1/kiwichat-front:latest

FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN chmod +x /app/node_modules/.bin/next
RUN chmod +x /app/node_modules/.bin/cross-env

RUN yarn build

# 构建最终容器
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.next/server

ENV BASE_URL=http://aichat-admin:8080
ENV SECRET=123456

EXPOSE 3000

CMD node /app/server.js
