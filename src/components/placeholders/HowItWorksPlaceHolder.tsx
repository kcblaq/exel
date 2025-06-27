import Image from 'next/image';

interface HowItWorksPlaceHolderProps {
  number: number;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export default function HowItWorksPlaceHolder({
  number,
  title,
  description,
  image,
  reverse = false,
}: HowItWorksPlaceHolderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <div className={`${reverse ? 'md:order-2' : 'md:order-1'} `}>
        <div className={`flex flex-col justify-center ${reverse ? `items-end` : `items-start`} md:items-start`}>
          <h2 className={`text-8xl md:text-9xl text-[#3E75A1] font-bold mb-4`}>{number}</h2>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#21272A]`}>
            {title}
          </h2>
          <p className={`text-lg mb-4 ${reverse ? 'text-right md:text-left' : 'text-left md:text-left'}`}>{description}</p>
        </div>
      </div>
      <div className={`${reverse ? 'md:order-1' : 'md:order-2'}`}>
        <Image src={image} alt={`How it works step ${number}`} width={500} height={300} />
      </div>
    </div>
  );
}
