import { CheeseMarquee } from "@/components/CheeseMarquee";
import { DeliverySection } from "@/components/DeliverySection";
import { FindUs } from "./_home/FindUs";
import { FormulasPreview } from "./_home/FormulasPreview";
import { HomeHero } from "./_home/HomeHero";
import { MenuPreview } from "./_home/MenuPreview";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CheeseMarquee />
      <MenuPreview />
      <FormulasPreview />
      <DeliverySection placement="home" />
      <FindUs />
    </>
  );
}
