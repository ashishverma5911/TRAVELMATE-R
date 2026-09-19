# ASHISH_CHANGES.md

Comprehensive audit and changelog for **TravelMate Delhi (Tourist Safety & Smart Travel Application)**.

---

## (a) Every New File

1. **`frontend/src/pages/DownloadPage.jsx`**: Dedicated in-app source code download portal and local environment setup guide with instructions for running frontend and backend locally.
2. **`ASHISH_CHANGES.md`**: This file, providing a complete audit of all modifications, endpoints, environment variables, dependencies, and environment constraints before GitHub export.

---

## (b) Every Existing File Modified and What Changed

- **`.env.example`**: Fully documented every environment variable with section headers and comments categorizing by feature (Database, Chatbot/AI, Translation, Maps, News, Server) with empty values.
- **`.gitignore`**: Added strict ignore rules for `*.zip`, `dist/`, `frontend/dist/`, `.vite/`, `.cache/`, and runtime logs to prevent bundle and archive bloat when exporting to GitHub.
- **`backend/src/controllers/tmChatbotController.js`**: Fixed the Hindi transliteration typo for Qutub Minar from `"क़ुतुब मीनar"` (Latin characters mixed in) to `"क़ुतुब मीनार"`.
- **`backend/src/index.js`**: Removed hardcoded fallback Bhashini user ID to strictly read from `process.env.BHASHINI_USER_ID`, and added safe file existence verification (`fs.existsSync`) on `/api/download-zip`.
- **`frontend/src/App.jsx`**: Registered `/download`, `/download-zip`, and `/export` routes pointing to `DownloadPage`.
- **`frontend/src/components/common/Header.jsx`**: Added a direct ZIP download action button with tooltip and icon in the top header.
- **`frontend/src/pages/OnboardingPage.jsx`**: Added a project source code download banner and link to the download guide on the main landing dashboard.
- **`frontend/src/pages/UserPortalPage.jsx`**: Added a "Download Project ZIP" action button inside the traveler settings action bar.

---

## (c) Every API Endpoint (Method + Path + What It Does)

### Core System & Infrastructure
| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint returning system status, timestamp, and active database mode (Supabase PostgreSQL or In-Memory Local Cache). |
| `GET` | `/api/download-zip` | Streams the packaged source code ZIP archive (`travelmate-project-source.zip`) with safe 404 response if the archive has been cleaned. |
| `GET` | `/api/config/maps` | Returns Google Maps Platform configuration status and active client key. |
| `GET` | `/api/zones` | Returns NCRB and Delhi Police risk overlay geo-zones (Safe, Cautious, High Risk) for Delhi. |

### AI, Translation & Speech
| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/chatbot/query` | Primary AI chatbot endpoint answering tourist questions about monument timings, entry fees, metro routes, and emergency guidelines using Gemini. |
| `POST` | `/ai/chat` | Alias route for the AI safety chatbot. |
| `POST` | `/ai/incident/structure` | Parses raw tourist incident text into structured JSON (location, time, parties involved, severity) using Gemini. |
| `POST` | `/api/translate` | Bhashini ULCA Machine Translation proxy supporting text and audio speech-to-text (ASR) with Gemini multi-model fallback. |
| `ALL` | `/api/tts` | Text-to-Speech audio synthesis endpoint for Indian (Hindi, etc.) and international languages with audio streaming support. |

### Verified Places & Reviews
| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/places` | Retrieves all 11 verified Delhi tourist destinations with security ratings, verified tips, timings, ticket costs, and coordinates. |
| `GET` | `/api/places/:key` | Retrieves full details for a specific destination by key (e.g., `red-fort`, `qutub-minar`). |
| `POST` | `/api/places/reviews` | Submits a tourist review and safety rating for a destination. |

### Fare Meter & Safe Routes
| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/fare/estimate` | Calculates official Delhi Transport Department auto-rickshaw/taxi fares based on distance, luggage, and night surcharge, detecting overcharging. |
| `GET` | `/api/fare/flagged` | Returns tourist-reported overcharging incidents and driver dispute records. |
| `GET` / `POST` | `/api/fare/route` | Computes police-patrolled, well-lit safe routes between Delhi tourist landmarks. |

### Digital SafePass & Journeys
| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/journeys/onboard` | Creates a new digital SafePass journey with a temporary tourist ID, QR code token, and embassy affiliation. |
| `GET` | `/api/journeys/:codeOrId` | Retrieves journey status, telemetry, and active SafePass credentials. |
| `POST` | `/api/journeys/location` | Ingests real-time tourist GPS telemetry during active journeys. |
| `POST` | `/api/journeys/checkin` | Records a verified tourist location check-in event. |
| `POST` | `/api/journeys/expire` | Manually deactivates or expires a completed tourist journey. |

