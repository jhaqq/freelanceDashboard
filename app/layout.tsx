import type { Metadata } from "next";
import { inter } from "./ui/fonts";
import "./globals.css";
import SideNav from "./ui/sidenav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Tracking freelance projects",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex flex-col grow p-6 md:p-12 `${inter.className} antialiased`">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
