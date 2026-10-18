import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCookieName, verifyAdminSession } from "../../../lib/admin-session";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Sign In | Al-Hassan Soliman",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  if (verifyAdminSession(cookieStore.get(adminCookieName)?.value)) {
    redirect("/admin");
  }

  return <LoginForm />;
}
