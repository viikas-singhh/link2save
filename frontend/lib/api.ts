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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function analyzeMedia(url: string): Promise<MediaMetadata> {
  try {
    const response = await fetch(`${API_BASE}/api/analyze`, {
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
      throw err;
    }
    throw new Error("Unable to communicate with analysis server. Please verify your connection.");
  }
}

export async function downloadMediaFile(
  url: string,
  format: "video" | "audio"
): Promise<{ filename: string }> {
  try {
    const response = await fetch(`${API_BASE}/api/download`, {
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
      throw err;
    }
    throw new Error("Download failed. Please check network connection and try again.");
  }
}
