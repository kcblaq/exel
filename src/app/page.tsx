import Hero from "@/components/home/Hero";
import HowitWorks from "@/components/home/HowitWorks";
import WhatWeOffer from "@/components/home/WhatWeOffer";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main className=" py-4 grid">
        <Hero />
        <WhatWeOffer />
        <HowitWorks />
        <WhyChooseUs />
    </main>
  );
}
