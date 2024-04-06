# Codershouse
A simple chat application built with react, vite, typescript and express, sqlite, drizzle-orm, socket.io.

## Getting started
### express api 
```bash
cd api;
```
```bash
cp .env.example .env; # update accordingly

PORT=3001
DATABASE_URL=chatrooms.db
CORS_ORIGIN=http://localhost:3000

```

```bash
npm install;
npm run dev;
```

### nextjs api 
```bash
cd app;
```
```bash
cp .env.example .env; # update accordingly

NEXT_PUBLIC_SOCKETIO_URL=localhost:3001
NEXT_PUBLIC_BASE_URL=http://localhost:3000/
NEXT_PUBLIC_BASE_API_URL=http://localhost:3001/

```

```bash
npm install;
npm run dev;
```
