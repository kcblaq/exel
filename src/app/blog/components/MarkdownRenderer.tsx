import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import type { Components } from 'react-markdown';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";


interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {

    const components: Components = {
        code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !className?.includes('language-');

            return !isInline && match ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code className={className} {...props}>
                        {children}
                    </code>
                </pre>
            ) : (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                    {children}
                </code>
            );
        },
        a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
        ),
        img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded-lg" {...props} />
        ),
    };

    return (
        <div className="prose prose-lg max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
