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
  searchParams: { [key: string]: string | number | undefined };
}

const DashboardPage = async ({ params: { slug }, searchParams }: DashboardPageProps) => {
  if (!dashboardPageTypes.some((page) => page.type === slug)) throw new Error("Page not found.");

  const session = await getServerSession(authOptions);

  const { q, field, order } = searchParams;

  const designs = await fetchDesigns({
    userId: session?.user.id!,
    type: slug,
    limit: 12,
    search: q as string,
    order: field as SortFields,
    sort: order as SortOrder,
    page: Number(searchParams?.page) || 1,
  });

  return (
    <main className="w-full h-screen flex flex-col p-2 gap-2 overflow-hidden">
      <Navbar user={session?.user!} />

      <Dashboard
        type={slug}
        designs={designs.data}
        page={Number(searchParams?.page) || 1}
        totalPages={designs.totalPages || 1}
        userId={session?.user.id!}
      />
    </main>
  );
};

export default DashboardPage;
