"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { defaultSort, sortFields, sortOrder } from "@/constants";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SortField = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<Sort>(defaultSort);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSelect = (key: keyof Sort, value: SortFields | SortOrder) => {
    setSort((prev) => ({
      ...prev,
      [key]: value,
    }));

    setOpen(false);

    const queryString = searchParams.toString();

    const queryParams =
      value === defaultSort.field || value === defaultSort.order ? removeKeysFromQuery(queryString, [key]) : formUrlQuery(queryString, key, value);

    router.push(`${pathname}${queryParams}`, { scroll: false });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={
            "bg-primary-grey-200 w-[200px] text-gray-300 justify-between border-transparent rounded-lg hover:bg-primary-grey-100 hover:text-gray-300 aria-expanded:bg-primary-grey-100 aria-expanded:border-primary-purple"
          }
        >
          <div className="flex items-center gap-1">
            {sort.order === "asc" ? <ArrowDownWideNarrowIcon size={16} className="mr-2" /> : <ArrowUpNarrowWideIcon size={16} className="mr-2" />}
            {sortFields.find((field) => field.value === sort.field)?.label}
          </div>
          <ChevronsUpDownIcon size={16} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="select-none text-xs bg-primary-black w-[200px] border-primary-grey-200 p-0 text-gray-300 rounded-lg shadow-xl">
        <div className="flex flex-col gap-2 p-1 border-b-2 border-b-primary-grey-200">
          {sortFields.map((field) => (
            <div
              key={field.value}
              className="flex items-center gap-2 p-2 hover:bg-primary-grey-100 rounded-lg"
              onClick={() => handleSelect("field", field.value as SortFields)}
            >
              <CheckIcon size={16} className={cn("mr-2", sort.field === field.value ? "opacity-100" : "opacity-0")} />
              {field.label}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 p-1">
          {sortOrder.map((order) => (
            <div
              key={order.value}
              className="flex items-center gap-2 p-2 hover:bg-primary-grey-100 rounded-lg"
              onClick={() => handleSelect("order", order.value as SortOrder)}
            >
              <CheckIcon size={16} className={cn("mr-2", sort.order === order.value ? "opacity-100" : "opacity-0")} />
              {order.label}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortField;
