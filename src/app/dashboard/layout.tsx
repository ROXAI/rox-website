import type { Metadata } from "next";
import layoutStyles from "./dashboard-layout.module.css";
import { Sidebar } from "../components/template/sidebar";
import { NewsBar } from "../components/template/newsbar";

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
        <div className={layoutStyles["left"]}>
          <Sidebar />
        </div>
        <div className={layoutStyles["right"]}>{children}</div>
      </div>
    </main>
  );
}
