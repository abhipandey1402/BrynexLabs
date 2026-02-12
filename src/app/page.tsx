import Hero from '@/components/sections/Hero';
import Positioning from '@/components/sections/Positioning';
import Services from '@/components/sections/Services';
import WhoWeWorkWith from '@/components/sections/WhoWeWorkWith';
import WhyBrynex from '@/components/sections/WhyBrynex';
import HowWeWork from '@/components/sections/HowWeWork';
import Engagement from '@/components/sections/Engagement';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <Services />
      <WhoWeWorkWith />
      <WhyBrynex />
      <HowWeWork />
      <Engagement />
      <FinalCTA />
    </>
  );
}
