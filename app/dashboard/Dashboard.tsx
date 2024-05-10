"use client";

import { dashboardPageTypes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
  };
  type: DashboardPageType;
}

const Dashboard = ({ type }: DashboardProps) => {
  return (
    <section className="flex-1 p-4 text-white bg-primary-black rounded-xl">
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
    </section>
  );
};

export default Dashboard;
