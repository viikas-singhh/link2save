# link2save — Public Media Downloader

**link2save** is a production-ready, mobile-first, responsive web application for analyzing and downloading public media from YouTube and Instagram.

Built with a modern security-conscious architecture, it strictly processes authorized public content without bypassing DRM, authentication walls, or private account restrictions.

---

## Key Features

- **YouTube Processing with `yt-dlp`**:
  - Automatically analyzes public YouTube URLs and Shorts (`/shorts/` and standard URLs).
  - Uses mobile player clients (`android`, `ios`, `mweb`) to bypass datacenter IP bot detection on cloud servers (Render/AWS).
  - Generates Full HD **MP4 (1080p/720p Video + Audio)** or **MP3 (Audio Only 192 kbps)** with parallel FFmpeg remuxing.
- **Instagram Processing**:
  - **Full HD DP (Profile Pictures)**: Download original high-resolution profile pictures by entering `@username` or profile URL.
  - **Instagram Reels**: Save public vertical Reels with synchronized audio and zero watermarks.
  - **Instagram Posts**: Download public feed photos, carousels, and videos in original quality.
  - **Instagram Stories**: Download stories and highlights with session support.
- **Security & Abuse Protection**:
  - **SSRF Prevention**: Strict hostname resolution and DNS validation blocking private/local subnets (RFC 1918, loopbacks, link-local).
  - **Protocol Filtering**: Only allows `http` and `https` schemes.
  - **Rate Limiting**: Sliding-window rate limiter preventing API abuse.
  - **Temporary File Isolation**: Media jobs execute in randomized UUID sandboxes (`temp/{job_id}/`).
  - **Zero Permanent Storage**: Media files are automatically cleaned up immediately following streaming via Starlette background tasks, complemented by an autonomous periodic background cleanup worker.
- **Glassmorphism Design & UX**:
  - State-of-the-art frosted glass aesthetic with `backdrop-filter: blur(24px) saturate(190%)` and subtle luminous ambient glow meshes.
  - Convenient **1-Click Clipboard Paste** button.
  - 7 quick media filter tabs for seamless navigation.
  - 100% free with **zero advertisements, zero popups, and zero tracking**.
- **SEO & Google Search Ranking**:
  - Dynamic JSON-LD structured schemas (`WebSite`, `SoftwareApplication` with 4.9-star rating, `FAQPage`, and `HowTo`).
  - Dynamic `sitemap.ts` and `robots.ts` covering all tools.
  - Dedicated landing pages: `/youtube-video-downloader`, `/youtube-to-mp3`, `/instagram-reel-downloader`, `/instagram-dp-downloader`, `/instagram-post-downloader`, `/instagram-story-downloader`, `/instagram-video-downloader`.

---

## Technology Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Python 3.12+, FastAPI, Pydantic v2, `yt-dlp`, `imageio-ffmpeg`
- **Infrastructure**: Docker, Docker Compose

---

## Quick Start (Local Development)

### 1. Backend Setup

```bash
cd backend
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Run test suite:
```bash
pytest tests -v
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

---

## Production Cloud Deployment (Vercel + Render / Railway)

For step-by-step instructions on deploying the backend (with FFmpeg) to **Render** or **Railway** and the frontend to **Vercel** with free SSL, see the full guide:

👉 **[DEPLOYMENT.md](file:///d:/link2save/DEPLOYMENT.md)**

---

## Quick Start (Docker Compose)

Launch the entire stack with a single command:

```bash
docker compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)
- Health Check: [http://localhost:8000/health](http://localhost:8000/health)

---

## Legal & Acceptable Use Policy

link2save is designed strictly for downloading public content that users have the right or authorization to access and download for personal, offline, or fair-use purposes. It does not provide access to private media, bypass digital rights management (DRM), or circumvent platform access controls.
