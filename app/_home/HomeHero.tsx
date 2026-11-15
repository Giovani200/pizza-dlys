import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { Button } from "@/components/Button";
import { OfferBadge } from "@/components/OfferBadge";
import { ProductImage } from "@/components/ProductImage";
import { StatusBadge } from "@/components/StatusBadge";
import { responsiveSizes } from "@/lib/breakpoints";
import { fillTemplate } from "@/lib/format";
import burgerImage from "@/public/images/burger-detoure-PROVISOIRE-ia.webp";
import pizzaImage from "@/public/images/pizza-detouree-PROVISOIRE-ia.webp";
import tacosImage from "@/public/images/tacos-detoure-PROVISOIRE-ia.webp";
import styles from "./HomeHero.module.css";

const TITLE_ID = "hero-title";
const [firstLine, secondLine, conjunction, thirdLine] = ui.home.hero_title;

/**
 * The product collage lives inside the space reserved under the title. On mobile that space is
 * the positioning context, so the collage follows the title as fluid type makes it taller.
 * On desktop the space is static and the collage is placed against the hero, as in the reference.
 */
export function HomeHero() {
  return (
    <section className={`${styles.hero} halftone`} aria-labelledby={TITLE_ID}>
      <div className={styles.content}>
        <StatusBadge variant="stamp" />
        <h1 id={TITLE_ID} className={styles.title}>
          <span className={`${styles.line} display-type`}>
            <span className={styles.word}>{firstLine}</span>
          </span>
          <span className={`${styles.line} ${styles.followingLine} display-type`}>
            <span className={styles.word}>{secondLine}</span>{" "}
            <span className={`${styles.word} ${styles.conjunction} text-h4`}>{conjunction}</span>
          </span>
          <span className={`${styles.line} ${styles.followingLine} display-type`}>
            <span className={styles.word}>{thirdLine}</span>
          </span>
          <span className={`${styles.tagline} script-type text-h4`}>
            <span className={styles.word}>{ui.home.hero_tagline}</span>
          </span>
        </h1>
        <div className={styles.collage}>
          <ProductImage source={pizzaImage} alt={ui.images.pizza} className={styles.pizza} sizes="560px" />
          <ProductImage
            source={tacosImage}
            alt={ui.images.tacos}
            className={styles.tacos}
            sizes={responsiveSizes("222px", "400px")}
            priority
          />
          <ProductImage
            source={burgerImage}
            alt={ui.images.burger}
            className={styles.burger}
            sizes={responsiveSizes("178px", "260px")}
            priority
          />
          <OfferBadge className={styles.offer} />
        </div>
        <div className={styles.actionsFrame}>
          <div className={styles.actions}>
            <Button href={infos.phone_href} tone="cream" size="large" icon="arrow">
              {fillTemplate(ui.actions.call_number, { phone: infos.phone_display })}
            </Button>
            <Button href={infos.uber_eats_url} tone="orange" size="large" icon="external" external>
              {ui.actions.order_uber_eats}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
