import { getPortfolio } from "../../lib/portfolio-store";
import { Footer } from "../layout/Footer";
import Navbar from "../layout/Navbar";

export const dynamic = "force-dynamic";

export default async function HomeLayout({ children }) {
  const content = await getPortfolio();
  return (
    <>
      <Navbar content={content.navigation} />
      {children}
      <Footer content={content.footer} navigation={content.navigation} />
    </>
  );
}
