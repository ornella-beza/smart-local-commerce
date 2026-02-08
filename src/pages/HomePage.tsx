import { HeroSection } from '../components/HeroSection';
import { TrendingSection } from '../components/TrendingSection';
import { BestSellersSection } from '../components/BestSellersSection';
import { FlashSale } from '../components/FlashSale';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FlashSale />
      <TrendingSection />
      <BestSellersSection />
    </>
  );
}
