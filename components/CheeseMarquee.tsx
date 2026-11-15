import { readFileSync } from "node:fs";
import { join } from "node:path";
import ui from "@/content/ui.json";
import styles from "./CheeseMarquee.module.css";

const STAR_PATH =
  "M10.3 0.0 L3.7 1.5 L7.3 7.3 L1.5 3.7 L0.0 9.6 L-1.5 3.7 L-6.8 6.8 L-3.7 1.5 L-10.2 0.0 L-3.7 -1.5 L-7.2 -7.2 L-1.5 -3.7 L-0.0 -10.1 L1.5 -3.7 L6.9 -6.9 L3.7 -1.5 Z";

/**
 * The supplied cheese strips animate through the page's .goutte / .chute classes,
 * so they are inlined at build time instead of loaded as <img>. They are our own static assets.
 */
const readCheeseStrip = (layout: "mobile" | "desktop") =>
  readFileSync(join(process.cwd(), "public", "svg", `fromage-coulures-${layout}.svg`), "utf8");

export function CheeseMarquee() {
  const items = [...ui.home.marquee, ...ui.home.marquee];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={`${styles.band} display-type text-h4`}>
        <div className={styles.track}>
          {items.map((item, index) => (
            <span key={index} className={styles.item}>
              <span className={index % 2 === 0 ? styles.cream : styles.yellow}>{item}</span>
              <svg className={styles.star} width="20" height="20" viewBox="-10 -10 20 20">
                <path d={STAR_PATH} />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <div className={`${styles.cheese} ${styles.mobileOnly}`} dangerouslySetInnerHTML={{ __html: readCheeseStrip("mobile") }} />
      <div className={`${styles.cheese} ${styles.desktopOnly}`} dangerouslySetInnerHTML={{ __html: readCheeseStrip("desktop") }} />
    </div>
  );
}
