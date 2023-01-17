# poem.mizdra.net

ほーむぺーじです。

## How to development

### Requirement

- Node.js v16+
- Docker

### Setup

```console
$ git clone git@github.com:mizdra/poem.mizdra.net.git
$ cd poem.mizdra.net

$ # Start database
$ docker compose up
$ npx prisma migrate reset

$ # Start Next.js development server
$ pnpm i
$ pnpm dev
```

### npm-scripts

- `pnpm dev`: Start development server
- `pnpm lint`: Lint codes
- `pnpm build`: Build for production
- `pnpm start`: Start production server
