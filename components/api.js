import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
const directory = join(process.cwd(), "cms/news");
import parseISO from "date-fns/parseISO";
import markdownToHtml from "../lib/markdownToHtml";
import { getFluidImage } from "./image/imageFunctions";

export function getPostSlugs(folder) {
  return fs.readdirSync(folder).filter((file) => file !== ".DS_Store");
}

export function getPostBySlug(slug, folder) {
  if (slug === ".DS_Store") return;
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(folder, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  if (typeof data.date.toISOString === "function") {
    data.date = data.date.toISOString();
  }
  data.slug = realSlug;
  return data;
}

export async function getAllPosts() {
  const slugs = getPostSlugs(directory);

  let posts = slugs.map((slug) => getPostBySlug(slug, directory));

  await Promise.all(
    posts.map(async (post) => {
      post.pre = await markdownToHtml(post.pre);
      post.text = await markdownToHtml(post.text);
      if (typeof post.image === "string") {
        post.image = await getFluidImage(post.image);
      }
    })
  );
  // sort posts by date in descending order
  return posts.sort((post1, post2) =>
    parseISO(post1.date) > parseISO(post2.date) ? -1 : 1
  );
}
