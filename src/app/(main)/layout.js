"use client"
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isLandingPage = pathname === "/lp";
  return (
    <>
      <Navbar />
      {children}
      {!isLandingPage && <Footer />}

    </>
  );
}
