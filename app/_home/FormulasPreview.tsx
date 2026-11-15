import Link from "next/link";
import ui from "@/content/ui.json";
import { Card, cardClassName } from "@/components/Card";
import { ProductImage } from "@/components/ProductImage";
import { fillTemplate, formatPrice, lowercaseFirst } from "@/lib/format";
import { menu } from "@/lib/menu";
import burgerImage from "@/public/images/burger-detoure-PROVISOIRE-ia.webp";
import appleTartImage from "@/public/images/tarte-pommes-detouree.webp";
import styles from "./FormulasPreview.module.css";

const TITLE_ID = "formulas-title";
const { menu: menuFormula, midi } = menu.formules;

export function FormulasPreview() {
  const summaryRows = [
    { name: menuFormula.name, detail: menuFormula.detail_short, price: menuFormula.price_eur },
    ...midi.items.map((formula) => ({
      name: fillTemplate(ui.home.formules.midi_item, { name: formula.name }),
      detail: formula.detail_short,
      price: formula.price_eur,
    })),
  ];

  return (
    <section id="formules" className={`${styles.section} halftone`} aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className={`${styles.title} script-type text-h2 reveal-on-scroll`}>
        {ui.home.formules.title}
      </h2>

      <Link href="/carte/formules/" className={cardClassName({ tone: "paper", tilt: "right", className: styles.summary })}>
        <ul className={styles.list}>
          {summaryRows.map((row, index) => (
            <li key={row.name} className={`${styles.summaryRow} ${index > 0 ? "separator" : ""}`}>
              <span>
                <span className={`${styles.block} bold`}>{row.name}</span>
                <span className={`${styles.summaryDetail} text-small`}>{row.detail}</span>
              </span>
              <span className={`${styles.redPrice} display-type text-h4`}>{formatPrice(row.price)}</span>
            </li>
          ))}
        </ul>
        <p className={`${styles.muted} text-small`}>
          {fillTemplate(ui.home.formules.summary_note, {
            label: midi.label,
            hours: lowercaseFirst(midi.hours),
            footnote: midi.footnote,
          })}
        </p>
        <span className={`${styles.summaryLink} underlined-link`}>{ui.home.formules.link}</span>
      </Link>

      <div className={styles.detailed}>
        <Card tone="red" tilt="left" className={styles.menuCard}>
          <h3 className="display-type text-h3">{menuFormula.name}</h3>
          <p className={`${styles.menuPrice} display-type text-h3`}>{formatPrice(menuFormula.price_eur)}</p>
          <p className={styles.menuDetail}>{menuFormula.detail}</p>
          <ProductImage source={burgerImage} alt={ui.images.burger} className={styles.burgerProduct} sizes="290px" />
        </Card>

        <Card tone="paper" tilt="right">
          <ProductImage source={appleTartImage} alt={ui.images.apple_tart} className={styles.tartProduct} sizes="160px" />
          <h3>
            <span className={`${styles.kicker} display-type text-h3`}>{ui.carte.formules.midi_kicker}</span>
            <span className={`${styles.midiTitle} display-type text-h4`}>{ui.carte.formules.midi_title}</span>
          </h3>
          <p className={`${styles.midiHours} bold`}>{midi.hours}</p>
          {midi.items.map((formula) => (
            <div key={formula.name} className={`${styles.formula} separator`}>
              <p className={`${styles.formulaTitle} display-type text-h4`}>
                <span>{formula.name}</span>
                <span className={styles.redPrice}>{formatPrice(formula.price_eur)}</span>
              </p>
              <p className={styles.formulaDetail}>{formula.detail}</p>
            </div>
          ))}
          <p className={`${styles.footnote} ${styles.muted} text-small`}>{midi.footnote}</p>
        </Card>
      </div>
    </section>
  );
}
