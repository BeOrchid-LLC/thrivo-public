# ── Stage 1: install dependencies ──────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json .npmrc ./
# Delete the Windows-generated lockfile and reinstall so Linux optional deps
# (e.g. @rollup/rollup-linux-x64-gnu) are resolved correctly. .npmrc (legacy-peer-deps=true)
# must come along -- @beorchid-llc/thrivo-contracts peer-depends on zod ^3 while this app is
# on zod ^4 (only the contracts package's TS types are imported, never its zod schemas).
RUN rm -f package-lock.json && npm install --no-audit --no-fund

# ── Stage 2: build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time.
# Pass NEXT_PUBLIC_LIVE_URL as a Coolify build variable.
ARG NEXT_PUBLIC_LIVE_URL=https://thrivo.fit
ENV NEXT_PUBLIC_LIVE_URL=${NEXT_PUBLIC_LIVE_URL}

RUN npm run build

# ── Stage 3: runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# next build --output standalone copies only what the server needs.
COPY --from=builder /app/public                    ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Liveness from inside the container; use PORT (Coolify may override 3000).
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
