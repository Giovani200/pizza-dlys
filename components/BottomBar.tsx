import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { Button } from "@/components/Button";
import styles from "./BottomBar.module.css";

/** Mobile-only sticky bar; its auto columns leave room for a third action later. */
export function BottomBar() {
  return (
    <nav className={styles.bar} aria-label={ui.navigation.order_bar}>
      <Button href={infos.phone_href} tone="red" size="bar">
        {ui.actions.call}
      </Button>
      <Button href={infos.uber_eats_url} tone="orange" size="bar" icon="external" external>
        {ui.actions.uber_eats}
      </Button>
    </nav>
  );
}
