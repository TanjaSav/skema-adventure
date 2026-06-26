# SKEMA Adventure

Interactive outdoor adventure game for kids, built with Next.js App Router.

The app guides a team through a sequence of map locations and nature-based tasks. Teams choose an age group, enter a team name, complete each task, and scan QR codes at physical locations to unlock the next step.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `html5-qrcode` for QR scanning
- MongoDB for saving task result records
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

## Database

Task completion records are saved to MongoDB through the server route `POST /api/task-results`.

Configure the database connection with:

```bash
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=skema_adventure
```

Use `.env.example` as the local template. Do not commit real `.env` files or database credentials.

If `MONGODB_URI` is not set, result saving is skipped and the game still works locally. Add the environment variables later to enable persistence without changing the app code.

Photos are resized in the browser before upload. The current settings convert selected images to JPEG with a maximum side of `1280px` and quality `0.75`.

Results are inserted into the `task_results` collection. Each saved result includes:

- team name
- age group
- task location
- task step and title
- completion timestamp
- uploaded photo metadata: file id, URL, file name, MIME type, and file size

Photo files are stored in MongoDB GridFS using the `task_photos` bucket. MongoDB will create these collections automatically:

- `task_photos.files`
- `task_photos.chunks`

Saved photos can be opened through:

```text
/api/photos/{photoFileId}
```

## Notes

- QR scanning uses the device camera and works best on HTTPS or localhost.
- The app stores progress in `localStorage`, so clearing browser storage resets the current team state.
- `app/layout.tsx` uses Google-hosted `Fira Code` through `next/font`; production builds need network access if the font is not cached.
- Static visual assets are under `public/img`; paths are referenced directly as `/img/...`.
