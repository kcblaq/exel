import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageLayout } from '@/util/PageLayout';
import CustomAccordion from './GettingStarted';
import { Title } from '@/app/about/components/Utils.about';
import { getFaqs } from '../services/getFaqs';

// Define the FAQ item type based on your backend response
interface FAQItem {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default async function TabsComponent() {
  const faqs = await getFaqs() as FAQItem[];
  
  // Map backend category values to frontend tab configuration
  const categoryConfig = {
    'gettingStarted': {
      value: 'getting-started',
      label: 'Getting Started',
      bgColor: 'bg-[#F2F4F8]'
    },
    'payrollSoftware': {
      value: 'payroll-software', 
      label: 'Payroll Software',
      bgColor: 'bg-[#D0E1F2B2]'
    },
    'payrollSolutions': {
      value: 'payroll-solutions',
      label: 'Payroll Solutions', 
      bgColor: 'bg-[#F2F4F8]'
    },
    'umbrellaServices': {
      value: 'umbrella-services',
      label: 'Umbrella Services',
      bgColor: 'bg-[#D0E1F2B2]'
    },
    'accountancyServices': {
      value: 'accountancy-services',
      label: 'Accountancy Services',
      bgColor: 'bg-[#F2F4F8]'
    }
  };

  // Filter FAQs by category
  const getFAQsByCategory = (categoryValue: string) => {
    if (categoryValue === 'all') {
      return faqs;
    }
    
    // Find the backend category key that matches the frontend value
    const backendCategory = Object.keys(categoryConfig).find(
      key => categoryConfig[key as keyof typeof categoryConfig].value === categoryValue
    );
    
    return faqs.filter(faq => faq.category === backendCategory);
  };

  // Get available categories that actually have FAQs
  const getAvailableCategories = () => {
    const uniqueCategories = Array.from(new Set(faqs.map(faq => faq.category)));
    
    return uniqueCategories.map(backendCategory => {
      const config = categoryConfig[backendCategory as keyof typeof categoryConfig];
      return config ? {
        value: config.value,
        label: config.label,
        bgColor: config.bgColor
      } : null;
    }).filter(Boolean) as { value: string; label: string; bgColor: string }[];
  };

  const availableCategories = getAvailableCategories();
  const allTabs = [{ value: "all", label: "All" }, ...availableCategories];

  return (
    <section className={`${PageLayout} w-full`}>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className='w-full bg-white flex h-auto flex-wrap'>
          {allTabs.map((tab) => (
            <TabsTrigger
              value={tab.value}
              key={tab.value}
              className="border-b-3 rounded-none px-4 border-t-0 border-l-0 border-r-0
                  transition-all duration-300 shadow-none outline-0 cursor-pointer
                  data-[state=active]:border-primary data-[state=active]:text-primary
                  data-[state=inactive]:text-gray-500 whitespace-nowrap"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* All Tab Content - Shows all categories with their FAQs */}
        <TabsContent value="all" className="">
          {availableCategories.map((category) => {
            const categoryFAQs = getFAQsByCategory(category.value);
            
            return (
              <div key={category.value} className={`${category.bgColor} py-8 lg:py-16`}>
                
                <Title title={category.label} />
                <CustomAccordion data={categoryFAQs} />
              </div>
            );
          })}
        </TabsContent>

        {/* Individual Category Tabs */}
        {availableCategories.map((category) => {
          const categoryFAQs = getFAQsByCategory(category.value);
          
          return (
            <TabsContent 
              key={category.value} 
              value={category.value}
              className={`${category.bgColor} py-8 lg:py-16 space-y-4`}
            >
              <Title title={category.label} />
              <CustomAccordion data={categoryFAQs} />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}