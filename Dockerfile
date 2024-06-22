# Stage: build
FROM node:20-alpine AS base

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AUTO_VERIFICATION
ARG NEXT_PUBLIC_WEB_SOCKET
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_API_KEY_YANDEX

ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_AUTO_VERIFICATION=$NEXT_PUBLIC_AUTO_VERIFICATION
ENV NEXT_PUBLIC_WEB_SOCKET=$NEXT_PUBLIC_WEB_SOCKET
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_API_KEY_YANDEX=$NEXT_PUBLIC_API_KEY_YANDEX

# Install dependencies only when needed
FROM base AS deps

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AUTO_VERIFICATION
ARG NEXT_PUBLIC_WEB_SOCKET
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_API_KEY_YANDEX

ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_AUTO_VERIFICATION=$NEXT_PUBLIC_AUTO_VERIFICATION
ENV NEXT_PUBLIC_WEB_SOCKET=$NEXT_PUBLIC_WEB_SOCKET
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_API_KEY_YANDEX=$NEXT_PUBLIC_API_KEY_YANDEX

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache  libc6-compat git

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AUTO_VERIFICATION
ARG NEXT_PUBLIC_WEB_SOCKET
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_API_KEY_YANDEX

ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_AUTO_VERIFICATION=$NEXT_PUBLIC_AUTO_VERIFICATION
ENV NEXT_PUBLIC_WEB_SOCKET=$NEXT_PUBLIC_WEB_SOCKET
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_API_KEY_YANDEX=$NEXT_PUBLIC_API_KEY_YANDEX

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN git config --global --add safe.directory .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi
  # Production image, copy all the files and run next
FROM base AS runner

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AUTO_VERIFICATION
ARG NEXT_PUBLIC_WEB_SOCKET
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_API_KEY_YANDEX

ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_AUTO_VERIFICATION=$NEXT_PUBLIC_AUTO_VERIFICATION
ENV NEXT_PUBLIC_WEB_SOCKET=$NEXT_PUBLIC_WEB_SOCKET
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_API_KEY_YANDEX=$NEXT_PUBLIC_API_KEY_YANDEX

WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js