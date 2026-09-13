import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://link2save.com";
  const now = new Date();

  const routes = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/youtube-video-downloader`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/youtube-to-mp3`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/instagram-video-downloader`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/instagram-reel-downloader`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ];

  return routes;
}
