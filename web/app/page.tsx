import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import RamadanCTA from '@/components/RamadanCTA';
import DownloadCTA from '@/components/DownloadCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Stats />
      <RamadanCTA />
      <DownloadCTA />
    </>
  );
}
