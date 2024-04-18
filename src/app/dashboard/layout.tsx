import type { Metadata } from "next";
import layoutStyles from "./dashboard-layout.module.css";
import { NewsBar } from "../components/template/newsbar";
import { SideBarForMobileView } from "../components/template/mobile-view/sidebar";


const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: "dashboard",
  description: "user dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NewsBar userEmail={"nick@gmail.com"} />
      <div className={layoutStyles["Dashboard"]}>
        <SideBarForMobileView />
        <div className={layoutStyles["right"]}>{children}</div>
      </div>
    </main>
  );
}
