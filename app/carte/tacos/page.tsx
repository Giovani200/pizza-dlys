import type { Metadata } from "next";
import type { ReactNode } from "react";
import ui from "@/content/ui.json";
import { Card, type CardTone } from "@/components/Card";
import { MenuTabs } from "@/components/MenuTabs";
import { PageBanner } from "@/components/PageBanner";
import { responsiveSizes } from "@/lib/breakpoints";
import { TacoSizes } from "@/components/TacoSizes";
import { formatPrice } from "@/lib/format";
import { menu } from "@/lib/menu";
import tacosImage from "@/public/images/tacos-detoure-PROVISOIRE-ia.webp";
import styles from "./page.module.css";

export const metadata: Metadata = { title: ui.carte.tabs.tacos };

const { tacos } = menu;
const [sizeStep, baseStep, fillingStep, sauceStep, extraStep] = ui.carte.tacos.steps;

export default function TacosPage() {
  return (
    <>
      <PageBanner
        title={ui.carte.tacos.title}
        intro={ui.carte.tacos.intro}
        product={{ source: tacosImage, alt: ui.images.tacos, className: styles.bannerProduct, sizes: responsiveSizes("170px", "420px") }}
      />
      <MenuTabs current="tacos" />
      <section className={styles.section} aria-label={ui.carte.tacos.title}>
        <StepCard number={1} title={sizeStep} tone="red">
          <TacoSizes />
        </StepCard>

        <StepCard number={2} title={baseStep} tone="paper">
          <ul className={styles.list}>
            {tacos.bases.map((base) => (
              <li key={base.name} className={`${styles.base} separator`}>
                <span className={`${styles.block} bold`}>{base.name}</span>
                <span className={`${styles.baseDetail} text-small`}>{base.detail}</span>
              </li>
            ))}
          </ul>
        </StepCard>

        <StepCard number={3} title={fillingStep} tone="orange">
          <ChipList items={tacos.fillings} />
        </StepCard>

        <StepCard number={4} title={sauceStep} tone="paper">
          <ChipList items={tacos.sauces} />
        </StepCard>

        <StepCard number={5} title={extraStep} tone="yellow">
          <ExtraList extras={tacos.extras} />
          <p className={`${styles.otherExtras} bold`}>{ui.carte.tacos.other_extras}</p>
          <ExtraList extras={tacos.other_extras} />
        </StepCard>

        <Card tone="ink" className={styles.signatures}>
          <h2 className="display-type text-h4">{ui.carte.tacos.signatures}</h2>
          <ul className={styles.list}>
            {tacos.signatures.map((signature) => (
              <li key={signature.name} className={`${styles.signature} separator`}>
                <p className={`${styles.signatureTitle} display-type text-h4`}>
                  <span>{signature.name}</span>
                  <span className={styles.signaturePrice}>{formatPrice(signature.price_eur)}</span>
                </p>
                <p className={styles.signatureDetail}>{signature.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </>
  );
}

function StepCard({ number, title, tone, children }: { number: number; title: string; tone: CardTone; children: ReactNode }) {
  return (
    <Card tone={tone} className={styles.step}>
      <h2 className={styles.stepTitle}>
        <span className={`${styles.stepNumber} display-type text-h4`}>{number}</span>
        <span className="display-type text-h4">{title}</span>
      </h2>
      {children}
    </Card>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className={`${styles.chips} text-small bold`}>
      {items.map((item) => (
        <li key={item} className={styles.chip}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExtraList({ extras }: { extras: { name: string; price_eur: number }[] }) {
  return (
    <ul className={styles.list}>
      {extras.map((extra) => (
        <li key={extra.name} className={`${styles.extra} separator`}>
          <span>{extra.name}</span>
          <span className={`${styles.nowrap} bold`}>{formatPrice(extra.price_eur, { signed: true })}</span>
        </li>
      ))}
    </ul>
  );
}
