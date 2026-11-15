import type { Metadata } from "next";
import Image from "next/image";
import ui from "@/content/ui.json";
import { Card } from "@/components/Card";
import { MenuTabs } from "@/components/MenuTabs";
import { PageBanner } from "@/components/PageBanner";
import { responsiveSizes } from "@/lib/breakpoints";
import { fillTemplate, formatPrice } from "@/lib/format";
import { menu } from "@/lib/menu";
import { formulaPosterAlt, menuPosterAlt } from "@/lib/poster-alt";
import burgerImage from "@/public/images/burger-detoure-PROVISOIRE-ia.webp";
import burgerFormulaPoster from "@/public/images/affiche-formule-burger.webp";
import menuPoster from "@/public/images/affiche-menu.webp";
import tacosFormulaPoster from "@/public/images/affiche-formule-tacos.webp";
import styles from "./page.module.css";

export const metadata: Metadata = { title: ui.carte.tabs.formules };

const MOBILE_POSTER_SIZE = "calc(100vw - 88px)";

const FORMULA_POSTERS: Record<string, typeof menuPoster> = {
  Burger: burgerFormulaPoster,
  Tacos: tacosFormulaPoster,
};

export default function FormulesPage() {
  const { menu: menuFormula, midi } = menu.formules;
  return (
    <>
      <PageBanner
        title={ui.carte.formules.title}
        intro={fillTemplate(ui.carte.formules.intro, { price: formatPrice(menuFormula.price_eur) })}
        product={{ source: burgerImage, alt: ui.images.burger, className: styles.bannerProduct, sizes: responsiveSizes("160px", "340px") }}
      />
      <MenuTabs current="formules" />
      <section className={`${styles.section} halftone`} aria-label={ui.carte.tabs.formules}>
        <div className={styles.layout}>
          <Card tone="red" className={styles.menuCard}>
            <div className={styles.menuHeader}>
              <h2 className="display-type text-h3">{menuFormula.name}</h2>
              <p className={`${styles.menuPrice} display-type text-h3`}>{formatPrice(menuFormula.price_eur)}</p>
            </div>
            <Image
              className={styles.poster}
              src={menuPoster}
              alt={menuPosterAlt(menuFormula)}
              sizes={responsiveSizes(MOBILE_POSTER_SIZE, "340px")}
            />
          </Card>

          <Card tone="paper">
            <h2>
              <span className={`${styles.kicker} display-type text-h3`}>{ui.carte.formules.midi_kicker}</span>
              <span className={`${styles.midiTitle} display-type text-h4`}>{ui.carte.formules.midi_title}</span>
            </h2>
            <p className={`${styles.midiHours} bold`}>{midi.hours}</p>
            <div className={styles.formulas}>
              {midi.items.map((formula) => (
                <div key={formula.name} className={`${styles.formula} separator`}>
                  <p className={`${styles.formulaTitle} display-type text-h4`}>
                    <span>{formula.name}</span>
                    <span className={styles.formulaPrice}>{formatPrice(formula.price_eur)}</span>
                  </p>
                  <Image
                    className={styles.poster}
                    src={FORMULA_POSTERS[formula.name]}
                    alt={formulaPosterAlt(formula, midi.footnote)}
                    sizes={responsiveSizes(MOBILE_POSTER_SIZE, "360px")}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
