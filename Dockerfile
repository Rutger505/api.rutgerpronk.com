FROM node:20.15.1-alpine3.20 AS development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3222

CMD ["npm", "run", "dev"]

FROM node:20.15.1-alpine3.20 AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

FROM node:20.15.1-alpine3.20 AS builder
ENV NODE_ENV=production
WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build

FROM node:20.15.1-alpine3.20 AS production
ENV NODE_ENV=production
WORKDIR /app

# Expose the port Nest.js is running on
EXPOSE 3222

COPY --from=builder /app ./
COPY --from=dependencies /app/node_modules ./node_modules
CMD ["npm", "start"]

