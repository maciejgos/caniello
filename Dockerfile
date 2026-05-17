FROM mcr.microsoft.com/playwright:v1.60.0-noble

RUN npm install -g pnpm@9.15.4 turbo@latest vercel@latest

WORKDIR /workspaces/caniello

EXPOSE 3000

CMD ["sleep", "infinity"]
