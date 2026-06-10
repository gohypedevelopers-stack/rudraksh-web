import BannerSlider from "@/components/Home/BannerSlider";
import CategoriesSection from "@/components/Home/CategoriesSection";
import DivineEnergySection from "@/components/Home/DivineEnergySection";
import EveryMukhiSection from "@/components/Home/EveryMukhiSection";
import HeroSection from "@/components/Home/HeroSection";
import JourneySection from "@/components/Home/JourneySection";
import KavachCollectionSection from "@/components/Home/KavachCollectionSection";
import PremiumCollectionSection from "@/components/Home/PremiumCollectionSection";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full bg-[#FCFBF7] text-zinc-900 overflow-hidden">
      <HeroSection />
      <CategoriesSection />
      <PremiumCollectionSection />
      <JourneySection />
      <EveryMukhiSection />
      <KavachCollectionSection />
      <BannerSlider />
      <DivineEnergySection />
    </main>
  );
}
