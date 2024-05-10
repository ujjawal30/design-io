"use client";

import Link from "next/link";

import { dashboardPageTypes } from "@/constants/routes";
import { IDesign } from "@/lib/models/design.model";
import { IUser } from "@/lib/models/user.model";
import { cn } from "@/lib/utils";
import DesignCard from "@/components/cards/DesignCard";

interface DashboardProps {
  designs: IDesign[] | null;
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
  };
  type: DashboardPageType;
}

const Dashboard = ({ designs, type }: DashboardProps) => {
  return (
    <section className="flex-1 p-4 text-white bg-primary-black rounded-xl space-y-8">
      <div className="flex justify-between items-center pl-2">
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
      </div>

      <div className="w-full px-2">
        {designs?.length ? (
          <div className="grid grid-cols-4 gap-4">
            {designs.map((design) => (
              <DesignCard key={design._id} {...design} _id={design._id} creator={design.creator as IUser} />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-lg">No designs found.</div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
