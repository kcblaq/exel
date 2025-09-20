"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabs = [
    { label: "All", value: "all" },
    { label: "Payroll Software", value: "payroll-software" },
    { label: "Payroll Solutions", value: "payroll-solutions" },
    { label: "Umbrella Services", value: "umbrella-services" },
    { label: "Accountancy Services", value: "accountancy-services" },
]

export default function BlogTabs() {
  return (
    <div className="w-full border-b ">
      <Tabs defaultValue="all" className=" max-w-3xl mx-auto flex">
        {/* Tab Headers */}
        <TabsList className="w-full justify-start  h-auto p-0 bg-[#DDE1E6] rounded-none ">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative border-r-2 px-3 py-2 text-sm border-0 rounded-none font-medium text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              {tab.label}
              <span className="absolute left-0 right-0 -bottom-px h-[2px] data-[state=active]:bg-primary data-[state=inactive]:bg-transparent"></span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Contents (dummy data) */}
        <TabsContent value="all" className="p-4">
          <p className="text-gray-600">Showing all articles...</p>
        </TabsContent>
        <TabsContent value="payroll-software" className="p-4">
          <p className="text-gray-600">Articles about Payroll Software...</p>
        </TabsContent>
        <TabsContent value="payroll-solutions" className="p-4">
          <p className="text-gray-600">Articles about Payroll Solutions...</p>
        </TabsContent>
        <TabsContent value="umbrella-services" className="p-4">
          <p className="text-gray-600">Articles about Umbrella Services...</p>
        </TabsContent>
        <TabsContent value="accountancy-services" className="p-4">
          <p className="text-gray-600">Articles about Accountancy Services...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
