import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Team Oreo Admin" },
  robots: { index: false, follow: false }, // keep the admin out of search engines
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
