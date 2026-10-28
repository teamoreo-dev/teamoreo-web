# Team Oreo Admin Workspace

Lightweight responsive Next.js administration interface for authorised Team Oreo staff. It supports dashboard summaries, blog article creation/editing/deletion and reviewing/updating/deleting contact form submissions.

## Run locally

1. Install dependencies: `npm install`
2. Set `NEXT_PUBLIC_API_URL` to the backend origin (default: `http://localhost:5000`).
3. Start the Next.js app: `npm run dev`
4. Ensure the backend is running and `CLIENT_ORIGIN` permits this frontend origin.
5. Sign in using an administrator account created through the backend's admin seed/create script.

The frontend uses cookie-based sessions (`credentials: include`) and does not store administrator credentials or tokens in local storage. The backend must enforce authorisation for every admin endpoint.

## Main files

- `app/page.tsx`: app entry point
- `app/admin_page.jsx`: authenticated workspace, dashboard, article CRUD, enquiry review
- `app/nav.jsx`: reusable responsive admin navigation
- `app/globals.css`: design tokens, components, tables, forms, and responsive layouts
- `app/api.js`: reusable API request helper

Article featured images are entered as image URLs; image upload UI can be connected to the existing backend upload endpoint as a follow-up.


## Recent frontend updates
- Admin blog creation/editing now uses the article modal and backend admin blog endpoints.
- Blog and enquiry tables include client-side search/filter pagination (8 rows per page).
- Confirmation prompts use an in-app dialog; status and error notifications use `app/Alert.jsx` instead of browser alerts.
- Layout styles include tablet/mobile breakpoints and a responsive public internship application page at `/internships/apply`.

### Internship application endpoint
The application page submits JSON to `NEXT_PUBLIC_INTERNSHIP_APPLICATION_ENDPOINT` (defaults to `/api/internships/apply`) using `NEXT_PUBLIC_API_URL` as the API base. The backend in this ZIP does not currently define an internship-application route, so configure this variable to an existing endpoint or add the corresponding backend route before expecting submissions to be saved.
