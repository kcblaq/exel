
import { PageLayout } from '@/util/PageLayout'
import { ArrowUpRight } from 'lucide-react';
import React from 'react'

interface ExploreMoreWaysProps {
    title: string;
    items: {
        title: string;
        description: string;
    }[]
}
export default function ExploreMoreWays({ title, items }: ExploreMoreWaysProps) {
  return (
    <div className={`${PageLayout} grid gap-3 md:gap-12 my-10 justify-between `}>
    <h1 className='text-3xl font-bold'>{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-4  gap-4 mt-4">
          {items.map((item, index) => (
            <div key={index} className="border p-4 rounded-md gap-3 grid">
              <h2 className="font-bold">{item.title}</h2>
              <p>{item.description}</p>
              <span className={`flex items-center gap-2 text-blue-400 font-semibold mt-2 cursor-pointer`}>Learn More <i className="fas fa-chevron-right">
                <ArrowUpRight />
                </i></span>
            </div>
          ))}
        </div>
    </div>
  )
}
