import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  // "01-my-post.md" -> slug "my-post"
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.md",
    generateId: ({ entry }) => entry.replace(/^\d+-/, "").replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    tags: z.string(),
    readingTime: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
