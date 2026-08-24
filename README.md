# Chat App (server)

This folder contains the server for the Chat App. It is safe to use this repository as a standalone backend API, but you'll typically pair it with a frontend client for a complete user experience.

Quick setup

1. Copy the example env file and fill values:

```bash
cp server/.env.example server/.env
# Edit server/.env and provide real credentials
```

2. Install dependencies and run the server:

```bash
cd server
npm install
npm run server
```

Prepare and push to a remote Git repo

1. Initialize git (if not already):

```bash
git init
git add .
git commit -m "Initial commit: chat-app server"
git branch -M main
```

2. Create a remote repo (GitHub/GitLab) and add it as `origin`:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Notes
- Do NOT commit your real `.env` file — it is ignored by `.gitignore`.
- Optionally add a `repository` field to `server/package.json` with the repo URL.
- For creating a repo from the command line you can use the `gh` CLI: `gh repo create <you>/<repo>`.