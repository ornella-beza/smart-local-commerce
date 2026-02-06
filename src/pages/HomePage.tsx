import { HeroSection } from '../components/HeroSection';
import { TrendingSection } from '../components/TrendingSection';
import { BestSellersSection } from '../components/BestSellersSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrendingSection />
      <BestSellersSection />
    </>
  );
}
