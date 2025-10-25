"use client"

import React from 'react'

interface Heading {
  id: string;
  text: string;
  depth: number;
}

interface MyNavigatorProps {
  headings: Heading[];
}

export default function MyNavigator({ headings }: MyNavigatorProps) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Update URL hash without page jump
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="col-span-1 rounded-lg p-2 sticky top-20 h-fit">
      <h5 className="uppercase text-primary font-bold mb-4">
        Jump to section
      </h5>
      <ul className="list-disc list-inside space-y-2 text-sm">
        {headings.map((h: Heading, index: number) => (
          <li key={index} className={`ml-${(h.depth - 1) * 4}`}>
            <button
              onClick={() => handleClick(h.id)}
              className="text-blue-600 hover:underline text-left hover:text-blue-800 transition-colors"
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}