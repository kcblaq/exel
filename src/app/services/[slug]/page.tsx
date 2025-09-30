
import React from 'react'
import Hero from '../components/Hero';
import ServicesYouCanGet from '../components/ServicesYouCanGet';
import GetValue from '../components/GetValue';
import HowItWorks from '../components/HowItWorks';
import ServicesFaq from '../components/ServicesFaq';
import ExploreMoreWays from '../components/ExploreMoreWays';
import { FromBlogSection } from '../components/FromOurBlog';
import TakeActionCard from '../components/TakeAction';
import { exploreMoreWaysItems, faqItems, howItWorksItems, items } from '../components/data';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/services/getService';



interface ServicePageProps {
  params: { slug: string };
}
 

 
export async function getServices(slug: string) {
  const res = await fetch(`http://localhost:1337/api/services?slug=${slug}`, {
    next: { revalidate: 60}
  });
  if (!res.ok) return null;
const data = await  res.json()
return data.data;

  
}




export default async function page({params}: ServicePageProps) {
  // const data = await getServices(params.slug);
  const service = await getServiceBySlug(params.slug)
  if (!service) return notFound();
  console.log("Service data..." , params.slug,  service);
  // const baseUrl = process.env.NEXT_STRAPI_API_URL
 return (
    <main className="mx-auto">
      {service.Blocks?.map((block) => {
        switch (block.__component) {
          case "hero.hero":
            return (
              <Hero
                key={block.id}
                title={block.title}
                description={block.description}
                image={`/step2.png`}
                isPrimary={block.isPrimary}
                cta={block.cta}
                
              />
            );

          // case "global.services-second-section":
          //   return (
          //     <ServicesYouCanGet
          //       key={block.id}
          //       title={block.title}
          //       items={block.serviceCards?.map((c: any) => ({
          //         title: c.title,
          //         description: c.description,
          //         icon: c.icon?.url,
          //       }))}
          //     />
          //   );

          // case "global.value-card":
          //   return (
          //     <GetValue
          //       key={block.id}
          //       title={block.title}
          //       subtitle={block.subTitle}
          //       cta={block.cta}
          //       items={[]} // adapt if needed
          //     />
          //   );

          // case "global.testimonial-section":
          //   return (
          //     <section key={block.id}>
          //       {block.testimonialCards?.map((t: any) => (
          //         <div key={t.id}>
          //           <p>{t.message}</p>
          //           <p>{t.name}</p>
          //           <img src={t.profileImage?.url} alt={t.name} />
          //         </div>
          //       ))}
          //     </section>
          //   );

          // case "global.faq-section":
          //   return (
          //     <ServicesFaq
          //       key={block.id}
          //       title={block.faqOnService}
          //       subtitle={block.subTitle}
          //       items={block.faqs}
          //     />
          //   );

          // case "global.explore-more-services-section":
          //   return (
          //     <ExploreMoreWays
          //       key={block.id}
          //       title={block.title}
          //       items={block.exploreMoreServiceCards}
          //     />
          //   );

          // case "global.need-to-take-action-section":
          //   return (
          //     <TakeActionCard
          //       key={block.id}
          //       title={block.title}
          //       description={block.description}
          //       cta={block.cta}
          //     />
          //   );

          default:
            return null; // unknown block, skip
        }
      })}
    </main>
  );

}



