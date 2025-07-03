import { PageLayout } from '@/util/PageLayout'
import SectionTitle from '@/util/SectionTitle'
import React from 'react'
import IndustryWeSupportMarque from '@/util/IndustryWeSupportMarque'
import { ButtonExel } from '../ButtonExel'
import SubTitle from '@/util/SubTitle'
import Link from 'next/link'

export default function IndusctryWeSupport() {
  return (
    <section className={`${PageLayout} flex flex-col gap-6 md:gap-12 overflow-x-hidden`}>
        <div className='flex flex-col justify-center items-center gap-4 md:gap-6'>
            <SectionTitle title="We Support Any Industry Type" className='text-center' />
            <SubTitle className=' font-bold text-center max-w-xl'>
                We work with businesses, freelancers, and contractors across industries, with tailored solutions to fit your needs. 
            </SubTitle>
            <SubTitle className='text-center max-w-lg'>
                Our payroll expertise spans every sector of the UK economy. Here are some industries we serve:
            </SubTitle>
        </div>
       <IndustryWeSupportMarque />
       <span className="mx-auto">
        <Link href={'https://booking-link.zohobookings.eu/#/exelconsultancy'}
        target='https://booking-link.zohobookings.eu/#/exelconsultancy'
        >

        <ButtonExel
        text='Start Your Free Consultation'
        className='max-w-md justify-self-center'
       />
        </Link>
       </span>
    </section>
  )
}
