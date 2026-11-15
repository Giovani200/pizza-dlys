"use client";

import { useState } from "react";
import ui from "@/content/ui.json";
import { Card, type CardTone } from "@/components/Card";
import { fillTemplate, formatPrice } from "@/lib/format";
import { menu } from "@/lib/menu";
import styles from "./PizzaMenu.module.css";

type Family = (typeof menu.pizzas.families)[number];
type Pizza = Family["items"][number];

const FAMILY_TONES: Record<string, CardTone> = { tomato: "paper", cream: "paper", special: "ink" };
const [firstFamily, ...otherFamilies] = menu.pizzas.families;

/**
 * Mobile shows one family at a time behind aria-pressed buttons; desktop shows all three
 * in two columns. One markup serves both: CSS hides unselected families on mobile only.
 */
export function PizzaMenu() {
  const [selectedFamilyId, setSelectedFamilyId] = useState(firstFamily.id);

  const renderFamily = (family: Family) => (
    <FamilyCard key={family.id} family={family} isSelected={family.id === selectedFamilyId} />
  );

  return (
    <section className={styles.section} aria-label={ui.carte.tabs.pizzas}>
      <div className={styles.selector} role="group" aria-label={ui.carte.pizzas.families_label}>
        {menu.pizzas.families.map((family) => (
          <button
            key={family.id}
            className={`${styles.familyButton} text-small bold`}
            type="button"
            aria-pressed={family.id === selectedFamilyId}
            onClick={() => setSelectedFamilyId(family.id)}
          >
            {family.label}
            <span className={styles.familyCount}>
              {fillTemplate(ui.carte.pizzas.family_count, { count: family.items.length })}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.column}>
        {renderFamily(firstFamily)}
        <Card tone="yellow" className={styles.notes}>
          <h2 className="display-type text-h4">{ui.carte.pizzas.notes_title}</h2>
          {menu.pizzas.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </Card>
      </div>
      <div className={styles.column}>{otherFamilies.map(renderFamily)}</div>
    </section>
  );
}

function FamilyCard({ family, isSelected }: { family: Family; isSelected: boolean }) {
  return (
    <Card tone={FAMILY_TONES[family.id]} className={styles.family} data-selected={isSelected}>
      <div className={styles.priceGrid}>
        <h2 className="display-type text-h4">{family.label}</h2>
        <span className={`${styles.price} text-small bold`}>{ui.carte.pizzas.senior}</span>
        <span className={`${styles.price} text-small bold`}>{ui.carte.pizzas.mega}</span>
      </div>
      <p className={`${styles.familyIntro} text-small`}>
        {family.intro}
        <span className={styles.tapHint}> {ui.carte.pizzas.tap_hint}</span>
      </p>
      <ul className={styles.list}>
        {family.items.map((pizza) => (
          <PizzaRow key={pizza.name} pizza={pizza} />
        ))}
      </ul>
    </Card>
  );
}

function PizzaPrices({ pizza }: { pizza: Pizza }) {
  return (
    <>
      <span className={`${styles.price} bold`}>
        <span className="visually-hidden">{ui.carte.pizzas.senior} </span>
        <span data-dish-price="">{formatPrice(pizza.senior_eur)}</span>
      </span>
      <span className={`${styles.price} bold`}>
        <span className="visually-hidden">{ui.carte.pizzas.mega} </span>
        <span data-dish-price="">{formatPrice(pizza.mega_eur)}</span>
      </span>
    </>
  );
}

/** Two markups because the composition moves: below a <details> on mobile, inline on desktop. */
function PizzaRow({ pizza }: { pizza: Pizza }) {
  return (
    <li className="separator" data-dish="">
      <details className={styles.mobileRow}>
        <summary className={`${styles.priceGrid} ${styles.summary}`}>
          <span className="bold">
            <span className={styles.plus} aria-hidden="true">
              +
            </span>{" "}
            <span data-dish-name="">{pizza.name}</span>
          </span>
          <PizzaPrices pizza={pizza} />
        </summary>
        <p className={`${styles.composition} text-small`}>{pizza.composition}</p>
      </details>
      <div className={`${styles.priceGrid} ${styles.desktopRow}`}>
        <span>
          <span className="bold" data-dish-name="">
            {pizza.name}
          </span>{" "}
          <span className="text-small">{pizza.composition}</span>
        </span>
        <PizzaPrices pizza={pizza} />
      </div>
    </li>
  );
}
