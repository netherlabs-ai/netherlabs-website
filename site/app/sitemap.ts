import type { MetadataRoute } from "next";
import { publicRoutes, siteOrigin } from "./lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({ url: new URL(path, siteOrigin).toString() }));
}
