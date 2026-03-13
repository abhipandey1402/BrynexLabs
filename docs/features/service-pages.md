# Feature: Service Pages

A scalable system for showcasing Brynex Labs' service offerings with SEO-optimized, highly interactive individual pages.

## Overview
The service pages ecosystem provides both a high-level index of all services and deep-dive pages for specific offerings. It's designed to be content-driven, making it easy to add or update services without touching the core UI logic.

## Architecture

### 1. Data Layer (`src/data/services.ts`)
All service content is centralized in this TypeScript file. Each service object includes:
- **Slug**: URL identifier.
- **SEO Metadata**: Unique title and meta description.
- **Content Sections**: Challenges, solutions, tech stack, and FAQs.

### 2. UI Components
- **`ServiceCard.tsx`**: A reusable card component used on the homepage and index page. Supports optional `href` for navigation.
- **`ServicePageClient.tsx`**: The primary layout component for individual service pages. Handles the "Consultative" UI pattern (Problem -> Solution -> Tech -> FAQ -> CTA).

### 3. Routing (`src/app/services/`)
- `page.tsx`: The index page (`/services`) listing all available services.
- `[slug]/page.tsx`: A dynamic route that fetches data from the centralized services array based on the URL slug. Uses `generateStaticParams` for build-time optimization.

## SEO Strategy
- **Per-Page Metadata**: Each service page has a custom `<title>` and `<meta name="description">` to target specific keywords (e.g., "AI Software Development").
- **Semantic HTML**: Uses `<h1>` for titles and appropriately nested headings for structured content.

## Design Decisions
- **Premium CTA**: Individual pages end with a high-contrast dark button to drive conversions towards the contact modal.
- **Tech Stack Grid**: Visual representation of tools used, providing social proof and technical clarity.
- **FAQ Section**: Addresses common objections directly on the service page.