### Incidents & Evidence Vault
| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/incidents` | Submits a tourist harassment or scam incident report. |
| `GET` | `/api/incidents/:id` | Fetches details and status of a specific incident. |
| `POST` | `/api/incidents/evidence` | Encrypts and securely attaches photos, audio recordings, or documents to the traveler's Evidence Vault. |
| `GET` | `/api/incidents/evidence/:journey_code` | Retrieves all stored Evidence Vault records for a specific journey. |

### Emergency & SOS
| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/emergency/helplines` | Returns 24/7 verified emergency numbers (112, Delhi Tourist Police, Women Helpline 1091, Foreign Embassies). |
| `GET` | `/api/emergency/directory` | Alias for emergency helpline directory. |
| `POST` | `/api/emergency/sos` | Triggers immediate 112 emergency SOS broadcast with GPS coordinates and journey telemetry. |

### Admin & Police Dashboard
| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Aggregates administrative metrics (active tourists, open incidents, flagged fares, verified spots). |
| `GET` | `/api/admin/incidents` | Lists all tourist incident reports for triage by administrators or police. |
| `PATCH` | `/api/admin/incidents/:id` | Updates incident status (e.g. `Investigating`, `Resolved`, `Dismissed`). |
| `GET` | `/api/admin/places/freshness` | Audits verification freshness and pending recertifications for attractions. |
| `POST` | `/api/admin/places/:id/reverify` | Admin re-certification of attraction security and fair ticketing status. |
| `GET` | `/api/admin/fares` | Audit log of flagged transport fares and overcharging complaints. |

---

## (d) Every Environment Variable

### Database & Storage
- `DATABASE_URL`: PostgreSQL connection string (Supabase Transaction Pooler URI). Used by `backend/src/config/db.js`.
- `SUPABASE_URL`: Supabase project HTTPS endpoint (`https://<project-ref>.supabase.co`). Used by `backend/src/config/db.js`.
- `SUPABASE_ANON_KEY`: Supabase public anonymous API key. Used by `backend/src/config/db.js`.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role secret for administrative database operations. Used by `backend/src/config/db.js`.

### AI & Chatbot
- `GEMINI_API_KEY`: Google Gemini API key used for chatbot queries, automatic incident structuring, and translation fallback. Used by `backend/src/index.js` and `backend/src/controllers/tmChatbotController.js`.
- `AI_SERVICE_URL`: Optional secondary Python/FastAPI microservice endpoint. Used by `backend/src/config/env.js`.
- `VITE_AI_URL`: Optional frontend client-side AI microservice URL.

### Translation & Speech (Digital India Bhashini)
- `BHASHINI_API_KEY`: MeitY Bhashini ULCA API Authorization key for Indian language translation. Used by `backend/src/index.js`.
- `BHASHINI_USER_ID`: Bhashini ULCA User ID. Used by `backend/src/index.js`.
- `BHASHINI_PIPELINE_ID`: Bhashini ULCA Pipeline ID. Used by `backend/src/index.js`.
- `BHASHINI_PIPELINE_ENDPOINT`: Bhashini Inference Pipeline URL. Used by `backend/src/index.js`.
- `BHASHINI_INFERENCE_API_KEY`: Optional Bhashini inference API key. Used by `backend/src/index.js`.
- `VITE_BHASHINI_API_KEY`: Frontend fallback Bhashini API key.
- `VITE_BHASHINI_USER_ID`: Frontend fallback Bhashini User ID.
- `VITE_BHASHINI_PIPELINE_ENDPOINT`: Frontend fallback Bhashini endpoint URL.
- `VITE_BHASHINI_INFERENCE_API_KEY`: Frontend fallback Bhashini inference key.

