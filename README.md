# Next.js API with Supabase - Vanilla JavaScript

A minimal Next.js application that stores user text input to Supabase using raw SQL queries.

## Features

- Simple form with text input and submit button
- No CSS frameworks (vanilla styling)
- Raw SQL queries to Supabase PostgreSQL
- Minimal dependencies

## Prerequisites

- Node.js 18+ 
- Supabase project with PostgreSQL database
- Git (for version control)

## Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. In your Supabase SQL editor, run this query to create the texts table:

```sql
CREATE TABLE texts (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Get your database connection string from Settings → Database → Connection string

## Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your Supabase database URL:
```
SUPABASE_DB_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres
```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deploy

### Local Build
```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set the `SUPABASE_DB_URL` environment variable in Vercel dashboard
4. Deploy!

## Project Structure

```
├── pages/
│   ├── index.js          # Main page with form
│   └── api/
│       └── texts.js      # API route for storing text
├── package.json
├── .env.local.example    # Environment template
├── .gitignore
└── README.md
```

## API Endpoint

- `POST /api/texts` - Stores text content to database
  - Body: `{ "content": "your text here" }`
  - Returns: `{ "success": true, "data": { "id": 1, "content": "...", "created_at": "..." } }`