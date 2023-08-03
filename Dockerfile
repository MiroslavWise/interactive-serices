#FROM node:16-alpine AS deps
FROM node:18.16.0-alpine AS deps

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AUTO_VERIFICATION

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install -g npm@9.7.2
RUN npm ci

#FROM node:16-alpine AS builder
FROM node:18.16.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
RUN mkdir -p /app/.next/cache/images
COPY . .

ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_AUTO_VERIFICATION=$NEXT_PUBLIC_AUTO_VERIFICATION


# ENV NEXT_TELEMETRY_DISABLED 1 
# RUN npm install

RUN npm run build


#FROM node:16-alpine AS runner
FROM node:18.16.0-alpine AS runner
WORKDIR /app
# ENV NEXT_TELEMETRY_DISABLED 1
# ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next/cache/images ./.next/cache/images
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ARG PORT
ENV PORT $PORT

CMD ["npm","run", "start"]