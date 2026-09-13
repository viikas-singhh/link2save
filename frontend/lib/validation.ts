export type DetectedPlatform = "youtube" | "instagram" | "unknown";

export interface ValidationResult {
  isValid: boolean;
  platform: DetectedPlatform;
  errorMessage?: string;
}

export function detectPlatform(rawUrl: string): DetectedPlatform {
  if (!rawUrl) return "unknown";
  const url = rawUrl.trim().toLowerCase();
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  if (url.includes("instagram.com") || url.includes("instagr.am")) {
    return "instagram";
  }
  return "unknown";
}

export function validateInputUrl(rawUrl: string): ValidationResult {
  if (!rawUrl || !rawUrl.trim()) {
    return {
      isValid: false,
      platform: "unknown",
      errorMessage: "Please paste a YouTube or Instagram link.",
    };
  }

  const url = rawUrl.trim();

  // Check scheme
  if (!/^https?:\/\//i.test(url)) {
    return {
      isValid: false,
      platform: "unknown",
      errorMessage: "Please enter a valid URL starting with http:// or https://",
    };
  }

  const platform = detectPlatform(url);
  if (platform === "unknown") {
    return {
      isValid: false,
      platform: "unknown",
      errorMessage: "Only public YouTube and Instagram links are supported.",
    };
  }

  return {
    isValid: true,
    platform,
  };
}
