import type { Metadata } from "next";
// import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";

export const metadata: Metadata = {
  title: "YAANA | Premium Ladies Accommodation in Bengaluru",
  description: "Premium, safe and fully furnished ladies accommodation in Bengaluru — stylish rooms, modern amenities, and a community-first living experience.",
  keywords: "YAANA Livings, ladies accommodation Bengaluru, womens PG Bengaluru, premium ladies hostel, fully furnished accommodation, safe stay for women, shared accommodation Bengaluru",
  openGraph: {
    title: "YAANA",
    description: "Premium, safe and fully furnished ladies accommodation in Bengaluru.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContactButtons />
    </>
  );
}
