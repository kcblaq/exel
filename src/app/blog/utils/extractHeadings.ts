import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

interface Heading {
  depth: number;
  text: string;
  id: string;
}

export async function extractHeadings(markdown: string): Promise<Heading[]> {
  const tree = remark().use(remarkGfm).parse(markdown);
  const headings: Heading[] = [];

  visit(tree, "heading", (node: any) => {
    const textNode = node.children.find((n: any) => n.type === "text");
    if (textNode) {
      const text = textNode.value;
      const id = text
        .toLowerCase()
        .replace(/[^\w]+/g, "-") // slugify
        .replace(/(^-|-$)/g, "");
      headings.push({ depth: node.depth, text, id });
    }
  });

  return headings;
}
