# LeaderHire AI

A comprehensive platform designed to streamline the leadership hiring process.

## Features

- User Authentication & Authorization
- Client Management
- Mandate/Requisition Management
- Sourcing & Candidate Management
- Interview & Assessment Management
- Offer Management
- Interactive Dashboards
- Revenue Tracking

## Tech Stack

- Next.js 14
- TypeScript
- Prisma (PostgreSQL)
- NextAuth.js
- Tailwind CSS
- bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd leaderhire-ai
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your database and NextAuth configuration.

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Development

### Database Migrations

To create a new migration after modifying the schema:

```bash
npx prisma migrate dev --name <migration-name>
```

### Code Style

The project uses ESLint and Prettier for code formatting. Run:

```bash
npm run lint
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── lib/             # Utility functions and shared code
├── prisma/          # Database schema and migrations
└── types/           # TypeScript type definitions
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.
