import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "@/lib";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: "Dani",
    description: "Notes from the rabbit hole: what I built, what broke, and the numbers.",
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.tags,
      link: `/blog/${p.id}/`,
    })),
  });
}
