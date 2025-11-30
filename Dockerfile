# === BUILDER ===
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG IDX_STOCK_SCREENER_BE
ENV IDX_STOCK_SCREENER_BE=${IDX_STOCK_SCREENER_BE}
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# === RUNNER ===
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

ARG IDX_STOCK_SCREENER_BE
ENV IDX_STOCK_SCREENER_BE=${IDX_STOCK_SCREENER_BE}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p public

USER nextjs

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
