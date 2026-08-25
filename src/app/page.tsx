import HeroSection from "@/components/home/HeroSection";
import DealsBanner from "@/components/home/DealsBanner";
import PartySection from "@/components/home/PartySection";
import ScheduleCard from "@/components/home/ScheduleCard";
import OffersSection from "@/components/home/OffersSection";
import HolidaySale from "@/components/home/HolidaySale";
import GiftPortfolio from "@/components/home/GiftPortfolio";
import NewsletterCard from "@/components/home/NewsletterCard";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <DealsBanner />
      <PartySection />
      <ScheduleCard />
      <OffersSection />
      <HolidaySale />
      <GiftPortfolio />
      <NewsletterCard />
    </div>
  );
}