### Maps & Navigation
- `GOOGLE_MAPS_API_KEY`: Backend Google Maps Platform API key for server-side proxying. Used by `backend/src/config/env.js`.
- `VITE_GOOGLE_MAPS_API_KEY`: Client-side Google Maps JavaScript API key for interactive maps and Street View. Used by `frontend/src/services/api.js` and `frontend/src/components/maps/GoogleMapView.jsx`.

### News & Disruption Advisories
- `VITE_NEWS_API_KEY`: NewsAPI.org or GNews API key for live tourist destination alerts. Used by `frontend/src/services/newsService.js`.
- `VITE_NEWS_API_URL`: Real-time news aggregator endpoint URL. Used by `frontend/src/services/newsService.js`.

### Server & Networking
- `PORT`: HTTP port number the Express server listens on (defaults to 3000).
- `HOST`: Server host binding address.
- `NODE_ENV`: Execution environment (`development` | `production`).
- `CORS_ORIGIN`: Allowed origins for Cross-Origin Resource Sharing. Used by `backend/src/index.js`.
- `VITE_API_URL`: Frontend base URL for the backend REST API. Used by `frontend/src/services/api.js`.

---

## (e) Every NPM Dependency

### Backend (`backend/package.json` and root `package.json`)
- **`@google/genai` (^2.23.0)**: Official Google GenAI SDK for server-side Gemini multi-model chat, translation, and incident structuring.
- **`@supabase/supabase-js` (^2.115.0)**: Official Supabase client for PostgreSQL connection and database operations.
- **`pg` (^8.23.0)**: Node.js PostgreSQL driver for connection pooling.
- **`express` (^4.19.2)**: Web application server framework for all REST API routes.
- **`cors` (^2.8.5)**: Express middleware for cross-origin resource requests.
- **`dotenv` (^16.4.5)**: Loads environment variables from `.env` files.
- **`morgan` (^1.10.0)**: HTTP request logger middleware.
- **`uuid` (^9.0.1)**: Generates unique UUIDs for journeys, incidents, and tokens.

### Frontend (`frontend/package.json`)
- **`react` (^18.2.0)** & **`react-dom` (^18.2.0)**: Core React library.
- **`react-router-dom` (^6.22.3)**: Declarative routing for single-page application navigation.
- **`lucide-react` (^0.363.0)**: Icon suite for the UI.
- **`@googlemaps/js-api-loader` (^2.1.1)**: Dynamic asynchronous script loader for Google Maps JavaScript API.
- **`clsx` (^2.1.1)** & **`tailwind-merge` (^2.2.2)**: Utility functions for combining Tailwind CSS classes.
- **`tailwindcss` (^3.4.3)**, **`postcss` (^8.4.38)**, **`autoprefixer` (^10.4.19)**: Utility-first CSS framework and processing.
- **`vite` (^5.1.6)** & **`@vitejs/plugin-react` (^4.2.1)**: Fast frontend build tool and development server.

---

## (f) Anything That Only Works Inside AI Studio

1. **Custom Header `'User-Agent': 'aistudio-build'`**:
   - In `backend/src/index.js` (line 120) and `backend/src/controllers/tmChatbotController.js` (line 16), `getGeminiClient()` passes `httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }`.
   - **Local/Self-hosted note**: Outside AI Studio, standard Gemini API keys work whether this header is present or removed. If you use a custom proxy, you can safely remove `httpOptions.headers`.
2. **Port 3000 Routing**:
   - Inside the AI Studio Cloud Run container sandbox, **only Port 3000** is externally routed through the reverse proxy.
   - **Local/Self-hosted note**: When running locally or on Render/Railway/Heroku, the port can be any port defined in `process.env.PORT`.
3. **Disabled Hot Module Replacement (`DISABLE_HMR=true`)**:
   - AI Studio disables HMR to avoid intermediate render flickering while the agent writes code. In standard local development (`cd frontend && npm run dev`), full Vite HMR works normally.
4. **`metadata.json`**:
   - The root `metadata.json` file controls application permissions inside AI Studio's iframe (`requestFramePermissions: ["camera", "microphone", "geolocation"]`). Standard web deployments rely on browser-level permission prompts instead.
5. **AI Studio Dev URL Domains**:
   - Domains matching `*.asia-east1.run.app` or `ais-dev-*` are specific to the AI Studio preview environment. For standalone production deployment, configure `CORS_ORIGIN` and `VITE_API_URL` to match your own domain.
