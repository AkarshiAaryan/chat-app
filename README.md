# Chat App — Server

Backend API for the Chat App. It works standalone (useful for mobile clients, testing, or running the API), but a frontend is needed for a full user experience.

Setup

1. Copy the env example and add your values:

```bash
cp server/.env.example server/.env
# edit server/.env
```

2. Install and run:

```bash
cd server
npm install
npm run server
```

Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Notes
- Don’t commit your real `.env` (it's in `.gitignore`).
- Add a `repository` field to `server/package.json` if you want the repo URL included.
- To create a repo from the command line, use: `gh repo create <you>/<repo>`.