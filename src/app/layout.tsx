import type { Metadata } from "next";
import "./globals.css";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { FloatingContactButtons } from "@/components/FloatingContactButtons";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yaanalivings.com'),
  title: "YAANA| Premium Ladies Accommodation in Bengaluru",
  description: "YAANA offers premium, safe and fully furnished ladies accommodation in Bengaluru — stylish rooms, modern amenities, and a community-first living experience.",
  keywords: "YAANA, ladies accommodation Bengaluru, womens PG Bengaluru, premium ladies hostel, fully furnished accommodation, safe stay for women, shared accommodation Bengaluru",
  alternates: {
    canonical: '/',
  },
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
    <html lang="en">
      <body>
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer />
        <FloatingContactButtons /> */}
      </body>
    </html>
  );
}
