import Hero from '../components/home/Hero';
import BrandPillars from '../components/home/BrandPillars';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Services from '../components/home/Services';
import HowItWorks from '../components/home/HowItWorks';
import CTASection from '../components/home/CTASection';

const Home = () => {
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
