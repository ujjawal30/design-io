import { getServerSession } from "next-auth";

import authOptions from "@/auth.config";
import { dashboardPageTypes } from "@/constants/routes";
import { fetchDesigns } from "@/lib/actions/design.actions";
import Navbar from "@/components/shared/Navbar";
import Dashboard from "../Dashboard";

interface DashboardPageProps {
  params: {
    slug: DashboardPageType;
  };
}

const DashboardPage = async ({ params: { slug } }: DashboardPageProps) => {
  if (!dashboardPageTypes.some((page) => page.type === slug)) throw new Error("Page not found.");

  const session = await getServerSession(authOptions);

  const designs = await fetchDesigns({ userId: session?.user.id! });
  console.log("design :>> ", designs);

  return (
    <main className="w-full h-screen flex flex-col p-2 gap-2 overflow-hidden">
      <Navbar user={session?.user!} />

      <Dashboard user={session?.user!} type={slug} designs={designs.data} />
    </main>
  );
};

export default DashboardPage;