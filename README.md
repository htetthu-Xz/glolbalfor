# Global F.O.R public website

Nuxt 4 production application for the Global F.O.R public website, including the company, services, members, Activities, News and contact experiences. The approved visual preview remains in the repository root under `design-preview/` and is not the production runtime.

## Setup

Use Node.js 24 and npm:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Run the complete local quality gate before handing off a change:

```bash
npm run check
```

This runs Nuxt type checking and the repository site-quality test. The test verifies public-route SEO and heading coverage, dynamic sitemap/API discovery, robots consistency, JSON-LD and Article-date support, image references and alternative text, external-link safety, and the 500 KB source-image budget. A production handoff must also pass `npm run build`.

The complete production deployment and rollback procedure is in [`../../docs/deployment.md`](../../docs/deployment.md).
