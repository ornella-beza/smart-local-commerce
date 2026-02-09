import { HeroSection } from '../components/HeroSection';
import { TrendingSection } from '../components/TrendingSection';
import { BestSellersSection } from '../components/BestSellersSection';
import { FlashSale } from '../components/FlashSale';
import { QuickAccessSection } from '../components/QuickAccessSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FlashSale />
      <TrendingSection />
      <QuickAccessSection />
      <BestSellersSection />
    </>
  );
}
