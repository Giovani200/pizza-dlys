import type { Metadata } from "next";
import ui from "@/content/ui.json";
import { MenuTabs } from "@/components/MenuTabs";
import { PageBanner } from "@/components/PageBanner";
import { responsiveSizes } from "@/lib/breakpoints";
import { fillTemplate } from "@/lib/format";
import { pizzas } from "@/lib/menu";
import pizzaImage from "@/public/images/pizza-detouree-PROVISOIRE-ia.webp";
import { PizzaMenu } from "./PizzaMenu";
import styles from "./page.module.css";

export const metadata: Metadata = { title: ui.carte.tabs.pizzas };

export default function PizzasPage() {
  return (
    <>
      <PageBanner
        title={ui.carte.pizzas.title}
        intro={fillTemplate(ui.carte.pizzas.intro, { count: pizzas.length })}
        product={{ source: pizzaImage, alt: ui.images.pizza, className: styles.bannerProduct, sizes: responsiveSizes("230px", "520px") }}
      />
      <MenuTabs current="pizzas" />
      <PizzaMenu />
    </>
  );
}
