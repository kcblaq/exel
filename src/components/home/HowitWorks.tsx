import SectionTitle from '@/util/SectionTitle'
import React from 'react'
import HowItWorksPlaceHolder from '../placeholders/HowItWorksPlaceHolder'
import { howItWorksData } from '@/util/data/HowItWorksData'
import { ButtonExel } from '../ButtonExel'
import { PageLayout } from '@/util/PageLayout'
import Link from 'next/link'

export default function  HowitWorks() {
  return (
    <section className={`grid grid-cols-1 gap-8 md:gap-14  bg-[#F2F4F8] ${PageLayout}`}>
      <SectionTitle title="How it Works" className='text-center my-4' />
      {
        howItWorksData.map((step, i) => (
          <li className=" flex flex-col list-none" key={i}>

            <HowItWorksPlaceHolder
              key={step.step}
              number={step.step}
              title={step.title}
              description={step.description}
              image={step.image}
              reverse={step.reverse}
            />
          </li>
        ))
      }
      <Link href={'https://booking-link.zohobookings.eu/#/exelconsultancy'}
        target={'_blank'} 
        className='flex justify-center w-full'
      >

        <ButtonExel
          className='w-fit mx-auto my-4'
          text="Request a Free Consultation"
        />
      </Link>

    </section>
  )
}
