import { redirect } from "next/navigation";

const DashboardPage = async () => {
  redirect(`/dashboard/recently-viewed`);
};

export default DashboardPage;
