# link2save — Production Cloud Deployment Guide

This guide details how to deploy **link2save** to managed cloud platforms:
- **Backend**: [Render](https://render.com) or [Railway](https://railway.app) (runs Python 3.12, `yt-dlp`, and FFmpeg in a Docker container).
- **Frontend**: [Vercel](https://vercel.com) (natively optimizes and hosts Next.js App Router with global edge CDN).

---

## Architecture Overview

```
[ User Browser ]
       │
       ▼
[ Vercel CDN ] ──────────────► Frontend (Next.js 16 + Tailwind CSS)
       │                        Runs at: https://link2save.vercel.app
       │ (REST API calls)
       ▼
[ Render / Railway ] ────────► Backend (FastAPI + yt-dlp + FFmpeg in Docker)
                                Runs at: https://link2save-backend.onrender.com
```

---

## Step 1: Push Code to GitHub

Initialize your Git repository and push link2save to GitHub (if not already done):

```bash
git init
git add .
git commit -m "feat: complete link2save public media downloader"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/link2save.git
git push -u origin main
```

---

## Step 2: Deploy Backend (Render or Railway)

### Option A: Deploy Backend on Render (Recommended)

1. Log into your free account at [render.com](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your **GitHub** account and select your `link2save` repository.
4. Configure the Web Service:
   - **Name**: `link2save-backend`
   - **Region**: Choose the closest region to your audience (e.g., Oregon or Frankfurt).
   - **Language / Runtime**: Select **Docker**.
   - **Dockerfile Path**: `Dockerfile` (or leave default, Render auto-detects root `Dockerfile`)
   - **Docker Context Directory**: `.` (or leave default)
   - **Instance Type**: `Free` (or `Starter`).
5. Scroll to **Environment Variables** and add:
   | Key | Value | Notes |
   |---|---|---|
   | `APP_ENV` | `production` | Production mode |
   | `DEBUG` | `false` | Security disable tracebacks |
   | `ALLOWED_ORIGINS` | `*` | Or `https://link2save.vercel.app` once frontend is deployed |
   | `CLEANUP_INTERVAL_SECONDS` | `300` | Sweeps stale files every 5 min |
   | `FILE_EXPIRATION_SECONDS` | `600` | Purges files older than 10 min |
   | `RATE_LIMIT_PER_MINUTE` | `20` | Protects from automated abuse |
6. Scroll down to **Health Check Path** and set:
   `/health`
7. Click **Create Web Service**.
8. Render will build your Docker container with FFmpeg and start the service.
9. When the build finishes, copy your live backend URL (e.g. `https://link2save-backend.onrender.com`).

> [!TIP]
> You can also use Render's **Blueprints**: Click **New +** → **Blueprint** and select `render.yaml` from your repo for instant configuration!

---

### Option B: Deploy Backend on Railway

1. Log into [railway.app](https://railway.app).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select your `link2save` repository.
4. Click on the created service, go to **Settings**:
   - Set **Build / Dockerfile Path** to `backend/Dockerfile`.
5. In **Variables**, add:
   - `APP_ENV`: `production`
   - `DEBUG`: `false`
   - `ALLOWED_ORIGINS`: `*`
6. In **Settings** → **Networking**, click **Generate Domain** to get a public URL (e.g., `https://link2save-backend.up.railway.app`).

---

## Step 3: Deploy Frontend on Vercel

1. Log into [vercel.com](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your `link2save` repository.
4. In the **Configure Project** screen:
   - **Project Name**: `link2save`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click **Edit** and choose `frontend`!
5. Expand the **Environment Variables** section and add:
   | Variable Name | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | Your live backend URL from Step 2 (e.g. `https://link2save-backend.onrender.com`) |
   | `NEXT_PUBLIC_SITE_URL` | Your Vercel domain or custom domain (e.g. `https://link2save.vercel.app`) |
   | `NEXT_PUBLIC_ENABLE_ADS` | `false` (switch to `true` once Google AdSense approves your domain) |
   | `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-0000000000000000` |
6. Click **Deploy**.
7. Vercel will build the Next.js app in ~60 seconds and assign your production URL (e.g., `https://link2save.vercel.app`).

---

## Step 4: Verification & Live Smoke Test

1. Open your live Vercel URL in your web browser.
2. Paste a public YouTube video link: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`.
3. Click **Analyze**:
   - Verify the video preview card, thumbnail, and duration load.
4. Click **Download MP4 Video** or **Download MP3 Audio**:
   - Verify the stepped progress state (`Processing & Converting Media...`).
   - Confirm the file is downloaded to your browser with the correct title and extension.
5. Paste an invalid URL (`https://example.com/test`) to verify the security validation warning.

---

## Step 5: Custom Domain & Google AdSense Setup (Optional)

### Adding Your Custom Domain (e.g. `link2save.com`):
1. In Vercel, go to **Settings** → **Domains**.
2. Add `link2save.com` and `www.link2save.com`.
3. Update your domain registrar's DNS records with the CNAME or A records provided by Vercel.
4. Update `ALLOWED_ORIGINS` in your backend environment variables to include `https://link2save.com`.

### Google AdSense Activation:
1. Apply for Google AdSense with your custom domain.
2. Once approved, retrieve your Publisher ID (`ca-pub-XXXXX`).
3. In Vercel, update environment variables:
   - `NEXT_PUBLIC_ENABLE_ADS` = `true`
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = `ca-pub-XXXXX`
4. Redeploy in Vercel. The `<AdSlot />` components will now automatically serve AdSense ads in the reserved slots without causing Cumulative Layout Shift (CLS)!
