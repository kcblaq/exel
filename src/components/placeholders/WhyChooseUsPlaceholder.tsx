import Image from 'next/image';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';


interface WhyChooseUsProps {
    title: string;
    description: string | React.ReactNode;
    ctaText: string;
    ctaLink: string;
    icon: string;
}
export default function WhyChooseUsPlaceholder(props: WhyChooseUsProps) {
    return (
        <div className='flex flex-col gap-4 items-center justify-center w-full'>
            <Image
                src={props.icon}
                alt="Why Choose Us Icon"
                width={86}
                height={86}
                className=" rounded-lg justify-self-center mt-8 hover:shadow-md p-2 hover:border"
            />
            <h5 className="font-bold text-2xl md:text-3xl text-center">
                {props.title}
            </h5>
            <p className="text-[#121619] md:text-lg text-center font-display">

                {props.description}
            </p>
            <a href={props.ctaLink} className="btn  flex items-center hover:text-[#2E5C7A] transition-all ease-in justify-center w-full gap-2 cursor-pointer text-primary"
            target={props.ctaLink.startsWith('http') ? '_blank' : '_self'}

            >
                {props.ctaText}
                <span className="material-icons"> <FaArrowRight /></span>
            </a>
        </div>
    )
}
