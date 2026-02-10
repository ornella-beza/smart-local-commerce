import { HeroSection } from '../components/HeroSection';
import { TrendingSection } from '../components/TrendingSection';
import { BestSellersSection } from '../components/BestSellersSection';
import { QuickAccessSection } from '../components/QuickAccessSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrendingSection />
      <QuickAccessSection />
      <BestSellersSection />
    </>
  );
}
