import { HeroSection } from '../components/HeroSection';
import { TrendingSection } from '../../product/components/TrendingSection';
import { BestSellersSection } from '../../product/components/BestSellersSection';
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
