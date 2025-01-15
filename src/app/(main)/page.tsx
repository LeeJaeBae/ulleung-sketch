// sections
import MainHero from 'src/sections/main/main-hero';
import MainFeatures from 'src/sections/main/main-features';
import MainPopularPorts from 'src/sections/main/main-popular-ports';
import MainPopularPackages from 'src/sections/main/main-popular-packages';

// ----------------------------------------------------------------------

export const metadata = {
  title: '울릉스케치 - 울릉도 여행의 모든 것',
};

export default function HomePage() {
  return (
    <>
      <MainHero />

      <MainFeatures />

      <MainPopularPorts />

      <MainPopularPackages />
    </>
  );
}
