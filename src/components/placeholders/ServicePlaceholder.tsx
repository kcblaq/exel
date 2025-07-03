import React from 'react'
import { ButtonExel } from '../ButtonExel';
import ItemLists from '../../util/ItemLists';
import Link from 'next/link';

interface Services {
  title: string;
  description: string | React.ReactNode;
  ctaText: string;
  listItems: string[];
  ctaLink: string;
  icon: React.ReactNode;
}

export default function ServicePlaceholder({ title, description, ctaLink, ctaText, icon, listItems }: Services) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-auto my-8">
      <div className="flex flex-col gap-4 md:gap-8">
        <h5 className="font-bold text-xl md:text-2xl">
          {title}
        </h5>

        <div className='flex flex-col gap-2'>
          {description}
          <ItemLists items={listItems} />
        </div>

        <div className="mt-4 hidden md:block">
          <Link href={ctaLink}
            target={ctaLink.startsWith('http') ? '_blank' : '_self'}
          >
            <ButtonExel
              variant="default"
              text={ctaText}
            />
          </Link>
        </div>
      </div>

      <div className=" h-auto md:h-full flex flex-col justify-end gap-4">
        {icon}

        <div className="block md:hidden w-full">
          <Link href={ctaLink}
            target={ctaLink.startsWith('http') ? '_blank' : '_self'}
          >

          <ButtonExel
            variant="default"
            text={ctaText}
            className='w-full'
          />
          </Link>
        </div>
      </div>
    </section>
  )
}