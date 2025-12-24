import Hero from '../components/home/Hero';
import BrandPillars from '../components/home/BrandPillars';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Services from '../components/home/Services';
import HowItWorks from '../components/home/HowItWorks';
import CTASection from '../components/home/CTASection';
import { useMetaTags } from '../utils/useMetaTags';

const Home = () => {
  useMetaTags(
    'NewHaus - Curating Exceptional Homes in Bangalore',
    'Find exceptional luxury homes in Bangalore with NewHaus. We curate the best properties with architectural expertise and investment intelligence.'
  );

  return (
    <>
      <Hero />
      <BrandPillars />
      <FeaturedProperties />
      <Services />
      <HowItWorks />
      <CTASection />
    </>
  );
};

export default Home;
