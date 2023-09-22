FROM node:alpine AS builder

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AUTO_VERIFICATION
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_AUTO_VERIFICATION=$NEXT_PUBLIC_AUTO_VERIFICATION

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci
RUN npm run build

FROM node:alpine

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AUTO_VERIFICATION
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_AUTO_VERIFICATION=$NEXT_PUBLIC_AUTO_VERIFICATION

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

COPY . .

RUN npm run build
