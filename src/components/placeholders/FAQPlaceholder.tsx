import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQDetails } from '@/util/data/FAQDetail';
import { Minus, Plus } from 'lucide-react';

export default function FAQPlaceholder() {
  return (
    <Accordion type="single" collapsible className=''>
      {FAQDetails.slice(0,4).map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className='border rounded-lg p-2 my-2 md:my-3 shadow data-[state=open]:border-primary'>
          <AccordionTrigger className="font-bold md:text-xl cursor-pointer">{faq.question}</AccordionTrigger>
        <AccordionContent className='font-display'>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

interface FAQPlaceholderProps {
  items: {
    question: string
    answer: string
  }[]
}

export  function ReusableFAQPlaceholder({ items }: FAQPlaceholderProps) {
  return (
    <Accordion type="single" collapsible className="w-full pb-2 grid gap-4 my-8 lg:my-16">
     {
       items.map((item, index) => (
         <AccordionItem key={index} value={`item-${index}`} className="w-full border rounded-md px-4 bg-white max-w-2xl mx-auto ">
           <AccordionTrigger className="w-full group flex items-center justify-between [&>svg]:hidden cursor-pointer">
             <span>{item.question}</span>

             {/* Transition wrapper */}
             <span className="ml-2 inline-flex items-center transition-all duration-300 ease-in-out">
               {/* Plus shows when closed */}
               <Plus
                 className="h-5 w-5 group-data-[state=open]:opacity-0 group-data-[state=open]:-rotate-90 transition-all duration-300 ease-in-out"
                 aria-hidden
               />
               {/* Minus shows when open */}
               <Minus
                 className="h-5 w-5 opacity-0 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-0 -rotate-90 transition-all duration-300 ease-in-out absolute"
                 aria-hidden
               />
             </span>
           </AccordionTrigger>

           <AccordionContent className="transition-all duration-300 ease-in-out w-full text-start">
             {item.answer}
           </AccordionContent>
         </AccordionItem>
       ))
     }
    </Accordion>
  );
}
