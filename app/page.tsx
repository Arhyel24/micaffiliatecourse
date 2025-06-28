import Dashboard from "@/components/dashboard";
import { MyFooter } from "@/components/footer";
import Hero from "@/components/hero-section";
import { NavBar } from "@/components/navbar";
import Reviews from "@/components/reviews";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="pt-20">
        <Dashboard />
        <Hero />
        <Reviews />
        <MyFooter />
      </div>
    </>
  );
}
