import { ui, defaultLang, type Lang } from "./ui";
import en from "@/site.json";
import fa from "./site.fa.json";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  return lang in ui ? (lang as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: keyof (typeof ui)[typeof defaultLang]) => ui[lang][key] || ui[defaultLang][key];
}

// Default language has no prefix: "/about" (en), "/fa/about" (fa).
export const localize = (path: string, lang: Lang) =>
  lang === defaultLang ? path : `/${lang}${path === "/" ? "" : path}`;

// Same page in the other language.
export const unlocalize = (path: string) => path.replace(/^\/fa(?=\/|$)/, "") || "/";

// Every page renders once per language: lang undefined -> "/", "fa" -> "/fa".
export const langPaths = () => [{ params: { lang: undefined } }, { params: { lang: "fa" } }];
export const langOf = (param: string | undefined): Lang => (param === "fa" ? "fa" : "en");

// English copy, with the Persian file laid over it (arrays merge item by item).
function merge(base: any, over: any): any {
  if (Array.isArray(base) && Array.isArray(over)) return base.map((b, i) => merge(b, over[i]));
  if (base && typeof base === "object" && over && typeof over === "object") {
    const out = { ...base };
    for (const k in over) out[k] = merge(base[k], over[k]);
    return out;
  }
  return over ?? base;
}
const faSite: typeof en = merge(en, fa);
export const getSite = (lang: Lang): typeof en => (lang === "fa" ? faSite : en);
