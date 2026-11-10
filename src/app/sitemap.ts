import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { NEWS } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/realisations`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/actualites`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...NEWS.map((post) => ({
      url: `${SITE_URL}/actualites/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
