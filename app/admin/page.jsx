import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCookieName, verifyAdminSession } from "../../lib/admin-session";
import { getPortfolio } from "../../lib/portfolio-store";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Portfolio Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!verifyAdminSession(cookieStore.get(adminCookieName)?.value)) {
    redirect("/admin/login");
  }

  const content = await getPortfolio();
  return <AdminDashboard initialContent={content} />;
}
