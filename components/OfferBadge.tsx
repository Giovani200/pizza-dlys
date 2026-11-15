import ui from "@/content/ui.json";
import { fillTemplate, formatPrice } from "@/lib/format";
import { lowestMegaPrice, lowestSeniorPrice } from "@/lib/menu";
import styles from "./OfferBadge.module.css";

const STAR_PATH =
  "M97.7 0.0 L83.0 13.1 L92.0 29.9 L74.8 38.1 L79.9 58.1 L59.4 59.4 L57.1 78.5 L38.1 74.8 L29.8 91.7 L13.1 83.0 L0.0 98.8 L-13.1 83.0 L-31.7 97.4 L-38.1 74.8 L-59.7 82.2 L-59.4 59.4 L-82.0 59.6 L-74.8 38.1 L-92.8 30.1 L-83.0 13.1 L-99.8 0.0 L-83.0 -13.1 L-93.1 -30.3 L-74.8 -38.1 L-78.6 -57.1 L-59.4 -59.4 L-56.9 -78.3 L-38.1 -74.8 L-30.1 -92.7 L-13.1 -83.0 L-0.0 -102.5 L13.1 -83.0 L31.5 -96.8 L38.1 -74.8 L59.7 -82.2 L59.4 -59.4 L82.2 -59.7 L74.8 -38.1 L92.6 -30.1 L83.0 -13.1 Z";

export function OfferBadge({ className }: { className: string }) {
  return (
    <div className={`${styles.badge} ${className}`}>
      <div className={styles.sway}>
        <svg className={styles.star} aria-hidden="true" viewBox="-104 -104 208 208">
          <path className={styles.starShape} d={STAR_PATH} />
          <circle className={styles.starRing} r="70" />
        </svg>
        <p className={`${styles.text} text-small bold`}>
          <span className={styles.label}>{ui.offer_badge.label}</span>
          <span>{ui.offer_badge.senior}</span>
          <span className="display-type text-h4">{formatPrice(lowestSeniorPrice)}</span>
          <span>{fillTemplate(ui.offer_badge.mega, { price: formatPrice(lowestMegaPrice) })}</span>
        </p>
      </div>
    </div>
  );
}
