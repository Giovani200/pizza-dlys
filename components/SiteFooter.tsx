import Link from "next/link";
import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { LogoBadge } from "@/components/LogoBadge";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const { street, postal_code, city } = infos.address;
  return (
    <footer className={styles.footer}>
      <LogoBadge placement="footer" />
      <div className={styles.details}>
        <p>
          {street}, {postal_code} {city} ·{" "}
          <a className={`${styles.phone} bold`} href={infos.phone_href}>
            {infos.phone_display}
          </a>
        </p>
        <p className={styles.muted}>{infos.allergens}</p>
        <p className={styles.muted}>{ui.meta.unofficial_notice}</p>
      </div>
      <div className={styles.legal}>
        <Link className={styles.legalItem} href="/mentions-legales/">
          {ui.actions.legal}
        </Link>
        <p className={`${styles.legalItem} ${styles.muted}`}>{infos.copyright}</p>
      </div>
    </footer>
  );
}
