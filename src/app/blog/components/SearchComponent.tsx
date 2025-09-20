"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* Search bar */}
      <div className="w-full max-w-xl flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
        
          type="text"
          placeholder="Find articles... (e.g., 'IR35', 'payroll', 'HMRC compliance')"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm flex-1"
        />
      </div>

      {/* Popular tags */}
      <div className="w-full max-w-xl mt-3 flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm">
        <span className="text-gray-700 font-medium mb-2 sm:mb-0">Popular:</span>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100"
          >
            IR35 Compliance
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100"
          >
            Payroll Software
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100"
          >
            HMRC
          </Badge>
        </div>
      </div>
    </div>
  );
}
