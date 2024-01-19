FROM node:lts-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3222

CMD ["npm", "run", "dev"]

FROM node:lts-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

FROM node:lts-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build

FROM node:lts-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

# Expose the port Nest.js is running on
EXPOSE 3222

COPY --from=builder /app/dist ./
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=dependencies /app/node_modules ./node_modules
CMD ["npm", "start"]

