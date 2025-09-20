"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-center space-x-1 py-4">
      {/* Previous */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-600 hover:text-blue-600"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      {/* Page Numbers */}
      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <Button
            key={idx}
            size="sm"
            onClick={() => onPageChange(page)}
            className={cn(
              "h-8 w-8 p-0 text-sm",
              currentPage === page
                ? "bg-blue-600 text-white hover:bg-blue-600"
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            )}
          >
            {page}
          </Button>
        ) : (
          <span key={idx} className="px-2 text-gray-500">
            {page}
          </span>
        )
      )}

      {/* Next */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="text-gray-600 hover:text-blue-600"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
