import { PageLayout } from '@/util/PageLayout'
import SectionTitle from '@/util/SectionTitle'
import Image from 'next/image'
import React from 'react'
import { ButtonExel } from '../ButtonExel'
import FAQPlaceholder from '../placeholders/FAQPlaceholder'
import Link from 'next/link'
import SubTitle from '@/util/SubTitle'

export default function FAQ() {
  return (
    <section className={`${PageLayout} grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8`}>
      <div className="order-2 md:order-1 ">
        <Image
          src={"/faq.svg"}
          alt='Excel FAQ'
          height={628}
          width={593}
        />
      </div>
      <div className='flex flex-col gap-3 md:gap-6 order-1 md:order-2'>
        <span className="flex flex-col gap-2 md:gap-4">

          <SectionTitle title="Experience the Exel Consultancy Difference" />
          <SubTitle className=''> Contact us now! </SubTitle>
          <Link href={'/contact'}>

            <ButtonExel variant={"outline"}>Talk to our Support Team</ButtonExel>
          </Link>
        </span>
        <span className="flex flex-col">
          <h5 className='text-[#21272A] text-lg md:text-xl font-semibold'> Need more info?</h5>
          <SectionTitle title='FAQs'/> 
          <FAQPlaceholder />
        </span>
        <span className="flex justify-start ">
          <Link href={'/faq'}>

            <ButtonExel variant="link" className=' justify-self-start'> Explore More FAQs</ButtonExel>
          </Link>
        </span>

      </div>
    </section>
  )
}
