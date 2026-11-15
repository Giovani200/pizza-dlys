import ui from "@/content/ui.json";
import { fillTemplate, formatPrice } from "@/lib/format";
import { menu } from "@/lib/menu";
import styles from "./TacoSizes.module.css";

export function TacoSizes() {
  return (
    <div className={styles.sizes}>
      {menu.tacos.sizes.map((size) => (
        <div key={size.size} className={styles.size}>
          <span className={`${styles.block} display-type text-h4`}>{size.size}</span>
          <span className={`${styles.meats} text-small`}>
            {fillTemplate(size.meats === 1 ? ui.carte.tacos.meats_one : ui.carte.tacos.meats_other, { count: size.meats })}
          </span>
          <span className={`${styles.block} bold`}>{formatPrice(size.price_eur)}</span>
        </div>
      ))}
    </div>
  );
}
