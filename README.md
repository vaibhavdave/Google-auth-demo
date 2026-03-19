# Google Auth Demo — Spring Boot + React

A full-stack demo app showing **Google OAuth2 authentication** using:
- **Backend**: Spring Boot 3 + Spring Security OAuth2 Client
- **Frontend**: React 18 + React Router

Users sign in with their Google account — no passwords, no user management APIs needed.

---

## Project Structure

```
Google-auth-demo/
├── backend/                  # Spring Boot app (port 8080)
│   ├── pom.xml
│   └── src/main/java/com/example/googleauth/
│       ├── config/SecurityConfig.java    # CORS + OAuth2 + logout setup
│       ├── controller/
│       │   ├── AuthController.java       # GET /api/auth/me
│       │   ├── PublicController.java     # GET /api/public/health, /info
│       │   └── DashboardController.java  # GET /api/dashboard/stats, /messages
│       └── model/UserInfo.java
└── frontend/                 # React app (port 3003)
    └── src/
        ├── context/AuthContext.js        # Auth state, login/logout helpers
        ├── pages/LoginPage.js            # Landing page with Google sign-in button
        └── pages/DashboardPage.js        # Protected dashboard
```

---

## Prerequisites

- Java 17+
- Node.js 18+
- A Google Cloud project with OAuth2 credentials

---

## Step 1 — Set up Google OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client IDs**
5. Choose **Web application**
6. Set the **Authorized redirect URI** to:
   ```
   http://localhost:8080/login/oauth2/code/google
   ```
7. Copy the **Client ID** and **Client Secret**

---

## Step 2 — Run the Backend

```bash
cd backend

# Set your Google credentials
export GOOGLE_CLIENT_ID=your-client-id-here
export GOOGLE_CLIENT_SECRET=your-client-secret-here

# Start Spring Boot
./mvnw spring-boot:run
```

Backend runs on **http://localhost:8080**

---

## Step 3 — Run the Frontend

```bash
cd frontend

npm install
npm start
```

Frontend runs on **http://localhost:3003** and proxies API calls to the backend.

---

## How It Works

```
User clicks "Sign in with Google"
        ↓
Browser → GET /oauth2/authorization/google  (Spring Security redirects to Google)
        ↓
Google OAuth2 consent screen
        ↓
Google → POST /login/oauth2/code/google  (Spring Security exchanges code for token)
        ↓
Spring Boot creates session, redirects to → http://localhost:3003/dashboard
        ↓
React fetches /api/auth/me with session cookie → gets user profile
```

---

## API Endpoints

| Method | Path | Auth Required | Description |
|--------|------|:---:|-------------|
| GET | `/api/public/health` | No | Health check |
| GET | `/api/public/info` | No | App information |
| GET | `/api/auth/me` | Yes | Current user profile |
| POST | `/api/auth/logout` | Yes | Sign out & clear session |
| GET | `/api/dashboard/stats` | Yes | Session statistics |
| GET | `/api/dashboard/messages` | Yes | User messages |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` | OAuth2 client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | OAuth2 client secret from Google Cloud Console |

---

## Key Design Decisions

- **Session-based auth**: Spring Security manages sessions via `JSESSIONID` cookie. No JWT needed for this demo.
- **No user database**: User info comes directly from Google's OAuth2 userinfo endpoint — nothing stored locally.
- **CORS**: Backend allows requests only from `http://localhost:3003` with credentials.
- **Protected routes**: React checks `/api/auth/me` on load; unauthenticated users are redirected to `/`.
