# Streamify

A language-exchange social app where learners find partners, become friends, chat in real time, and hop on video calls to practice together.

Users sign up, describe the language they speak and the one they want to learn, get matched with other learners, and connect through friend requests. Once connected, they can message each other and start a video call straight from the chat.

## Features

- **Authentication**: email/password signup and login with JWT stored in an HTTP-only cookie (7-day expiry)
- **Onboarding**: set your bio, location, native language and learning language before using the app
- **Discover learners**: recommended users who have finished onboarding and aren't already your friends
- **Friend requests**: send, accept, and track incoming and outgoing requests
- **Real-time chat**: one-to-one messaging with threads, powered by [Stream Chat](https://getstream.io/chat/)
- **Video calls**: start a call from any chat and share the link in the conversation, powered by [Stream Video](https://getstream.io/video/)
- **Themes**: switch between multiple DaisyUI themes, remembered with Zustand

## Tech Stack

| Layer    | Technologies |
| -------- | ------------ |
| Frontend | React 19, Vite, React Router 7, TanStack Query, Zustand, Tailwind CSS, DaisyUI, Axios, Lucide icons, React Hot Toast |
| Backend  | Node.js, Express, MongoDB with Mongoose, JSON Web Tokens, bcryptjs, cookie-parser, CORS |
| Realtime | Stream Chat (`stream-chat`, `stream-chat-react`) and Stream Video (`@stream-io/video-react-sdk`) |

## Project Structure

```
streamify/
├── backend/
│   └── src/
│       ├── controllers/   # auth, users (friends), chat (Stream token)
│       ├── lib/           # MongoDB connection, Stream client
│       ├── middleware/    # JWT route protection
│       ├── models/        # User, FriendRequest
│       ├── routes/        # auth, users, chat
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/    # Navbar, Sidebar, FriendCard, CallButton, ...
│       ├── pages/         # Home, Login, SignUp, Onboarding, Chat, Call, Notifications
│       ├── hooks/         # useAuthUser
│       ├── lib/           # Axios instance and API calls
│       ├── store/         # Theme store
│       └── App.jsx
└── package.json           # Root build/start scripts for deployment
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A free [Stream](https://getstream.io/) account for the API key and secret

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SwaroopDangal/streamify.git
cd streamify
```

### 2. Configure the backend

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=a_long_random_secret
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

> The Stream variables are spelled `STEAM_` (not `STREAM_`) because that is the name the code reads.

### 3. Configure the frontend

Create `frontend/.env`:

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

Use the same Stream API key as the backend. Never put the secret in the frontend.

### 4. Install dependencies and run

In two terminals:

```bash
# Terminal 1: backend (http://localhost:3000)
cd backend
npm install
npm run dev
```

```bash
# Terminal 2: frontend (http://localhost:5173)
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

In development the frontend calls the API at `http://localhost:3000/api`, and the backend only allows CORS requests from `http://localhost:5173`, so keep those ports.

## Environment Variables

| Variable | Where | Description |
| -------- | ----- | ----------- |
| `PORT` | backend | Port the Express server listens on (use `3000` for local dev) |
| `MONGO_URI` | backend | MongoDB connection string |
| `JWT_SECRET_KEY` | backend | Secret used to sign login tokens |
| `STEAM_API_KEY` | backend | Stream API key |
| `STEAM_API_SECRET` | backend | Stream API secret |
| `NODE_ENV` | backend | Set to `production` to serve the built frontend and enable secure cookies |
| `VITE_STREAM_API_KEY` | frontend | Stream API key, used by the chat and video clients |

## Scripts

**Root**

| Command | Description |
| ------- | ----------- |
| `npm run build` | Installs backend and frontend dependencies and builds the frontend |
| `npm start` | Starts the backend (serves the built frontend when `NODE_ENV=production`) |

**Backend** (`backend/`)

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm start` | Start with Node |

**Frontend** (`frontend/`)

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Create a production build in `frontend/dist` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## API Reference

All routes are prefixed with `/api`. Routes marked 🔒 require the `jwt` cookie.

### Auth: `/api/auth`

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/signup` | Create an account (name, email, password of 6+ characters) |
| POST | `/login` | Log in and receive the auth cookie |
| POST | `/logout` | Clear the auth cookie |
| POST | `/onboarding` 🔒 | Save bio, location, native and learning languages |
| GET | `/me` 🔒 | Get the current user |

### Users: `/api/users` 🔒

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/` | Recommended learners to connect with |
| GET | `/friends` | Your friends |
| POST | `/friend-request/:id` | Send a friend request |
| PUT | `/friend-request/:id/accept` | Accept a friend request |
| GET | `/friend-requests` | Incoming requests and recently accepted ones |
| GET | `/outgoing-friend-requests` | Requests you have sent |

### Chat: `/api/chat` 🔒

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/token` | Get a Stream token for the current user |
