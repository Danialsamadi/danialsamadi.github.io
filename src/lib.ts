import { getCollection } from "astro:content";
import site from "./site.json";

// Posts in the order of site.postSlugs; drafts hidden in production builds.
export async function getPosts() {
  const all = await getCollection(
    "posts",
    (p) => import.meta.env.DEV || !p.data.draft,
  );
  const rank = (id: string) => site.postSlugs.indexOf(id);
  return all.sort((a, b) => rank(a.id) - rank(b.id));
}
export const meta = (p: { data: { tags: string; readingTime: string } }) =>
  `${p.data.tags} · ${p.data.readingTime}`;
