# SKEMA Adventure

Interactive outdoor adventure game for kids, built with Next.js App Router.

The app guides a team through a sequence of map locations and nature-based tasks. Teams choose an age group, enter a team name, complete each task, and scan QR codes at physical locations to unlock the next step.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `html5-qrcode` for QR scanning
- `next/image` and static assets from `public/img`
- Browser `localStorage` for team name, age group, and current progress

## App Flow

1. `/` - welcome screen.
2. `/team` - age group selection.
3. `/team-name` - team name entry.
4. `/task/location-1` - first task.
5. `/map/location-2` through `/map/location-9` - map screens with QR scanner buttons.
6. `/task/[locationId]` - shared task page for all nine task locations.
7. `/finish` - completion screen.

Only the `9-10` age group currently continues into the task flow. Other age groups show a "not ready yet" alert.

## Task Order

The task data lives in `app/task/[locationId]/page.tsx`.

1. Forritaðar leiðbeiningar
2. NÁTTÚRULEIT
3. Náttúra
4. NÁTTÚRULEIT
5. Brúaráskorun
6. Teikning
7. Flugleikur
8. Prikþraut
9. HÓPMYND

## Project Structure

```text
app/
  page.tsx                  Welcome screen
  team/page.tsx             Age group selection
  team-name/page.tsx        Team name form
  task/[locationId]/page.tsx
                            Shared task page and task data
  map/location-*/page.tsx   QR scanner map screens
  finish/page.tsx           Final screen
components/
  header.tsx                Shared header, rules modal, team name modal
lib/
  use-local-storage-value.ts
                            localStorage helpers
public/img/
  ...                       Game artwork, map, markers, task images, icons
types/
  types.ts                  Shared TypeScript types
```

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run lint:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

## Notes

- QR scanning uses the device camera and works best on HTTPS or localhost.
- The app stores progress in `localStorage`, so clearing browser storage resets the current team state.
- `app/layout.tsx` uses Google-hosted `Fira Code` through `next/font`; production builds need network access if the font is not cached.
- Static visual assets are under `public/img`; paths are referenced directly as `/img/...`.
