import { Hero } from "@/components/sections/Hero";
import { WhyYaana } from "@/components/sections/WhyYaana";
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs";
import { Perks } from "@/components/sections/Perks";
import { GoogleReviews} from "@/components/sections/GoogleReviews";
import { NotJustAPlace } from "@/components/sections/NotJustAPlace";
import { Contact } from "@/components/sections/Contact";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { RentalProperties } from "@/components/sections/RentalProperties";
import NearbySection from "@/components/sections/NearbySection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhyYaana />
      <RentalProperties/>
      <FeaturedBlogs />
      <Perks /> 
      <NearbySection/>
      <GoogleReviews />
      <NotJustAPlace />
      <Contact />
      <Footer />
      <FloatingContactButtons />
    </>
  );
}
