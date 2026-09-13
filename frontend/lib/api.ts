export interface MediaMetadata {
  id: string;
  platform: "youtube" | "instagram";
  type: string;
  title: string;
  thumbnail?: string;
  duration?: number;
  author?: string;
  formats: ("video" | "audio")[];
}

export interface ApiError {
  code: string;
  message: string;
}

const DEFAULT_PROD_API = "https://link2save-1.onrender.com";

export function getApiBase(): string {
  // 1. Explicitly configured NEXT_PUBLIC_API_URL
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== "") {
    return process.env.NEXT_PUBLIC_API_URL.trim().replace(/\/+$/, "");
  }

  // 2. Client-side browser check
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:8000";
    }
    // Any deployed public domain (Vercel, custom domain, etc.)
    return DEFAULT_PROD_API;
  }

  // 3. Server-side check
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8000";
  }

  return DEFAULT_PROD_API;
}

export async function analyzeMedia(url: string): Promise<MediaMetadata> {
  const apiBase = getApiBase();
  try {
    const response = await fetch(`${apiBase}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      let errData: { error?: ApiError } = {};
      try {
        errData = await response.json();
      } catch {
        // Not a JSON response
      }

      const message =
        errData.error?.message ||
        (response.status === 429
          ? "Too many requests. Please try again shortly."
          : response.status === 404
          ? "We couldn't access this public media. It may be unavailable or unsupported."
          : "Something went wrong while analyzing the media. Please try again.");

      throw new Error(message);
    }

    const data: MediaMetadata = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes("Failed to fetch") || err.name === "TypeError") {
        throw new Error(
          "Unable to reach the media server. If the server was sleeping (Render free tier), please wait 30 seconds and try again."
        );
      }
      throw err;
    }
    throw new Error("Unable to communicate with analysis server. Please verify your connection.");
  }
}

export async function downloadMediaFile(
  url: string,
  format: "video" | "audio"
): Promise<{ filename: string }> {
  const apiBase = getApiBase();
  try {
    const response = await fetch(`${apiBase}/api/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, format }),
    });

    if (!response.ok) {
      let errData: { error?: ApiError } = {};
      try {
        errData = await response.json();
      } catch {
        // Non-JSON response
      }

      const message =
        errData.error?.message ||
        (response.status === 429
          ? "Too many requests. Please try again shortly."
          : "Something went wrong while processing the media download.");

      throw new Error(message);
    }

    // Extract filename from Content-Disposition header
    let filename = format === "audio" ? "audio_download.mp3" : "video_download.mp4";
    const disposition = response.headers.get("content-disposition");
    if (disposition) {
      // 1. Check for filename*=utf-8''... (RFC 5987)
      const utf8Match = disposition.match(/filename\*=utf-8''([^;]+)/i);
      if (utf8Match && utf8Match[1]) {
        try {
          filename = decodeURIComponent(utf8Match[1].trim().replace(/^["']|["']$/g, ""));
        } catch {
          filename = utf8Match[1].trim();
        }
      } else {
        // 2. Fallback to filename="..."
        const match = disposition.match(/filename="?([^";]+)"?/i);
        if (match && match[1]) {
          filename = match[1].trim();
        }
      }
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);

    return { filename };
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes("Failed to fetch") || err.name === "TypeError") {
        throw new Error(
          "Download connection interrupted or server is waking up. Please retry."
        );
      }
      throw err;
    }
    throw new Error("Download failed. Please check network connection and try again.");
  }
}
