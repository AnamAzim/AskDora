# AskDora - Doraemon Chatbot

React (CRA) frontend + Express/MongoDB backend. Users sign up, chat with Doraemon, and every
conversation is saved to their own account. Past chats are listed in the left sidebar and can be
reopened and continued. One server serves both the API and the built frontend.

## Run locally
```bash
# 1. backend
cd CB_BackEnd
cp .env.example .env        # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev                 # http://localhost:5000

# 2. frontend (new terminal) - proxies /api to the backend
cd CB_FrontEnd
npm install
npm start                   # http://localhost:3000
```
Generate a JWT secret: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

## Deploy (Render, free tier)
1. Create a free cluster on **MongoDB Atlas** -> Database Access: create a user -> Network Access:
   allow `0.0.0.0/0` -> copy the connection string (add a db name, e.g. `/askdora`).
2. Push this folder to a GitHub repo (make sure `.env` is NOT committed).
3. Render -> New -> **Blueprint** -> pick the repo (it reads `render.yaml`).
   Paste your Atlas string into `MONGO_URI` when asked. `JWT_SECRET` is generated for you.
4. Open the Render URL. Done - that single URL is your live link.

Free Render services sleep after ~15 min idle, so the first load can take ~30-50 seconds.

## API
| Method | Route | Purpose |
|---|---|---|
| POST | /api/auth/register, /login, /logout | auth (httpOnly cookie) |
| GET | /api/auth/me | current user |
| GET | /api/chats | list my chats (title + date) |
| POST | /api/chats | create chat |
| GET / PUT / PATCH / DELETE | /api/chats/:id | open / save messages / rename / delete (owner only) |
