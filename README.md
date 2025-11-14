# Claims Dashboard

A web application for managing and tracking insurance claims.

## What It Does

This dashboard helps manage insurance claims by providing:

- A dashboard with key metrics and statistics
- A table to view and filter all claims
- User authentication to secure access
- Real-time data updates

## How It Works

The application is built with Next.js and uses:

- **PostgreSQL** database to store claims data
- **Prisma** to interact with the database
- **NextAuth** for user login and authentication
- **Tailwind CSS** for styling

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up your database connection in `.env`:

```
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

3. Run database migrations:

```bash
npm run db:migrate
```

4. Seed the database with sample data:

```bash
npm run db:seed
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser
