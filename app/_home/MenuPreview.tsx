import Link from "next/link";
import type { ReactNode } from "react";
import ui from "@/content/ui.json";
import { cardClassName, type CardTilt, type CardTone } from "@/components/Card";
import { ProductImage } from "@/components/ProductImage";
import { TacoSizes } from "@/components/TacoSizes";
import { responsiveSizes } from "@/lib/breakpoints";
import { fillTemplate, formatPrice } from "@/lib/format";
import { burgers, lowestBurgerPrice, lowestSeniorPrice, menu, pizzas, selectByName } from "@/lib/menu";
import burgerImage from "@/public/images/burger-detoure-PROVISOIRE-ia.webp";
import pizzaImage from "@/public/images/pizza-detouree-PROVISOIRE-ia.webp";
import tacosImage from "@/public/images/tacos-detoure-PROVISOIRE-ia.webp";
import styles from "./MenuPreview.module.css";

const TITLE_ID = "menu-title";
const featuredPizzas = selectByName(pizzas, ui.home.pizzas.featured);
const featuredBurgers = selectByName(burgers, ui.home.burgers.featured);

export function MenuPreview() {
  const { pizzas: pizzaTexts, tacos: tacosTexts, burgers: burgerTexts } = ui.home;
  return (
    <section id="carte" className={styles.section} aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className={`${styles.title} script-type text-h2 reveal-on-scroll`}>
        {ui.home.menu_title}
      </h2>
      <div className={styles.cards}>
        <LinkCard href="/carte/pizzas/" tone="orange" tilt="left" className={styles.pizzaCard}>
          <ProductImage source={pizzaImage} alt={ui.images.pizza} className={styles.pizzaProduct}
            sizes={responsiveSizes("290px", "620px")}
          />
          <div className={`${styles.body} ${styles.pizzaBody}`}>
            <h3 className="display-type text-h3">{pizzaTexts.title}</h3>
            <p className={styles.pizzaText}>{fillTemplate(pizzaTexts.text, { count: pizzas.length })}</p>
            <PriceList
              className={styles.pizzaList}
              items={featuredPizzas.map((pizza) => ({
                name: pizza.name,
                price: fillTemplate(pizzaTexts.price_pair, {
                  senior: formatPrice(pizza.senior_eur),
                  mega: formatPrice(pizza.mega_eur),
                }),
              }))}
            />
            <CardFooter link={fillTemplate(pizzaTexts.link, { count: pizzas.length })} price={lowestSeniorPrice} />
          </div>
        </LinkCard>

        <LinkCard href="/carte/tacos/" tone="red" tilt="right" className={styles.followingCard}>
          <ProductImage source={tacosImage} alt={ui.images.tacos} className={styles.tacosProduct}
            sizes={responsiveSizes("200px", "330px")}
          />
          <div className={`${styles.body} ${styles.tacosBody}`}>
            <h3 className={`${styles.tacosTitle} display-type text-h3`}>{tacosTexts.title}</h3>
            <p>{tacosTexts.text}</p>
            <TacoSizes />
            <span className={`${styles.footer} underlined-link`}>{tacosTexts.link}</span>
          </div>
        </LinkCard>

        <LinkCard href="/carte/burgers/" tone="ink" tilt="left" className={styles.followingCard}>
          <ProductImage source={burgerImage} alt={ui.images.burger} className={styles.burgerProduct}
            sizes={responsiveSizes("150px", "230px")}
          />
          <div className={styles.body}>
            <h3 className="display-type text-h3">{burgerTexts.title}</h3>
            <p className={styles.burgerText}>
              {fillTemplate(burgerTexts.text, {
                count: burgers.length,
                price: formatPrice(menu.burgers.menu_option.price_eur, { signed: true }),
              })}
            </p>
            <PriceList
              className={styles.burgerList}
              items={featuredBurgers.map((burger) => ({ name: burger.name, price: formatPrice(burger.price_eur) }))}
            />
            <CardFooter
              link={fillTemplate(burgerTexts.link, { count: burgers.length })}
              price={lowestBurgerPrice}
              priceClassName={styles.yellowPrice}
            />
          </div>
        </LinkCard>
      </div>
    </section>
  );
}

type LinkCardProps = { href: string; tone: CardTone; tilt: CardTilt; className?: string; children: ReactNode };

function LinkCard({ href, tone, tilt, className, children }: LinkCardProps) {
  return (
    <Link href={href} className={cardClassName({ tone, tilt, flush: true, className: `${styles.linkCard} ${className ?? ""}` })}>
      {children}
    </Link>
  );
}

function PriceList({ items, className }: { items: { name: string; price: string }[]; className: string }) {
  return (
    <ul className={`${styles.priceList} ${className}`}>
      {items.map((item) => (
        <li key={item.name} className={`${styles.priceRow} separator`}>
          <span>{item.name}</span>
          <span className={`${styles.nowrap} bold`}>{item.price}</span>
        </li>
      ))}
    </ul>
  );
}

function CardFooter({ link, price, priceClassName }: { link: string; price: number; priceClassName?: string }) {
  return (
    <span className={`${styles.footer} ${styles.footerRow}`}>
      <span className="underlined-link">{link}</span>
      <span className={`${styles.nowrap} ${priceClassName ?? ""}`}>
        <span className="bold">{ui.home.price_from}</span> <span className="display-type text-h3">{formatPrice(price)}</span>
      </span>
    </span>
  );
}
