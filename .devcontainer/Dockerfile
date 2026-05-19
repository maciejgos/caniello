FROM node:24-bookworm

ENV PNPM_HOME=/pnpm
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PATH=$PNPM_HOME:$PATH

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    docker.io \
    git \
    openssh-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@9.15.4 turbo@latest vercel@latest
RUN mkdir -p /pnpm/store && pnpm config set store-dir /pnpm/store
RUN npx -y playwright@1.60.0 install --with-deps chromium \
  && chmod -R 777 /ms-playwright

WORKDIR /workspaces/caniello
