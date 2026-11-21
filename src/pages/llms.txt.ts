import site from "@/site.json";
import { getPosts } from "@/lib";

// llms.txt spec: https://llmstxt.org
export async function GET() {
  const base = "https://0xdanis.com";
  const posts = await getPosts();
  const body = `# dani samadi

> ${site.home.title.join(" ")} Open source, local-first, benchmarked. Computer Programming graduate of Algonquin College (Dec 2025). All work lives at ${site.links.github}.

${site.home.body.join(" ")}

## Pages

- [Home](${base}/)
- [About](${base}/about): ${site.pageCopy.about.intro}
- [Projects](${base}/projects): ${site.pageCopy.projects.intro}
- [Blog](${base}/blog): ${site.pageCopy.blog.intro}
- [Experience](${base}/experience)
- [Contact](${base}/contact)
${site.links.resume ? `- [Resume](${base}${site.links.resume})\n` : ""}
## Projects

${site.projects.map((p) => `- ${p.url ? `[${p.name}](${p.url})` : p.name}: ${p.story} (${p.tag})`).join("\n")}
${posts.length ? `\n## Blog\n\n${posts.map((p) => `- [${p.data.title}](${base}/blog/${p.id})`).join("\n")}\n` : ""}
## Skills

${site.stack.join(", ")}

## Contact

- Email: ${site.links.email.replace("mailto:", "")}
- GitHub: ${site.links.github}
- LinkedIn: ${site.links.linkedin}

## Optional

- [Sitemap](${base}/sitemap-index.xml)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
