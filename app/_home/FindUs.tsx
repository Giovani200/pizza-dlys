import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { AddressCard } from "@/components/AddressCard";
import { Button } from "@/components/Button";
import { HoursCard } from "@/components/HoursCard";
import styles from "./FindUs.module.css";

const TITLE_ID = "find-us-title";

export function FindUs() {
  return (
    <section id="infos" className={styles.section} aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className={`${styles.title} script-type text-h2 reveal-on-scroll`}>
        {ui.home.find_us.title}
      </h2>
      <div className={styles.grid}>
        <HoursCard headingLevel="h3" />
        <AddressCard headingLevel="h3" tilt="right" />
        <div className={styles.mapsLink}>
          <Button href={infos.maps_url} tone="paper" size="large" icon="external" external>
            {ui.actions.open_maps}
          </Button>
        </div>
      </div>
    </section>
  );
}
