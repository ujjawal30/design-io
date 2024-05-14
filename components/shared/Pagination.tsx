"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import {
  Pagination as SPagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages?: number;
}

const visiblePages = 3;

const Pagination = ({ page, totalPages = 1 }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  const getPageNumbers = () => {
    const pageNumbers = [];

    // Calculate start and end page numbers to display
    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust start and end page numbers if needed
    if (totalPages - endPage < Math.floor(visiblePages / 2)) {
      startPage = Math.max(1, totalPages - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const onPageChange = (pageValue: number) => {
    const queryParams = pageValue === 1 ? removeKeysFromQuery(searchParams, ["page"]) : formUrlQuery(searchParams, "page", pageValue);

    router.push(`${pathname}${queryParams}`, { scroll: false });
  };

  if (totalPages === 1) return null;

  return (
    <SPagination className="px-2 mt-10">
      <PaginationContent className="flex w-full gap-4">
        <PaginationItem>
          <Button
            disabled={page <= 1}
            className="h-10 bg-primary-grey-200 hover:bg-primary-purple hover:text-white"
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeftIcon size={20} />
            {/* <PaginationPrevious className="hover:bg-primary-purple hover:text-white" /> */}
          </Button>
        </PaginationItem>

        {totalPages > visiblePages && page >= visiblePages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {getPageNumbers().map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <Button
              className={cn("size-10 hover:bg-primary-purple hover:text-white", pageNumber === page ? "bg-primary-purple" : "bg-primary-grey-200")}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          </PaginationItem>
        ))}

        {totalPages > visiblePages && page <= totalPages - (visiblePages - 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            className="h-10 bg-primary-grey-200 hover:bg-primary-purple hover:text-white"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRightIcon size={20} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </SPagination>
  );
};

export default Pagination;
