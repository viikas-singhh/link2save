# link2save — Public Media Downloader

**link2save** is a production-ready, mobile-first, responsive web application for analyzing and downloading public media from YouTube and Instagram.

Built with a modern security-conscious architecture, it strictly processes authorized public content without bypassing DRM, authentication walls, or private account restrictions.

---

## Key Features

- **YouTube Processing**:
  - Automatically analyzes public YouTube URLs and extracts thumbnail, title, channel name, and duration.
  - Generates full **MP4 (Video + Audio)** or **MP3 (Audio Only)** using `yt-dlp` and FFmpeg.
- **Instagram Processing**:
  - Supports public Reels, videos, and post media.
  - Strict privacy enforcement: Rejects private accounts and login walls.
- **Security & Abuse Protection**:
  - **SSRF Prevention**: Strict hostname resolution and DNS validation blocking private/local subnets (RFC 1918, loopbacks, link-local).
  - **Protocol Filtering**: Only allows `http` and `https` schemes.
  - **Rate Limiting**: Sliding-window rate limiter preventing API abuse.
  - **Temporary File Isolation**: Media jobs execute in randomized UUID sandboxes (`temp/{job_id}/`).
  - **Zero Permanent Storage**: Media files are automatically cleaned up immediately following streaming via Starlette background tasks, complemented by an autonomous periodic background cleanup worker.
  - **No Shell Injections**: Parameters are passed as safe argument arrays without shell interpolation.
- **Design & UX**:
  - Cyberpunk-inspired dark navy blue (`#060B14`, `#0A0F1D`) with deep red accents (`#DC2626`).
  - Mobile-first responsive layouts across mobile (320px+), tablet, and desktop (1440px+).
  - Four-stage progress feedback (`Analyzing` → `Preparing` → `Processing` → `Ready`).
- **SEO & Google AdSense Ready**:
  - Dynamic JSON-LD structured schemas (`WebSite`, `SoftwareApplication`, `FAQPage`).
  - Dynamic `sitemap.ts` and `robots.ts`.
  - Dedicated landing pages: `/youtube-video-downloader`, `/youtube-to-mp3`, `/instagram-video-downloader`, `/instagram-reel-downloader`.
  - Complete AdSense compliance pages: `/about`, `/contact`, `/privacy`, `/terms`.
  - Zero Cumulative Layout Shift (CLS) `<AdSlot />` wrappers with min-height reservations.

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
