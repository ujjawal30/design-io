import { getServerSession } from "next-auth";

import authOptions from "@/auth.config";
import Navbar from "@/components/shared/Navbar";
import Dashboard from "../Dashboard";
import { dashboardPageTypes } from "@/constants/routes";

interface DashboardPageProps {
  params: {
    slug: DashboardPageType;
  };
}

const DashboardPage = async ({ params: { slug } }: DashboardPageProps) => {
  if (!dashboardPageTypes.some((page) => page.type === slug)) throw new Error("Page not found.");

  const session = await getServerSession(authOptions);

  return (
    <main className="w-full h-screen flex flex-col p-2 gap-2 overflow-hidden">
      <Navbar user={session?.user!} />

      <Dashboard user={session?.user!} type={slug} />
    </main>
  );
};

export default DashboardPage;
