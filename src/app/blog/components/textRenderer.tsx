import { JSX } from 'react';

interface TextChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface Block {
  type: string;
  level?: number;
  children: TextChild[] | Block[];
}

interface RichTextRendererProps {
  content: Block[];
  wordLimit?: number;
}

// Extract plain text from children
function getPlainText(children: TextChild[]): string {
  return children.map(child => child.text || '').join('');
}

// Truncate text to word limit
function truncateText(text: string, limit: number): string {
  const words = text.split(/\s+/).filter(word => word.length > 0);
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
}

export function renderChildren(children: TextChild[], truncated?: string) {
  // If truncated, return plain text only
  if (truncated !== undefined) {
    return truncated;
  }

  return children.map((child, i) => {
    if (!child.text) return null;

    let content: React.ReactNode = child.text;

    // Apply formatting in order: underline -> italic -> bold
    if (child.underline) {
      content = <u key={i}>{content}</u>;
    }
    if (child.italic) {
      content = <em key={i}>{content}</em>;
    }
    if (child.bold) {
      content = <strong key={i}>{content}</strong>;
    }

    return <span key={i}>{content}</span>;
  });
}

export function RichTextRenderer({ content, wordLimit = 30 }: RichTextRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return content.map((block, index) => {
    if (!block || !block.type) return null;

    const children = block.children as TextChild[];
    const plainText = getPlainText(children);
    const isTruncated = plainText.split(/\s+/).filter(w => w.length > 0).length > wordLimit;
    const displayText = isTruncated ? truncateText(plainText, wordLimit) : undefined;

    // Handle headings (h1-h6)
    if (block.type === 'heading' && block.level) {
      const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag key={index} className="mt-6 mb-2 font-bold">
          {renderChildren(children, displayText)}
        </HeadingTag>
      );
    }

    // Handle paragraphs
    if (block.type === 'paragraph') {
      return (
        <p key={index} className="mb-3 leading-relaxed">
          {renderChildren(children, displayText)}
        </p>
      );
    }

    // Handle lists
    if (block.type === 'bulleted-list-item') {
      return (
        <li key={index} className="ml-6 list-disc">
          {renderChildren(children, displayText)}
        </li>
      );
    }

    if (block.type === 'numbered-list-item') {
      return (
        <li key={index} className="ml-6 list-decimal">
          {renderChildren(children, displayText)}
        </li>
      );
    }

    // Handle blockquotes
    if (block.type === 'quote') {
      return (
        <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
          {renderChildren(children, displayText)}
        </blockquote>
      );
    }

    // Handle code blocks
    if (block.type === 'code') {
      return (
        <pre key={index} className="bg-gray-100 p-4 rounded overflow-x-auto my-4">
          <code>{renderChildren(children, displayText)}</code>
        </pre>
      );
    }

    // Fallback for unknown block types
    return null;
  });
}