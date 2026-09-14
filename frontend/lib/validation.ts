export type DetectedPlatform = "youtube" | "instagram" | "unknown";
export type DetectedKind = "youtube_video" | "youtube_shorts" | "instagram_reel" | "instagram_post" | "instagram_dp" | "instagram_story" | "unknown";

export interface ValidationResult {
  isValid: boolean;
  platform: DetectedPlatform;
  kind?: DetectedKind;
  errorMessage?: string;
  normalizedUrl?: string;
}

export function detectMediaDetails(rawUrl: string): { platform: DetectedPlatform; kind: DetectedKind; normalizedUrl: string } {
  if (!rawUrl || !rawUrl.trim()) {
    return { platform: "unknown", kind: "unknown", normalizedUrl: "" };
  }

  let url = rawUrl.trim();

  // 1. Handle Instagram handle @username or bare username for DP
  if (url.startsWith("@")) {
    const handle = url.replace(/^@+/, "").trim();
    return {
      platform: "instagram",
      kind: "instagram_dp",
      normalizedUrl: `https://www.instagram.com/${handle}/`,
    };
  }

  // Prepend https:// if domain provided without protocol
  if (!/^https?:\/\//i.test(url)) {
    if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("instagram.com") || url.includes("instagr.am")) {
      url = "https://" + url;
    } else if (!url.includes("/") && !url.includes(" ") && url.length <= 35) {
      // Single bare word -> Instagram profile username
      return {
        platform: "instagram",
        kind: "instagram_dp",
        normalizedUrl: `https://www.instagram.com/${url}/`,
      };
    } else {
      url = "https://" + url;
    }
  }

  const lower = url.toLowerCase();

  // YouTube detection
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) {
    if (lower.includes("/shorts/")) {
      return { platform: "youtube", kind: "youtube_shorts", normalizedUrl: url };
    }
    return { platform: "youtube", kind: "youtube_video", normalizedUrl: url };
  }

  // Instagram detection
  if (lower.includes("instagram.com") || lower.includes("instagr.am")) {
    if (lower.includes("/reel/") || lower.includes("/reels/")) {
      return { platform: "instagram", kind: "instagram_reel", normalizedUrl: url };
    }
    if (lower.includes("/p/")) {
      return { platform: "instagram", kind: "instagram_post", normalizedUrl: url };
    }
    if (lower.includes("/stories/")) {
      return { platform: "instagram", kind: "instagram_story", normalizedUrl: url };
    }
    // Check if profile URL: e.g. instagram.com/username/
    try {
      const parsed = new URL(url);
      const segments = parsed.pathname.split("/").filter(Boolean);
      if (segments.length === 1 && !["explore", "reels", "direct", "accounts"].includes(segments[0])) {
        return { platform: "instagram", kind: "instagram_dp", normalizedUrl: url };
      }
    } catch {
      // fallback
    }
    return { platform: "instagram", kind: "instagram_post", normalizedUrl: url };
  }

  return { platform: "unknown", kind: "unknown", normalizedUrl: url };
}

export function detectPlatform(rawUrl: string): DetectedPlatform {
  return detectMediaDetails(rawUrl).platform;
}

export function validateInputUrl(rawUrl: string): ValidationResult {
  if (!rawUrl || !rawUrl.trim()) {
    return {
      isValid: false,
      platform: "unknown",
      errorMessage: "Please paste a YouTube or Instagram link or username.",
    };
  }

  const details = detectMediaDetails(rawUrl);
  if (details.platform === "unknown") {
    return {
      isValid: false,
      platform: "unknown",
      errorMessage: "Only public YouTube and Instagram links are supported.",
    };
  }

  return {
    isValid: true,
    platform: details.platform,
    kind: details.kind,
    normalizedUrl: details.normalizedUrl,
  };
}
