import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutUs/AboutHero";
import MissionSection from "@/components/AboutUs/MissionSection";
import StorySection from "@/components/AboutUs/StorySection";

export default function AboutUsPage() {
  return (
    <main className="flex flex-col w-full bg-[#FCFBF7] text-zinc-900 overflow-hidden">
      <AboutHero />
      <StorySection />
      <MissionSection />
      <Footer />
    </main>
  );
}
