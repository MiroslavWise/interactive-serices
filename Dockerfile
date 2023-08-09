#FROM node:16-alpine AS deps
FROM node:18.16.0-alpine AS deps

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AUTO_VERIFICATION

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install -g npm@9.7.2
RUN npm ci

FROM node:18.16.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_AUTO_VERIFICATION=$NEXT_PUBLIC_AUTO_VERIFICATION

RUN npm run build
RUN mkdir -p /app/.next/cache/images

FROM node:18.16.0-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ARG PORT
ENV PORT $PORT

CMD ["npm","run", "start"]