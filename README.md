# Movie App

A Next.js application for browsing popular movies using the TMDb API.

## Features

- Popular movies list on the home page
- Filter by genre
- Pagination
- Movie detail page with description, ratings and image gallery
- Internationalization: Russian (default), English, Spanish
- Language switcher in the header
- Server Components for fast initial load

## Tech Stack

- **Next.js 15** — React framework (App Router)
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **shadcn/ui** — UI components
- **Zustand** — client state management
- **next-intl** — i18n routing and translations
- **TMDb API** — movie data

## Setup

### 1. Get a TMDb API key

1. Sign up at [TMDb](https://www.themoviedb.org/)
2. Go to [API settings](https://www.themoviedb.org/settings/api)
3. Create a new API key (choose "Developer")
4. Copy your API key

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
movie-app/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale layout with header and NextIntlClientProvider
│   │   ├── page.tsx            # Home page — movie list
│   │   └── movie/[id]/
│   │       └── page.tsx        # Movie detail page (Server Component)
│   ├── layout.tsx              # Root pass-through layout
│   └── globals.css
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── MovieCard.tsx
│   ├── MoviesList.tsx
│   ├── GenreFilter.tsx
│   ├── Pagination.tsx
│   └── LanguageSwitcher.tsx
├── i18n/
│   ├── routing.ts              # Locale config (ru default, en/es with prefix)
│   ├── request.ts              # Server-side next-intl setup
│   └── navigation.ts           # Locale-aware Link and useRouter
├── lib/
│   ├── tmdb.ts                 # TMDb API client
│   ├── store.ts                # Zustand store
│   └── utils.ts
├── messages/
│   ├── ru.json
│   ├── en.json
│   └── es.json
└── middleware.ts               # i18n routing + redirects
```

## i18n Routing

| URL | Locale |
|---|---|
| `/` | Russian (default, no prefix) |
| `/movie/123` | Russian |
| `/en/` | English |
| `/en/movie/123` | English |
| `/es/` | Spanish |
| `/es/movie/123` | Spanish |

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [TMDb API Documentation](https://developer.themoviedb.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [shadcn/ui](https://ui.shadcn.com)
