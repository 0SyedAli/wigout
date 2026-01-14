import HomeHero from "@/components/home/HomeHero";
import Recommended from "@/components/home/Recommended";
import DiscoverNearby from "@/components/home/DiscoverNearby";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Recommended />
      <DiscoverNearby />
    </>
  );
}
