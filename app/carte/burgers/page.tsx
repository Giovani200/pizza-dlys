import type { Metadata } from "next";
import Image from "next/image";
import ui from "@/content/ui.json";
import { Card, type CardTone } from "@/components/Card";
import { MenuTabs } from "@/components/MenuTabs";
import { PageBanner } from "@/components/PageBanner";
import { responsiveSizes } from "@/lib/breakpoints";
import { fillTemplate, formatPrice } from "@/lib/format";
import { burgers, menu } from "@/lib/menu";
import { counterPosterAlt } from "@/lib/poster-alt";
import burgerImage from "@/public/images/burger-detoure-PROVISOIRE-ia.webp";
import burgersPoster from "@/public/images/bandeau-dlys-burgers.webp";
import premiumsPoster from "@/public/images/bandeau-dlys-premiums.webp";
import styles from "./page.module.css";

export const metadata: Metadata = { title: ui.carte.tabs.burgers };

const POSTER_SIZES = responsiveSizes("calc(100vw - 88px)", "540px");

const GROUP_PRESENTATION: { tone: CardTone; poster: typeof burgersPoster }[] = [
  { tone: "red", poster: burgersPoster },
  { tone: "ink", poster: premiumsPoster },
];

export default function BurgersPage() {
  const { menu_option: menuOption } = menu.burgers;
  return (
    <>
      <PageBanner
        title={ui.carte.burgers.title}
        intro={fillTemplate(ui.carte.burgers.intro, { count: burgers.length })}
        product={{ source: burgerImage, alt: ui.images.burger, className: styles.bannerProduct, sizes: responsiveSizes("160px", "380px") }}
      />
      <MenuTabs current="burgers" />
      <section className={styles.section} aria-label={ui.carte.tabs.burgers}>
        {menu.burgers.groups.map((group, index) => (
          <Card key={group.label} tone={GROUP_PRESENTATION[index].tone}>
            <h2 className={`${styles.groupTitle} display-type text-h4`}>{group.label}</h2>
            <Image
              className={styles.poster}
              src={GROUP_PRESENTATION[index].poster}
              alt={counterPosterAlt(group.items)}
              sizes={POSTER_SIZES}
            />
            <ul className={styles.list}>
              {group.items.map((burger) => (
                <li key={burger.name} className={`${styles.burger} separator`} data-dish="">
                  <span>
                    <span className={`${styles.block} bold`} data-dish-name="">
                      {burger.name}
                    </span>
                    <span className={`${styles.composition} text-small`}>{burger.composition}</span>
                  </span>
                  <span className={`${styles.price} bold`} data-dish-price="">
                    {formatPrice(burger.price_eur)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <div className={styles.menuOption}>
          <Card tone="yellow" className={styles.menuOptionCard}>
            <p className="display-type text-h4">{ui.carte.burgers.menu_title}</p>
            <p>
              <span className="display-type text-h3">{formatPrice(menuOption.price_eur, { signed: true })}</span>
            </p>
            <p className={styles.menuOptionDetail}>{menuOption.detail}</p>
          </Card>
        </div>
      </section>
    </>
  );
}
