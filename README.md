# Logika app - Frontend React Technical Test

React web application for action management with JWT authentication, paginated listing, and creation form.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router v6** - Navigation
- **Context API** - Global state (authentication)
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## Installation

```bash
npm install
```

## Running

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Base components (Button, Input, etc.)
│   ├── layout/         # Header, AppLayout
│   └── ...             # Feature components
├── pages/              # Main pages
├── context/            # AuthContext
├── hooks/              # Custom hooks (useAuth, useActions)
├── services/           # API services (auth, actions)
├── routes/             # Route configuration
├── types/              # TypeScript interfaces
└── utils/              # Constants and helpers
```

## Implemented Features

### Required

- Login with JWT authentication
- Dashboard with paginated action listing
- Action creation form (4 fields + image)
- UI states: loading, error, empty, success
- Private route protection

### Additional

- TypeScript
- Form validations
- Image preview before upload
- Expired token handling
- Responsive design

## Technical Decisions

### 1. Two Axios instances

The APIs are on different domains (`apinetbo` for auth, `api` for actions), so two axios instances were created with independent configurations.

### 2. Create Action Payload (inferred)

The API does not document the exact payload. By exploring the `/admin-list` response and testing the endpoint, the following fields were identified:

| Field         | Type   | Description                   |
| ------------- | ------ | ----------------------------- |
| `name`        | string | Action name (max 100 chars)   |
| `description` | string | Description (max 500 chars)   |
| `color`       | string | Hex color format (#RRGGBB)    |
| `status`      | string | "1" = active, "0" = inactive  |
| `icon`        | File   | Required image file (PNG/JPG) |

**Key finding**: The `/admin-add` endpoint only accepts `multipart/form-data`, NOT JSON. This was determined by testing the endpoint in Postman.

### 3. Context API for authentication

Context API was chosen over Redux/Zustand as it is sufficient for the application's scale (3 screens) and demonstrates React core knowledge.

### 4. localStorage for token

The JWT token is stored in localStorage to persist between sessions. Expiration is verified when loading the app.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```
