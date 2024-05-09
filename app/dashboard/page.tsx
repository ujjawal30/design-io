import { getServerSession } from "next-auth";

import authOptions from "@/auth.config";
import Navbar from "@/components/shared/Navbar";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="w-full h-screen flex flex-col p-2 gap-2 overflow-hidden">
      <Navbar user={session?.user!} />

      <section className="flex-1 p-4 text-white bg-primary-black rounded-xl">
        <div className="flex justify-between items-center pl-2">
          <h2 className="text-2xl font-semibold text-primary-grey-300">My Designs</h2>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
