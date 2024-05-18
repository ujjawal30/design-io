"use client";

import Link from "next/link";

import { dashboardPageTypes } from "@/constants/routes";
import { IDesign } from "@/lib/models/design.model";
import { IUser } from "@/lib/models/user.model";
import { cn } from "@/lib/utils";
import DesignCard from "@/components/cards/DesignCard";
import SortField from "@/components/forms/SortField";
import Pagination from "@/components/shared/Pagination";

interface DashboardProps {
  designs: IDesign[] | null;
  type: DashboardPageType;
  page: number;
  totalPages: number;
  userId: string;
}

const Dashboard = ({ designs, type, page, totalPages, userId }: DashboardProps) => {
  return (
    <section className="h-screen flex-1 p-4 text-white bg-primary-black rounded-xl space-y-8 overflow-auto">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          {dashboardPageTypes.map((page) => (
            <Link
              key={page.type}
              href={`/dashboard/${page.type}`}
              className={cn(
                "text-base font-semibold text-primary-grey-300 rounded-xl px-4 py-2",
                type === page.type && "text-primary-purple bg-primary-purple/20"
              )}
            >
              {page.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <SortField />
        </div>
      </div>

      <div className="w-full px-2">
        {designs?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {designs.map((design) => (
              <DesignCard key={design._id} design={design} userId={userId} />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-lg">No designs found.</div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};

export default Dashboard;
