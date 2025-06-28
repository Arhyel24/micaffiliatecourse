import { getServerSession } from "next-auth";
import authOptions from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { MyFooter } from "@/components/footer";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <div className="pt-20">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <MyFooter />
      </div>
    </>
  );
}