FROM mcr.microsoft.com/playwright:v1.60.0-noble

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN apt-get update \
  && apt-get install -y --no-install-recommends docker.io \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@9.15.4 turbo@latest vercel@latest
RUN mkdir -p /pnpm/store && pnpm config set store-dir /pnpm/store

WORKDIR /workspaces/caniello
