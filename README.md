# Ciphervault

Ciphervault is an open-source practice site for the Science Olympiad Codebusters event. It gives students a focused place to practice common cipher formats, review their solving statistics, and build speed through repeated attempts.

The project is intentionally small and approachable. Contributions that improve the practice experience, add useful cipher support, or make the code easier to understand are welcome.

## Features

- Practice Aristocrat, Patristocrat, Hill 2x2, Hill 3x3, and Porta ciphers.
- Generate puzzles and submit solutions through the browser.
- Track attempts, solve rates, fastest times, average times, and total plays.
- Create an account, sign in, and reset a forgotten password.
- View personal cipher statistics and community performance for individual puzzles.
- Responsive interface for desktop and mobile screens.

## Project Status

Ciphervault is an active, early-stage project. The core practice flow is usable, but the application and database model may change as new features are added. Check the issue tracker before starting a large change so work can be coordinated.

## Tech Stack

- Next.js with the App Router
- Supabase for authentication, database access, and session handling
- CSS Modules and shared CSS variables for styling

## Getting Started

### Requirements

- Node.js 18.18 or newer
- A Supabase project

### Installation

1. Clone the repository and move into the project directory.

```bash
git clone https://github.com/SilverKeep/ciphervault.git
cd ciphervault
```

2. Install dependencies.

```bash
npm install
```

3. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use the Supabase project URL and anonymous key from the Supabase dashboard. Do not commit `.env.local` or service-role credentials.

4. Start the development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
```

## Supabase Setup

The application expects Supabase authentication and database objects for quotes, cipher-specific keywords, attempts, and statistics. The relevant application code lives in:

- `utils/supabase/` for browser, server, API, and middleware clients
- `app/auth/` for authentication flows
- `app/functions/actions.js` for puzzle generation, submissions, and statistics
- `app/(pages)/profile/` for personal statistics

When setting up a new Supabase project, configure the authentication redirect URLs to include the local development URL and the deployed site URL. The password reset flow uses `NEXT_PUBLIC_SITE_URL` when constructing its callback URL.

## Repository Structure

```text
app/
	auth/                 Authentication pages and actions
	components/           Navigation, statistics, and cipher interfaces
	(pages)/              Practice, play, results, profile, blog, and policy pages
	functions/            Server actions for puzzles and statistics
	styles/               Global styles and CSS Modules
utils/supabase/         Supabase client and session helpers
public/                 Static assets and legacy browser files
```

## Known Limitations

Solution checking currently happens in the browser. As a result, a determined user can inspect or bypass the client-side flow and submit dishonest records, or have the quote exposed on the frontend. Statistics should be treated as practice feedback rather than a secure competition ranking.

## Contributing

Contributions are welcome.

1. Open an issue for a bug, feature, or design discussion when appropriate.
2. Fork the repository and create a focused branch.
3. Make the smallest change that solves the problem.
4. Run `npm run build` before opening a pull request.
5. Describe the behavior you changed and any Supabase setup required to test it.

Please keep pull requests focused, avoid committing secrets, and preserve the existing accessibility and responsive behavior.

## License

This repository currently does not include a license file. Until one is added, permission to reuse, modify, or distribute the code should not be assumed.