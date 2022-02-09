import { remark } from "remark";
import html from "remark-html";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

export default async function markdownToHtml(markdown: any) {
  const result = await remark()
    .use(html)
    .use(remarkRehype)
    .use(rehypeHighlight)
    // .use(rehypeDocument)
    // .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
