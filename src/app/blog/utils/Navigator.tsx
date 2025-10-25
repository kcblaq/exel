// "use client"

// import React from 'react'

// interface Heading {
//   id: string;
//   text: string;
//   depth: number;
// }

// interface MyNavigatorProps {
//   headings: Heading[];
// }

// export default function MyNavigator({ headings }: MyNavigatorProps) {
//   const handleHeadingClick = (id: string) => {
//     // Small delay to ensure DOM is ready
//     setTimeout(() => {
//       const element = document.getElementById(id);
//       if (element) {
//         const yOffset = -80; // Adjust for fixed headers if needed
//         const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
//         window.scrollTo({ top: y, behavior: 'smooth' });
//       }
//     }, 100);
//   };

//   return (
//     <div className="col-span-1 rounded-lg p-2 sticky top-20 h-fit">
//       <h5 className="uppercase text-primary font-bold mb-4">
//         Jump to section
//       </h5>
//       <ul className="list-disc list-inside space-y-2 text-sm">
//         {headings.map((h: Heading, index: number) => (
//           <li key={index} className={`ml-${(h.depth - 1) * 4}`}>
//             <button
//               onClick={() => handleHeadingClick(h.id)}
//               className="text-blue-600 hover:underline text-left hover:text-blue-800 transition-colors"
//             >
//               {h.text}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


"use client"

import React from 'react'
import Link from 'next/link'

interface Heading {
  id: string;
  text: string;
  depth: number;
}

interface MyNavigatorProps {
  headings: Heading[];
}

export default function MyNavigator({ headings }: MyNavigatorProps) {
  return (
    <div className="col-span-1 rounded-lg p-2 sticky top-20 h-fit">
      <h5 className="uppercase text-primary font-bold mb-4">
        Jump to section
      </h5>
      <ul className="list-disc list-inside space-y-2 text-sm">
        {headings.map((h: Heading, index: number) => (
          <li key={index} className={`ml-${(h.depth - 1) * 4}`}>
            <Link 
              href={`#${h.id}`}
              className="text-blue-600 hover:underline text-left hover:text-blue-800 transition-colors"
              scroll={true}
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}